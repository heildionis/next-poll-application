import { ReducersMapObject } from '@reduxjs/toolkit';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { StateSchema } from '../config/StateSchema';
import { AppStore } from '../config/store';

interface StoreProviderProps {
    children: ReactNode;
    initialStore?: AppStore;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider: FC<StoreProviderProps> = (props) => {
    const { children, initialStore, initialState, asyncReducers } = props;

    if (!initialStore) {
        return null;
    }

    return <Provider store={initialStore}>{children}</Provider>;
};
