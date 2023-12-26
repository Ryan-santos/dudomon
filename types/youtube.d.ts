export interface PlaylistItemResponse {
    kind: string;
    etag: string;
    nextPageToken: string;
    items: PlaylistItem[];
    pageInfo: PageInfo;
}

export interface PlaylistItem {
    kind: string;
    etag: string;
    id: string;
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            default: Thumbnail;
            medium: Thumbnail;
            high: Thumbnail;
            standard: Thumbnail;
            maxres: Thumbnail;
        };
        channelTitle: string;
        playlistId: string;
        position: number;
        resourceId: {
            kind: string;
            videoId: string;
        };
        videoOwnerChannelTitle: string;
        videoOwnerChannelId: string;
    };
    contentDetails: {
        videoId: string;
        videoPublishedAt: string;
    };
}

export interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}