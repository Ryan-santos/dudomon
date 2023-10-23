export default defineNuxtRouteMiddleware(async (to) => {
    if (process.server) {
        return;
    };

    const user = await useTwitchUser();

    if (!user.value?.follower) {
        return navigateTo({
            path: "/user",
            query: {
                page: to.name?.toString(),
                type: "follower"
            }
        }, {
            redirectCode: 403
        });
    }
});