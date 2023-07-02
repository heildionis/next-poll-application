// In milliseconds
export const expirationDurationMapper: Record<string, number> = {
    '1 minute': 60 * 1000,
    '3 minutes': 3 * 60 * 1000,
    '6 hours': 6 * 60 * 60 * 1000,
    '12 hours': 12 * 60 * 60 * 1000,
    '24 hours': 24 * 60 * 60 * 1000,
    '7 days': 7 * 24 * 60 * 60 * 1000,
};

export const expirationDurationMapperKeys = Object.keys(
    expirationDurationMapper
);
