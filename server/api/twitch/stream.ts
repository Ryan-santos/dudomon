export default defineEventHandler(async () => {
    const stream = await fetchTwitchApi(
        "streams",
        {
            user_id: twitchUserId,
            first: 1
        }
    );

    if (!stream) {
        return null;
    }

    const game = await fetchTwitchApi(
        "games",
        {
            id: stream.game_id
        }
    );

    return {
        title: stream.title,
        image: game.box_art_url
    };
});