export const isExpired = (expiresAt: string) => {
    const expireDate = new Date(expiresAt);
    const currentDate = new Date(Date.now());

    const isDateExpired = expireDate.getTime() < currentDate.getTime();

    return isDateExpired;
};
