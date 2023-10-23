export default defineEventHandler(async () => {
    const playing = await fetchSpotifyApi<SpotifyApi.CurrentlyPlayingResponse>("me/player/currently-playing");
    const playlists = await fetchSpotifyApi<SpotifyApi.ListOfUsersPlaylistsResponse>(`users/${spotifyUserId}/playlists`);
    const newPlaylist = await spotifyNewPlaylistGet();

    return {
        playing: playing?.context?.uri.split(":").at(-1),
        playlists: playlists?.items.map((item) => {
            return item.id;
        }).filter((item) => {
            return item !== newPlaylist?.playlistId;
        }),
        new_playlist: newPlaylist
    };
});