import { Alert } from '@mantine/core';
import Head from 'next/head';
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

/**
 * The PollPage component displays a poll and allows the user to vote in the poll.
 * It fetches the poll data based on the shareable URL and handles the rendering of the poll card.
 * If the user has already voted or the poll has expired, it displays the poll results.
 */

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

    /**
     * Callback function for rendering additional poll options.
     * Returns the JSX elements representing the additional options to be rendered.
     *
     * @param poll - The poll object.
     * @returns The JSX elements for the additional poll options.
     */
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

    /**
     * Callback function for rendering extra content.
     * Returns the JSX elements representing the extra content to be rendered.
     *
     * @returns The JSX elements for the extra content.
     */
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

    // Values
    const isPollExpired = useMemo(
        () => isExpired(poll?.expiresAt),
        [poll?.expiresAt]
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Head>
                <title>{poll.title}</title>
            </Head>
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
