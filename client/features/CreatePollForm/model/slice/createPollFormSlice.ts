import { PayloadAction } from '@reduxjs/toolkit';

import { createPoll } from '../services/createPoll';
import { CreatePollFormSchema } from '../types/CreatePollFormSchema';

import { Poll } from '#/entities/Poll';
import { buildSlice } from '#/shared/lib/store';

const initialState: CreatePollFormSchema = {
    title: '',
    choices: [''],
    expirationDuration: 60 * 1000,
    isPollCreated: false,
    isLoading: false,
    error: '',
};

export const {
    name: createPollFormNamespace,
    useActions: useCreatePollFormActions,
    reducer: createPollFormReducer,
    actions: createPollFormActions,
} = buildSlice({
    name: 'createPollForm',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setExpirationDuration: (state, action: PayloadAction<number>) => {
            state.expirationDuration = action.payload;
        },
        setChoice: (state, action: PayloadAction<[number, string]>) => {
            const [choiceIndex, newChoice] = action.payload;

            state.choices[choiceIndex] = newChoice;
        },
        addChoice: (state) => {
            state.choices.push('');
        },
        removeChoice: (state, action: PayloadAction<[number, string]>) => {
            const [choiceIndex] = action.payload;

            state.choices = state.choices.filter(
                (_, index) => index !== choiceIndex
            );
        },
        setIsPollCreated: (state, action: PayloadAction<boolean>) => {
            state.isPollCreated = action.payload;
        },
        resetState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                createPoll.rejected,
                (state, action: PayloadAction<string>) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            )
            .addCase(createPoll.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                createPoll.fulfilled,
                (state, action: PayloadAction<Poll>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                }
            );
    },
});
