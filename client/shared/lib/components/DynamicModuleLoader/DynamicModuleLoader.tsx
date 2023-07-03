import { Reducer } from '@reduxjs/toolkit';
import { FC, ReactNode, useEffect } from 'react';
import { useStore } from 'react-redux';

import { useAppDispatch } from '../../hooks/useAppDispatch';

import {
    ReduxStoreWithManager,
    StateSchemaKey,
} from '#/app/providers/StoreProvider';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer;
};

interface DynamicModuleLoaderProps {
    children: ReactNode;
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

/**
 * Component for dynamically loading Redux reducers.
 * It adds the provided reducers to the store's reducer manager and dispatches an initialization action for each reducer.
 * Optionally, it can remove the reducers and dispatch a destroy action when the component is unmounted.
 */
export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const { children, reducers, removeAfterUnmount } = props;
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Add reducers to the reducer manager and dispatch initialization actions
        Object.entries(reducers).forEach(([name, reducer]) => {
            store.reducerManager.add(
                name as StateSchemaKey,
                reducer as Reducer
            );
            dispatch({ type: `@INIT ${name} reducer` });
        });

        // Remove reducers and dispatch destroy actions if removeAfterUnmount is true
        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>{children}</>;
};
