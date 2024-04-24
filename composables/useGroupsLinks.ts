export interface Links {
    name: string
    icon: string
    url: string
    class: string
    classHover?: string
}

export interface GroupsLinks {
    title: string
    links: Record<string, Links>
}

export default function (): Record<string, GroupsLinks> {
    return {
        medias: {
            title: "mídias",
            links: {
                youtube: {
                    name: "YouTube",
                    icon: "bi:youtube",
                    url: "https://www.youtube.com/c/dudomon/videos",
                    class: "bg-youtube text-white",
                    classHover: "before:bg-youtube hover:border-youtube hover:text-white"
                },
                twitch: {
                    name: "Twitch",
                    icon: "bi:twitch",
                    url: "https://www.twitch.tv/dudomon",
                    class: "bg-twitch text-white",
                    classHover: "before:bg-twitch hover:border-twitch hover:text-white"
                },
                instagram: {
                    name: "Instagram",
                    icon: "bi:instagram",
                    url: "https://www.instagram.com/dudomon/",
                    class: "bg-gradient-to-r from-instagram-1 via-instagram-2 to-instagram-3 text-white",
                    classHover: "before:bg-gradient-to-r before:from-instagram-1 before:via-instagram-2 before:to-instagram-3 hover:border-twitch hover:text-white"
                },
                twitter: {
                    name: "Twitter",
                    icon: "ri:twitter-x-fill",
                    url: "https://twitter.com/dudomon",
                    class: "bg-twitter text-white",
                    classHover: "before:bg-twitter hover:border-twitter hover:text-white"
                },
                tiktok: {
                    name: "TikTok",
                    icon: "bi:tiktok",
                    url: "https://www.tiktok.com/@dudomon",
                    class: "bg-gradient-to-r from-tiktok-1 to-tiktok-2 text-white",
                    classHover: "before:bg-gradient-to-r before:from-tiktok-1 before:to-tiktok-2 hover:border-twitter hover:text-white"
                }
            }
        },

        groups: {
            title: "grupos",
            links: {
                whatsapp: {
                    name: "whatsapp",
                    icon: "fontisto:whatsapp",
                    url: "https://chat.whatsapp.com/FdH8xsywfdO7ZIYfUyyFmH",
                    class: "bg-whatsapp text-white"
                },
                discord: {
                    name: "discord",
                    icon: "ic:baseline-discord",
                    url: "https://discord.com/invite/MXC5T7WYCU",
                    class: "bg-discord text-white"
                }
            }
        }
    };
}