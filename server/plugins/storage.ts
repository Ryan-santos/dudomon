import redisDriver from "unstorage/drivers/redis";

export default defineNitroPlugin(() => {
    const storage = useStorage();

    const driver = redisDriver({
        base: "redis",
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD
    });

    storage.mount("redis", driver);
});