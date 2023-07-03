import {
    Reducer,
    AnyAction,
    CombinedState,
    EnhancedStore,
    ReducersMapObject,
} from '@reduxjs/toolkit';

import {
    CreatePollFormSchema,
    createPollFormNamespace,
} from '#/features/CreatePollForm';
import {
    PollPageSchema,
    PollPageVoteSchema,
    pollPageNamespace,
    pollPageVoteNamespace,
} from '#/pages/PollPage';
import { rtkApi } from '#/shared/api';

/**
 * Represents the schema of the application state.
 * It defines the shape of the state object and the reducers associated with each state slice.
 */
export interface StateSchema {
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    // async reducers
    [createPollFormNamespace]?: CreatePollFormSchema;
    [pollPageNamespace]?: PollPageSchema;
    [pollPageVoteNamespace]?: PollPageVoteSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    /**
     * Retrieves the reducer map containing the reducers for each state schema key.
     *
     * @returns The reducer map object.
     */
    getReducerMap: () => ReducersMapObject<StateSchema>;
    /**
     * Reduces the state using the provided action and the reducer map.
     *
     * @param state - The current state.
     * @param action - The action to be applied.
     * @returns The combined state after applying the action.
     */
    reduce: (
        state: StateSchema,
        action: AnyAction
    ) => CombinedState<StateSchema>;
    /**
     * Adds a reducer for the specified state schema key.
     *
     * @param key - The state schema key.
     * @param reducer - The reducer function.
     */
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    /**
     * Removes the reducer for the specified state schema key.
     *
     * @param key - The state schema key.
     */
    remove: (key: StateSchemaKey) => void;
}

/**
 * Represents a Redux store with a reducer manager.
 * It extends the EnhancedStore from Redux Toolkit.
 */
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {}

/**
 * Represents the configuration for a Redux Thunk middleware.
 * It defines the extra argument, reject value, and state schema for the thunk actions.
 */
export interface ThunkConfig<T> {
    extra: ThunkExtraArg;
    rejectValue: T;
    state: StateSchema;
}
