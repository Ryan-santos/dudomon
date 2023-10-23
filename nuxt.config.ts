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

    modules: [
        "nuxt-gtag",
        "@nuxtjs/google-fonts",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/color-mode",
        "nuxt-icon",
        "nuxt-icons",
        "nuxt-lodash",
        "@vite-pwa/nuxt",
        "@nuxtjs/supabase"
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
    }
});