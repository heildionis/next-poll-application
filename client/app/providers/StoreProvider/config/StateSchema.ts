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

export interface StateSchema {
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    // async reducers
    [createPollFormNamespace]?: CreatePollFormSchema;
    [pollPageNamespace]?: PollPageSchema;
    [pollPageVoteNamespace]?: PollPageVoteSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {}

export interface ThunkConfig<T> {
    extra: ThunkExtraArg;
    rejectValue: T;
    state: StateSchema;
}
