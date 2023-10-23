import type { FetchOptions } from "ofetch";

export const spotifyClientId = process.env.SPOTIFY_CLIENT_ID!;
export const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
export const spotifyUserId = process.env.SPOTIFY_USER_ID;

export interface SpotifyToken {
    access_token: string
    token_type: string
    scope: string
    expires_in: number
    refresh_token: string
    created_at: string
}

export const spotifyFetchToken = async (params: Record<string, any>) => {
    return await $fetch<SpotifyToken>("https://accounts.spotify.com/api/token", {
        method: "POST",

        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(spotifyClientId + ":" + spotifyClientSecret).toString("base64")}`
        },

        params
    });
};

export const spotifyGetToken = async () => {
    const storageToken = await useStorage("redis").getItem<SpotifyToken>("spotify-token");

    if (!storageToken) {
        throw createError({
            statusCode: 400,
            message: "spotify token base não esta presente"
        });
    }

    if (expiredAt(storageToken.created_at, storageToken.expires_in)) {
        const newToken = await spotifyFetchToken({
            grant_type: "refresh_token",
            refresh_token: storageToken?.refresh_token
        });

        await useStorage("redis").setItem<SpotifyToken>("spotify-token", {
            refresh_token: storageToken?.refresh_token,
            ...(newToken as Omit<SpotifyToken, "refresh_token">),
            ...getCreatedAt()
        });

        return newToken;
    }

    return storageToken;
};

export const fetchSpotifyApi = async <T>(request: string, opts?: FetchOptions, token?: SpotifyToken): Promise<T> => {
    const _token = token ?? await spotifyGetToken();

    const base = $fetch.create(opts ?? {});

    return await base(request, {
        baseURL: "https://api.spotify.com/v1",
        headers: {
            Authorization: `${_token.token_type} ${_token.access_token}`
        }
    });
};

export const spotifyNewPlaylistGet = async () => {
    return await useStorage("redis").getItem<{playlistId: string, genres: string[]}>("new-playlist");
};