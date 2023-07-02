import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_ROOT_URL}/api`,
    }),
    // eslint-disable-next-line consistent-return
    extractRehydrationInfo: (action, { reducerPath }) => {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: () => ({}),
    tagTypes: ['Poll'],
});
