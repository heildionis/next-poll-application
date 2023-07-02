import { createAsyncThunk } from '@reduxjs/toolkit';

import { voteInPollFromApi } from '../../api/pollsApi';
import { getSelectedChoices } from '../selectors/pollPageSelectors';

import { ThunkConfig } from '#/app/providers/StoreProvider';
import { Poll } from '#/entities/Poll';
import { hasFetchBaseQueryError } from '#/shared/lib/store/query/types/hasError';

export const voteInPoll = createAsyncThunk<Poll, string, ThunkConfig<string>>(
    'pollPage/voteInForm',
    async (shareableUrl, thunkApi) => {
        const { dispatch, rejectWithValue, getState } = thunkApi;

        const choices = getSelectedChoices(getState());

        if (!choices) {
            return rejectWithValue('Choose at least one choice.');
        }

        try {
            const response = await dispatch(
                voteInPollFromApi({ shareableUrl, choices })
            );

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
