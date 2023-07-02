export const calcExpiresTime = (expirationDuration: number) =>
    new Date(Date.now() + expirationDuration).toISOString();
