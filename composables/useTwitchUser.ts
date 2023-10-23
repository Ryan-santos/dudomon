export default async function () {
    const { data } = await useLazyFetch("/api/twitch/user", {
        headers: useRequestHeaders(["cookie"]),
        key: "twitchUser",
        server: false,

        async onResponse ({ response }) {
            if ([401, 400].includes(response.status)) {
                await useSupabaseClient().auth.signOut();
                window.location.reload();
            }
        },

        default () {
            return {
                follower: undefined,
                subscription: undefined,
                generateTokens: undefined
            };
        }
    });

    return data;
};