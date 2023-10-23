import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { Database } from "~/types/database";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const trackId = query?.trackId?.toString();
    const user = await serverSupabaseUser(event);
    const supabase = await serverSupabaseClient<Database>(event);

    const newPlaylist = await spotifyNewPlaylistGet();

    const post = await fetchSpotifyApi<SpotifyApi.PlaylistTrackObject>(`playlists/${newPlaylist?.playlistId}/tracks`, {
        method: "POST",
        params: {
            uris: trackId
        }
    });

    if (!post) {
        throw createError({
            statusCode: 400,
            message: "A"
        });
    }

    const { error } = await supabase.from("jukebox")
        .insert({
            user_id: user?.id,
            track_id: trackId,
            playlist_id: newPlaylist?.playlistId
        });

    return error;
});