import { Alert } from '@mantine/core';
import { useRouter } from 'next/router';
import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useFetchPollQuery } from '../../api/pollsApi';
import { usePoll } from '../../lib/hooks/usePoll';
import {
    getSomeChoicesSelected,
    usePollPageChoices,
} from '../../model/selectors/pollPageSelectors';
import { usePollPageVoteError } from '../../model/selectors/pollPageVoteSelectors';
import {
    pollPageReducer,
    usePollPageActions,
} from '../../model/slice/pollPageSlice';
import { pollPageVoteReducer } from '../../model/slice/pollPageVoteSlice';

import {
    Poll,
    PollCard,
    PollCardResults,
    PollCopyButton,
} from '#/entities/Poll';
import { getRoutePoll, getRouteRoot } from '#/shared/constants/route';
import {
    DynamicModuleLoader,
    ReducersList,
} from '#/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { isExpired } from '#/shared/lib/date/isExpired/isExpired';
import { useAppDispatch } from '#/shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from '#/shared/lib/hooks/useInitialEffect';

const reducers: ReducersList = {
    pollPage: pollPageReducer,
    pollPageVote: pollPageVoteReducer,
};

const PollPage = memo(() => {
    // Query
    const { query } = useRouter();
    const { shareableUrl } = query;
    const {
        data: { poll, isVoteExist },
    } = useFetchPollQuery(shareableUrl as string);

    // Internal hooks
    const bindPoll = usePoll();

    // Selectors
    const choices = usePollPageChoices();
    const voteError = usePollPageVoteError();
    const isSomeChoicesSelected = useSelector(getSomeChoicesSelected);

    // Actions
    const dispatch = useAppDispatch();
    const { setChoices } = usePollPageActions();

    // Effects
    useInitialEffect(() => {
        dispatch(setChoices(poll?.choices));
    });

    // Callbacks
    const renderPollOptions = useCallback(
        (poll: Poll) => (
            <>
                <PollCopyButton
                    url={getRouteRoot(getRoutePoll(poll.shareableUrl))}
                    size='xs'
                />
            </>
        ),
        []
    );

    const renderExtra = useCallback(
        () => (
            <>
                {voteError && (
                    <Alert color='red' my={10}>
                        {voteError}
                    </Alert>
                )}
            </>
        ),
        [voteError]
    );

    // Memoized values
    const isPollExpired = useMemo(
        () => isExpired(poll?.expiresAt),
        [poll?.expiresAt]
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            {isVoteExist || isPollExpired ? (
                <PollCardResults item={poll} />
            ) : (
                <PollCard
                    item={poll}
                    choices={choices}
                    isVoteUnavailable={isSomeChoicesSelected}
                    renderOptions={renderPollOptions}
                    renderExtra={renderExtra}
                    {...bindPoll}
                />
            )}
        </DynamicModuleLoader>
    );
});

export default PollPage;
