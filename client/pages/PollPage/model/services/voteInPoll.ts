import { createAsyncThunk } from '@reduxjs/toolkit';

import { voteInPollFromApi } from '../../api/pollsApi';
import { getSelectedChoices } from '../selectors/pollPageSelectors';

import { ThunkConfig } from '#/app/providers/StoreProvider';
import { Poll } from '#/entities/Poll';
import { hasFetchBaseQueryError } from '#/shared/lib/store/query/types/hasError';

/**
 * Async thunk action creator for voting in a poll.
 * Dispatches the voteInPollFromApi action to submit the vote to the API.
 * Returns the poll data if the vote is successful.
 *
 * @param shareableUrl - The shareable URL of the poll.
 * @returns The poll data if the vote is successful.
 */
export const voteInPoll = createAsyncThunk<Poll, string, ThunkConfig<string>>(
    'pollPage/voteInForm',
    async (shareableUrl, thunkApi) => {
        const { dispatch, rejectWithValue, getState } = thunkApi;

        /**
         * Retrieves the selected choices from the state using the getSelectedChoices selector.
         * Returns an array of selected choices.
         */
        const choices = getSelectedChoices(getState());

        if (!choices) {
            return rejectWithValue('Choose at least one choice.');
        }

        try {
            const response = await dispatch(
                voteInPollFromApi({ shareableUrl, choices })
            );

            /**
             * Checks if the response contains an error using the hasFetchBaseQueryError utility function.
             * Returns the error message if an error is present in the response.
             */
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
