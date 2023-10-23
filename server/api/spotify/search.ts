export default defineEventHandler(async (event) => {
    const search = getQuery(event)?.search;

    if (!search) {
        return null;
    }

    const genre = "%20genre:" + (await spotifyNewPlaylistGet())?.genres.join("%20");

    const response = await fetchSpotifyApi<SpotifyApi.SearchResponse>("search", {
        params: {
            q: search + genre,
            type: "track",
            limit: 10
        }
    });

    const playlist = await fetchSpotifyApi<SpotifyApi.ListOfUsersPlaylistsResponse>(`playlists/${spotifyUserId}/tracks`, {
        params: {
            limit: 50
        }
    });

    return (response.tracks?.items)?.map((track) => {
        return {
            id: track.uri,
            name: track.name,
            album: track.album.name,
            artists: track.artists.map(a => a.name),
            image: track.album.images.at(-2)?.url
        };
    });
});