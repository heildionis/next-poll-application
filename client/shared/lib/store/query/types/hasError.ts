import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';

export type ResponseType<T> =
    | { data: T }
    | { error: FetchBaseQueryError | SerializedError };

export function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return (
        typeof error === 'object' &&
        error != null &&
        'status' in error &&
        typeof (error as FetchBaseQueryError).status === 'number' &&
        typeof (error as FetchBaseQueryError).data === 'string'
    );
}

export function hasFetchBaseQueryError<T>(
    response: ResponseType<T>
): response is { error: FetchBaseQueryError } {
    return 'error' in response && isFetchBaseQueryError(response.error);
}
