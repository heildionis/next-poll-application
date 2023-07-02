import { PayloadAction } from '@reduxjs/toolkit';

import { voteInPoll } from '../services/voteInPoll';
import { PollPageVoteSchema } from '../types/PollPageVoteSchema';

import { Poll } from '#/entities/Poll';
import { buildSlice } from '#/shared/lib/store';

const initialState: PollPageVoteSchema = {
    isLoading: false,
    error: '',
};

export const {
    name: pollPageVoteNamespace,
    reducer: pollPageVoteReducer,
    actions: pollPageVoteActions,
} = buildSlice({
    name: 'pollPageVote',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                voteInPoll.rejected,
                (state, action: PayloadAction<string>) => {
                    state.error = action.payload;
                    state.isLoading = false;
                }
            )
            .addCase(voteInPoll.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(
                voteInPoll.fulfilled,
                (state, action: PayloadAction<Poll>) => {
                    state.data = action.payload;
                    state.isLoading = false;
                }
            );
    },
});
