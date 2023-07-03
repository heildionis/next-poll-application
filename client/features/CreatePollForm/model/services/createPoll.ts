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

/**
 * Async thunk action to create a poll.
 * It retrieves the form data from the store using the selectors.
 * It dispatches the `createPollFromApi` action to make the API request.
 * It handles the response and updates the store accordingly.
 */
export const createPoll = createAsyncThunk<Poll, void, ThunkConfig<string>>(
    `createPollForm/createPoll`,
    async (_, thunkApi) => {
        const { getState, dispatch, rejectWithValue } = thunkApi;

        // Get form data from the store
        const title = getCreatePollFormTitle(getState());
        const choices = getCreatePollFormChoices(getState());
        const filteredChoices = [...choices].filter((choice) =>
            Boolean(choice)
        );
        const expirationDuration = getCreatePollFormExpirationDuration(
            getState()
        );

        // Validate form data
        if (!title) {
            return rejectWithValue('Fill the title.');
        }

        if (!filteredChoices.length) {
            return rejectWithValue('Fill the choices.');
        }

        // Create poll object
        const poll: CreatePollFormArg = {
            title,
            choices: filteredChoices,
            expirationDuration,
        };

        try {
            const response = await dispatch(createPollFromApi(poll));

            /**
             * Checks if the response contains an error using the hasFetchBaseQueryError utility function.
             * Returns the error message if an error is present in the response.
             */
            if (hasFetchBaseQueryError(response)) {
                const { error } = response;
                return rejectWithValue(error.data as string);
            }

            // Get form data from the store
            dispatch(createPollFormActions.setIsPollCreated(true));

            if ('data' in response) {
                return response.data;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
