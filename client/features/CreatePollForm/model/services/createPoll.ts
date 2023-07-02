import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    CreatePollFormArg,
    createPollFromApi,
} from '../../api/createPollFormApi';
import {
    getCreatePollFormChoices,
    getCreatePollFormExpirationDuration,
    getCreatePollFormTitle,
} from '../selectors/createPollFormSelectors';
import { createPollFormActions } from '../slice/createPollFormSlice';

import { ThunkConfig } from '#/app/providers/StoreProvider';
import { Poll } from '#/entities/Poll';
import { hasFetchBaseQueryError } from '#/shared/lib/store/query/types/hasError';

export const createPoll = createAsyncThunk<Poll, void, ThunkConfig<string>>(
    `createPollForm/createPoll`,
    async (_, thunkApi) => {
        const { getState, dispatch, rejectWithValue } = thunkApi;

        const title = getCreatePollFormTitle(getState());
        const choices = getCreatePollFormChoices(getState());
        const filteredChoices = [...choices].filter((choice) =>
            Boolean(choice)
        );
        const expirationDuration = getCreatePollFormExpirationDuration(
            getState()
        );

        if (!title) {
            return rejectWithValue('Fill the title.');
        }

        if (!filteredChoices.length) {
            return rejectWithValue('Fill the choices.');
        }

        const poll: CreatePollFormArg = {
            title,
            choices: filteredChoices,
            expirationDuration,
        };

        try {
            const response = await dispatch(createPollFromApi(poll));

            if (hasFetchBaseQueryError(response)) {
                const { error } = response;
                return rejectWithValue(error.data as string);
            }

            dispatch(createPollFormActions.setIsPollCreated(true));

            if ('data' in response) {
                return response.data;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
