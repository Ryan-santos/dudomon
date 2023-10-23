import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { createThemes } from "tw-colors";

const colors = {
    white: {
        DEFAULT: "#FFFFFF",
        100: "#EEEEEE"
    },
    black: {
        DEFAULT: "#0E0E10",
        100: "#18181B"
    }
};

export default <Partial<Config>> {
    darkMode: "class",

    theme: {
        container: {
            center: true,
            padding: "1rem"
        },
        fontFamily: {
            sans: ["Be Vietnam Pro", "sans-serif"]
        },
        extend: {
            screens: {
                xs: "475px"
            },
            colors: {
                primary: "#FFCB00",
                danger: "#DC2626",
                warn: "#ca8a04",
                success: "#16A34A",
                twitch: "#772CE8",
                youtube: "#FF0000",
                twitter: "#1DA1F2",
                tiktok: {
                    1: "#06F9F4",
                    2: "#FC0244"
                },
                instagram: {
                    1: "#5B51D8",
                    2: "#C13584",
                    3: "#F77737"
                },
                whatsapp: "#25D366",
                discord: "#5865f2",
                ...colors
            },
            textShadow: {
                sm: "0 1px 2px var(--tw-shadow-color)",
                DEFAULT: "0 2px 4px var(--tw-shadow-color)",
                lg: "0 8px 16px var(--tw-shadow-color)"
            }
        }
    },

    plugins: [
        plugin(function ({ addVariant, matchUtilities, theme }) {
            addVariant("activated", ["&.active", "&.activated"]);

            matchUtilities(
                {
                    "text-shadow": value => ({
                        textShadow: value
                    })
                },
                { values: theme("textShadow") }
            );
        }),
        createThemes({
            light: {
                background: colors.white,
                contrast: colors.black
            },
            dark: {
                background: colors.black,
                contrast: colors.white
            }
        },
        {
            getThemeClassName: themeName => themeName
        })
    ]
};