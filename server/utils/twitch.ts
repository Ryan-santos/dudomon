import type { H3Event } from "h3";
import type TwitchApi from "~/types/twitch";

const {
    clientId,
    clientSecret,
    userId
} = useRuntimeConfig().twitch;

export const twitchClientId = clientId;
export const twitchClientSecret = clientSecret;
export const twitchUserId = userId;

interface TwitchToken {
    access_token: string
    expires_in: number
    token_type: string
    refresh_token: string
    scope: string[]
    created_at?: string
}

export const twitchFetchToken = async (params: Record<string, any>) => {
    return await $fetch<TwitchToken>("https://id.twitch.tv/oauth2/token", {
        method: "POST",

        headers: {
            "Content-Type": "x-www-form-urlencoded"
        },

        params: {
            client_id: twitchClientId,
            client_secret: twitchClientSecret,
            ...params
        }
    });
};

export const twitchRefreshToken = async (refreshToken: string) => {
    return await twitchFetchToken({
        grant_type: "refresh_token",
        refresh_token: refreshToken
    });
};

export const twitchAppToken = async (force?: boolean) => {
    const storageToken = await useStorage("redis").getItem<TwitchToken>("twitch-token");

    if (!storageToken) {
        throw createError({
            statusCode: 400,
            message: "Twitch token base não esta presente"
        });
    }

    if (expiredAt(storageToken.created_at!, storageToken.expires_in) || force) {
        const newToken = await twitchRefreshToken(storageToken.refresh_token)
            .catch(() => {
                useStorage("redis").removeItem("twitch-token");

                throw createError({
                    statusCode: 500,
                    message: "Aplicativo desconectado da conta do dudomon",
                    fatal: true
                });
            });

        await useStorage("redis").setItem("twitch-token", { ...newToken, ...getCreatedAt() });
        return newToken.access_token;
    }

    return storageToken.access_token;
};

export const twitchUserToken = async (event: H3Event, force?: boolean) => {
    const nameToken = "twitch-token";
    const nameRefreshToken = "sb-provider-refresh-token";
    const token = getCookie(event, nameToken);
    const refreshToken = getCookie(event, nameRefreshToken);

    if (!refreshToken) {
        throw createError({
            statusCode: 400,
            message: "twitch refresh token não esta presente"
        });
    }

    if (!token || force) {
        const newToken = await twitchRefreshToken(refreshToken);

        setCookie(event, nameToken, newToken.access_token, {
            maxAge: newToken.expires_in
        });

        setCookie(event, nameRefreshToken, newToken.refresh_token!, {
            maxAge: 7 * 24 * 60 * 60
        });

        return newToken.access_token;
    }

    return token;
};

export const fetchTwitchApi = async <R extends keyof TwitchApi, B extends boolean = false>(
    request: R,
    params?: Record<string, any>,
    token?: string | H3Event,
    allData?: B,
    force?: boolean
): Promise<B extends true ? TwitchApi[R]["data"] : TwitchApi[R]["data"][0]> => {
    let retry = false;
    const _token = token ? (typeof token === "string" ? token : await twitchUserToken(token, force)) : await twitchAppToken(force);

    const response = await $fetch(request as string, {
        baseURL: "https://api.twitch.tv/helix",
        method: "GET",
        headers: {
            Authorization: `Bearer ${_token}`,
            "Client-Id": twitchClientId
        },
        retry: 0,
        params,

        onResponse ({ response }) {
            if (response.status === 401 && !force) {
                retry = true;
            }
        },

        ignoreResponseError: !retry
    }) as TwitchApi[R];

    if (retry) {
        return await fetchTwitchApi(request, params, token, allData, true);
    }

    const data = response.data;

    if (allData) {
        return data as (B extends true ? TwitchApi[R]["data"] : TwitchApi[R]["data"][0]);
    }

    return data?.[0] as (B extends true ? TwitchApi[R]["data"] : TwitchApi[R]["data"][0]);
};