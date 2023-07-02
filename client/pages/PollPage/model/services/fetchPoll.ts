import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchPollFromApi } from '../../api/pollsApi';

import { ThunkConfig } from '#/app/providers/StoreProvider';
import { Poll } from '#/entities/Poll';
import { hasFetchBaseQueryError } from '#/shared/lib/store/query/types/hasError';

export const fetchPoll = createAsyncThunk<Poll, string, ThunkConfig<string>>(
    'pollPage/fetchPoll',
    async (shareableUrl, thunkApi) => {
        const { dispatch, rejectWithValue } = thunkApi;

        try {
            const response = await dispatch(fetchPollFromApi(shareableUrl));

            if (hasFetchBaseQueryError(response)) {
                const { error } = response;
                return rejectWithValue(error.data as string);
            }

            if ('data' in response) {
                return response.data;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
