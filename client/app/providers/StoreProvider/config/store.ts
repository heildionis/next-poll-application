import {
    Action,
    CombinedState,
    configureStore,
    Reducer,
    ReducersMapObject,
    ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

import { rtkApi } from '#/shared/api';

export const createReduxStore = (
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>
) => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: process.env.NODE_ENV === 'development',
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([rtkApi.middleware]),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
};

export type AppStore = ReturnType<typeof createReduxStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    ThunkExtraArg,
    Action
>;

/**
 * Creates a wrapper for the Redux store using next-redux-wrapper.
 * Note: The @ts-ignore comment is used here because typing the createWrapper function with precise types can be difficult due to the complexity of the Next.js and Redux integration.
 */
export const wrapper = createWrapper<AppStore>(
    // @ts-ignore
    createReduxStore,
    { debug: process.env.NODE_ENV === 'development' }
);
