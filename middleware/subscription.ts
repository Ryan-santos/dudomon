export default defineNuxtRouteMiddleware(async (to) => {
    if (process.server) {
        return;
    };

    const user = await useTwitchUser();

    if (!user.value?.subscription) {
        return navigateTo({
            path: "/user",
            query: {
                page: to.name?.toString(),
                type: "subscription"
            }
        }, {
            redirectCode: 403
        });
    }
});