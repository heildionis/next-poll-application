import {
    CreateSliceOptions,
    SliceCaseReducers,
    bindActionCreators,
    createSlice,
} from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

/**
 * Function that builds a Redux slice and provides a custom hook for accessing slice actions.
 * It takes options for creating a slice as input and returns an object containing the slice and the custom hook.
 */
export const buildSlice = <
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string = string
>(
    options: CreateSliceOptions<State, CaseReducers, Name>
) => {
    // Create a slice using the provided options
    const slice = createSlice(options);

    // Custom hook for accessing slice actions
    const useActions = (): typeof slice.actions => {
        const dispatch = useDispatch();

        // Ignored because redux have very difficult types and @ts-ignore doesn't violate the types of actions
        // @ts-ignore
        return useMemo(
            // @ts-ignore
            () => bindActionCreators(slice.actions, dispatch),
            [dispatch]
        );
    };

    return {
        ...slice,
        useActions,
    };
};
