export default defineNuxtConfig({
    app: {
        head: {
            titleTemplate: "%s %separator Dudomon",

            htmlAttrs: {
                lang: "pt-BR"
            }
        },

        pageTransition: {
            name: "page",
            mode: "out-in"
        },

        layoutTransition: {
            name: "layout",
            mode: "out-in"
        }
    },

    typescript: {
        strict: true
    },

    devtools: {
        enabled: true
    },

    nitro: {
        preset: "netlify"
    },

    runtimeConfig: {
        redis: {
            port: process.env.REDIS_PORT,
            host: process.env.REDIS_HOST,
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD
        },
        twitch: {
            clientId: process.env.TWITCH_CLIENT_ID,
            clientSecret: process.env.TWITCH_CLIENT_SECRET,
            userId: process.env.TWITCH_USER_ID
        },
        spotify: {
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            userId: process.env.SPOTIFY_USER_ID
        }
    },

    modules: [
        "nuxt-gtag",
        "@nuxtjs/google-fonts",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/color-mode",
        "nuxt-icon",
        "nuxt-icons",
        "nuxt-lodash",
        "@nuxtjs/supabase",
        "nuxt-delay-hydration"
    ],

    gtag: {
        id: "G-C6HJCZD0BR"
    },

    googleFonts: {
        download: false,
        families: {
            "Be+Vietnam+Pro": [100, 200, 300, 400, 500, 600, 700, 800, 900]
        }
    },

    colorMode: {
        fallback: "dark",
        classSuffix: ""
    },

    supabase: {
        redirect: false,
        cookieOptions: {
            maxAge: 7 * 24 * 60 * 60
        }
    },

    delayHydration: {
        mode: "init"
    }
});