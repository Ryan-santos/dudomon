import type { PlaylistItem, PlaylistItemResponse } from "~/types/youtube";
interface Video {
    thumbnail: string
    title: string
    link: string
}

export default async function <T extends number | 1> (maxResults: T = 4): Promise<T extends 1 ? Video : Video[] | null> {
    const { data } = await useLazyFetch("https://www.googleapis.com/youtube/v3/playlistItems",
        {
            params: {
                key: "AIzaSyAi74D-e-Zu8zegWMJEvpPS9OeYABHcvnw",
                part: "snippet,contentDetails",
                playlistId: "UULFVHvo1-jt60-nXZ-oJM2zHg",
                maxResults
            },

            transform (response: PlaylistItemResponse) {
                const parse = (element: PlaylistItem): Video => {
                    const snippet = element.snippet;
                    const thumbnail = snippet.thumbnails.maxres?.url || snippet.thumbnails.medium?.url || snippet.thumbnails.high?.url;

                    return {
                        thumbnail,
                        title: snippet.title,
                        link: `https://www.youtube.com/watch?v=${snippet.resourceId.videoId}`
                    };
                };

                if (maxResults === 1) {
                    return parse(response?.items?.[0]);
                }

                return response?.items?.map((element) => {
                    return parse(element);
                });
            }
        }
    );

    return data as unknown as T extends 1 ? Video : Video[] | null;
}