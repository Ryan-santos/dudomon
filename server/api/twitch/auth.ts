export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const queryCode = query?.code;
    const queryState = query?.state;
    const redirectUri = getRedirectUri(event);
    const state = String(await useStorage("redis").getItem("twitch-state"));

    if (queryCode && queryState === state) {
        const token = await twitchFetchToken({
            code: queryCode,
            redirect_uri: redirectUri,
            grant_type: "authorization_code"
        });

        const user = await fetchTwitchApi("users", undefined, token.access_token);

        if (user.id !== twitchUserId) {
            throw createError({
                statusCode: 401,
                message: "Ops, você não e o Dudomon, nada aconteceu!"
            });
        }

        await useStorage("redis").setItem("twitch-token", { ...token, ...getCreatedAt() });
        return "Token atualizado!";
    }

    const stateKey = randomKey();
    await useStorage("redis").setItem("twitch-state", stateKey);

    const location = "https://id.twitch.tv/oauth2/authorize?" + new URLSearchParams({
        response_type: "code",
        client_id: twitchClientId,
        scope: "user:read:email moderation:read channel:read:vips",
        redirect_uri: redirectUri,
        state: stateKey
    });

    await sendRedirect(event, location);
});