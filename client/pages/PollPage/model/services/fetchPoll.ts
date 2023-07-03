import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchPollFromApi } from '../../api/pollsApi';

import { ThunkConfig } from '#/app/providers/StoreProvider';
import { Poll } from '#/entities/Poll';

/**
 * Async thunk action creator for fetching a poll from the API.
 * Dispatches the fetchPollFromApi action to retrieve the poll data.
 * Returns an object containing the poll data and a flag indicating if the user has already voted.
 *
 * @param shareableUrl - The shareable URL of the poll.
 * @returns An object with the poll data and a flag indicating if the user has already voted.
 */
export const fetchPoll = createAsyncThunk<
    { poll: Poll; isVoteExist: boolean },
    string,
    ThunkConfig<string>
>('pollPage/fetchPoll', async (shareableUrl, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await dispatch(fetchPollFromApi(shareableUrl));

        if ('data' in response) {
            return response.data;
        }
    } catch (error) {
        return rejectWithValue(error);
    }
});
