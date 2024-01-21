import redisDriver from "unstorage/drivers/redis";

export default defineNitroPlugin(() => {
    const {
        port,
        host,
        username,
        password
    } = useRuntimeConfig().redis;

    const driver = redisDriver({
        base: "redis",
        port: Number(port),
        host,
        username,
        password
    });

    useStorage().mount("redis", driver);
});