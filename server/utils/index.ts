import type { H3Event } from "h3";

export const getCreatedAt = () => {
    return {
        created_at: new Date().toISOString()
    };
};

export const expiredAt = (date: string, expires: number): boolean => {
    const currentDate = new Date().getTime();
    const specifiedDate = new Date(date).getTime();

    return Math.floor((currentDate - specifiedDate) / 1000) >= expires;
};

export const getRedirectUri = (event: H3Event) => {
    const requestURL = getRequestURL(event);
    return requestURL.origin + requestURL.pathname;
};

export const randomKey = () => Math.floor(Math.random() * 1e10).toString();