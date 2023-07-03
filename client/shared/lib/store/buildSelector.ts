import { useSelector } from 'react-redux';

import { StateSchema } from '#/app/providers/StoreProvider';

type Selector<T, Args extends any[]> = (state: StateSchema, ...args: Args) => T;
type Hook<T, Args extends any[]> = (...args: Args) => T;
type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>];

/**
 * Function-helper that builds a selector hook and selector function pair.
 * It takes a selector function as input and returns a tuple containing the hook and the selector function.
 * The hook can be used to access the selected state in a component.
 * The selector function can be used independently to select state outside of a component.
 */
export const buildSelector = <T, Args extends any[]>(
    selector: Selector<T, Args>
): Result<T, Args> => {
    // Create a useSelector hook with the provided selector function
    const useSelectorHook: Hook<T, Args> = (...args: Args) =>
        useSelector((state: StateSchema) => selector(state, ...args));

    // Return the hook and the original selector function as a tuple
    return [useSelectorHook, selector];
};
