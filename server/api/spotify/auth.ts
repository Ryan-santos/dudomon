export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const queryCode = query?.code;
    const queryState = query?.state;
    const redirectUri = getRedirectUri(event);
    const state = String(await useStorage("redis").getItem("spotify-state"));

    if (queryCode && queryState === state) {
        const token = await spotifyFetchToken({
            code: queryCode,
            redirect_uri: redirectUri,
            grant_type: "authorization_code"
        });

        const user = await fetchSpotifyApi<SpotifyApi.UserProfileResponse>("me", undefined, token);

        if (user.id !== spotifyUserId) {
            throw createError({
                statusCode: 401,
                message: "Ops, você não e o Dudomon, nada aconteceu!"
            });
        }

        await useStorage("redis").setItem("spotify-token", { ...token, ...getCreatedAt() });
        return "Token atualizado!";
    }

    const stateKey = randomKey();
    await useStorage("redis").setItem("spotify-state", stateKey);

    const location = "https://accounts.spotify.com/authorize?" + new URLSearchParams({
        response_type: "code",
        client_id: spotifyClientId,
        scope: "user-read-currently-playing playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private",
        redirect_uri: redirectUri,
        state: stateKey
    });

    await sendRedirect(event, location);
});