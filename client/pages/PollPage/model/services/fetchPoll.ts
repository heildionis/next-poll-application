import { createAsyncThunk } from '@reduxjs/toolkit';

import { checkIpFromApi, fetchPollFromApi } from '../../api/pollsApi';

import { ThunkConfig } from '#/app/providers/StoreProvider';
import { Poll } from '#/entities/Poll';

export const fetchPoll = createAsyncThunk<
    { poll: Poll; isVoteExist: boolean },
    string,
    ThunkConfig<string>
>('pollPage/fetchPoll', async (shareableUrl, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
        const checkIpResponse = await dispatch(checkIpFromApi(shareableUrl));

        console.log(checkIpResponse);

        const response = await dispatch(fetchPollFromApi(shareableUrl));

        if ('data' in response) {
            return response.data;
        }
    } catch (error) {
        return rejectWithValue(error);
    }
});
