export const getRouteMain = () => '/';
export const getRoutePoll = (shareableUrl: string) => `/polls/${shareableUrl}`;
export const getRouteRoot = (route?: string) =>
    `${process.env.NEXT_PUBLIC_ROOT_URL}${route}`;
