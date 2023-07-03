import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useMemo } from 'react';

import { voteInPoll } from '../../model/services/voteInPoll';
import { usePollPageActions } from '../../model/slice/pollPageSlice';

import { SelectedChoice } from '#/entities/Poll';
import { useAppDispatch } from '#/shared/lib/hooks/useAppDispatch';

/**
 * Custom hook to handle poll functionality on the PollPage.
 * Only can be used on the page: PollPage with /polls route.
 * Returns functions and values for voting in a poll and changing the selected choice.
 */

// Only can used on page: PollPage with /polls route
export const usePoll = () => {
    const { query } = useRouter();
    const { shareableUrl } = query;

    const dispatch = useAppDispatch();
    const { setChoice } = usePollPageActions();

    /**
     * Callback function for handling the vote button click event.
     * Dispatches the voteInPoll action to submit the vote for the poll.
     */
    const onVoteClick = useCallback(() => {
        dispatch(voteInPoll(shareableUrl as string));
    }, [dispatch, shareableUrl]);

    /**
     * Callback function for handling the change event of a choice input.
     * Updates the selected choice in the state using the setChoice action.
     *
     * @param choice - The selected choice.
     * @param index - The index of the choice in the choices array.
     * @returns The event handler function for the input change event.
     */
    const onChangeChoice = useCallback(
        (choice: SelectedChoice, index: number) =>
            (e: ChangeEvent<HTMLInputElement>) => {
                setChoice({ selectedChoice: choice, choiceIndex: index });
            },
        [setChoice]
    );

    /**
     * An object containing the onVoteClick and onChangeChoice functions.
     * Can be used to access these functions outside the hook.
     */
    const result = useMemo(
        () => ({
            onVoteClick,
            onChangeChoice,
        }),
        [onChangeChoice, onVoteClick]
    );

    return result;
};
