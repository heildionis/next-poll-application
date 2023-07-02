import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useMemo } from 'react';

import { voteInPoll } from '../../model/services/voteInPoll';
import { usePollPageActions } from '../../model/slice/pollPageSlice';

import { SelectedChoice } from '#/entities/Poll';
import { useAppDispatch } from '#/shared/lib/hooks/useAppDispatch';

// Only can used on page: PollPage with /polls route
export const usePoll = () => {
    const { query } = useRouter();
    const { shareableUrl } = query;

    const dispatch = useAppDispatch();
    const { setChoice } = usePollPageActions();

    const onVoteClick = useCallback(() => {
        dispatch(voteInPoll(shareableUrl as string));
    }, [dispatch, shareableUrl]);

    const onChangeChoice = useCallback(
        (choice: SelectedChoice, index: number) =>
            (e: ChangeEvent<HTMLInputElement>) => {
                setChoice({ selectedChoice: choice, choiceIndex: index });
            },
        [setChoice]
    );

    const result = useMemo(
        () => ({
            onVoteClick,
            onChangeChoice,
        }),
        [onChangeChoice, onVoteClick]
    );

    return result;
};
