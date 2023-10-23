export default async function (maxResults = 4) {
    interface Videos {
        thumbnail: string
        title: string
        link: string
    }

    const { data } = await useLazyFetch("https://www.googleapis.com/youtube/v3/playlistItems",
        {
            params: {
                key: "AIzaSyAi74D-e-Zu8zegWMJEvpPS9OeYABHcvnw",
                part: "snippet,contentDetails",
                playlistId: "UULFVHvo1-jt60-nXZ-oJM2zHg",
                maxResults
            },

            transform (response: any) {
                const res: Videos[] = [];

                response?.items?.forEach((element:any) => {
                    element = element.snippet;
                    const thumbnail = element.thumbnails.maxres?.url || element.thumbnails.medium?.url || element.thumbnails.high?.url;

                    res.push({
                        thumbnail,
                        title: element.title,
                        link: `https://www.youtube.com/watch?v=${element.resourceId.videoId}`
                    });
                });

                return res;
            }
        }
    );

    return data;
}