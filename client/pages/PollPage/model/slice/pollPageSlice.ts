import { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { PollPageSchema } from '../types/PollPageSchema';

import { SelectedChoice } from '#/entities/Poll';
import { buildSlice } from '#/shared/lib/store';

const initialState: PollPageSchema = {
    choices: [],
};

export const {
    name: pollPageNamespace,
    reducer: pollPageReducer,
    useActions: usePollPageActions,
    actions: pollPageActions,
} = buildSlice({
    name: 'pollPage',
    initialState,
    reducers: {
        setChoices: (state, action: PayloadAction<Record<string, number>>) => {
            state.choices = Object.keys(action.payload).map((choice) => ({
                choice,
                selected: false,
            }));
        },
        setChoice: (
            state,
            action: PayloadAction<{
                selectedChoice: SelectedChoice;
                choiceIndex: number;
            }>
        ) => {
            const { selectedChoice, choiceIndex } = action.payload;

            state.choices = [...state.choices].map((item, index) => {
                if (
                    item.choice === selectedChoice.choice &&
                    index === choiceIndex
                ) {
                    return {
                        choice: item.choice,
                        selected: !item.selected,
                    };
                }

                return item;
            });
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
});
