export interface TwitchApiResponse<T> {
    data: T[];
    pagination: {};
}

export default interface TwitchApi {
    "users": TwitchApiResponse<{
        id: string;
        login: string;
        display_name: string;
        type: string;
        broadcaster_type: string;
        description: string;
        profile_image_url: string;
        offline_image_url: string;
        view_count: number;
        email: string;
        created_at: string;
    }>;

    "channels/followed": TwitchApiResponse<{
        broadcaster_id: string;
        broadcaster_login: string;
        broadcaster_name: string;
        followed_at: string;
    }>;

    "streams": TwitchApiResponse<{
        id: string;
        user_id: string;
        user_login: string;
        user_name: string;
        game_id: string;
        game_name: string;
        type: string;
        title: string;
        tags: string[];
        viewer_count: number;
        started_at: string;
        language: string;
        thumbnail_url: string;
        tag_ids: string[];
        is_mature: boolean;
    }>;

    "subscriptions/user": TwitchApiResponse<{
        broadcaster_id: string
        broadcaster_name: string
        broadcaster_login: string
        is_gift: boolean
        tier: string
    }>

    "games": TwitchApiResponse<{
        id: string
        name: string
        box_art_url: string
        igdb_id: string
    }>

    "moderation/moderators": TwitchApiResponse<{
        user_id: string
        user_login: string
        user_name: string
    }>

    "channels/vips": TwitchApiResponse<{
        user_id: string
        user_login: string
        user_name: string
    }>
}