import { serverSupabaseUser } from "#supabase/server";

type Return = Promise<{
    follower: string | boolean
    subscription: string | boolean
    steamer?: boolean
    generateTokens?: string[]
    moderator?: boolean
    vip?: boolean
}>

export default defineEventHandler<Return>(async (event) => {
    const user = await serverSupabaseUser(event);
    const userId = user?.user_metadata?.provider_id;

    if (userId === twitchUserId) {
        const generateTokens: string[] = [];

        if (!(await useStorage("redis").getItem("twitch-token"))) {
            generateTokens.push("/api/twitch/auth");
        }

        if (!(await useStorage("redis").getItem("spotify-token"))) {
            generateTokens.push("/api/spotify/auth");
        }

        return {
            follower: "seguindo desde sempre",
            subscription: "inscrição ativa desde sempre",
            steamer: true,
            generateTokens
        };
    }

    const follower = fetchTwitchApi(
        "channels/followed",
        {
            user_id: userId,
            broadcaster_id: twitchUserId,
            first: 1
        },
        event
    );

    const subscription = fetchTwitchApi(
        "subscriptions/user",
        {
            user_id: user?.user_metadata?.provider_id,
            broadcaster_id: twitchUserId
        },
        event
    );

    const moderation = fetchTwitchApi(
        "moderation/moderators",
        {
            user_id: userId,
            broadcaster_id: twitchUserId
        }
    );

    const vip = fetchTwitchApi(
        "channels/vips",
        {
            user_id: userId,
            broadcaster_id: twitchUserId
        }
    );

    return await Promise.all([
        follower,
        subscription,
        moderation,
        vip
    ]).then(([f, s, m, v]) => {
        const formatDate = (dateString: string) => {
            return new Date(dateString).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });
        };

        const tier = {
            1000: "1 mês",
            2000: "3 meses",
            3000: "6 meses"
        }[s?.tier];

        return {
            follower: f ? `seguindo desde ${formatDate(f.followed_at)}` : false,
            subscription: s ? `inscrição ativa de ${tier}` : false,
            moderator: !!m,
            vip: !!v
        };
    });
});