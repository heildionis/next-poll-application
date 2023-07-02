import { buildSelector } from '#/shared/lib/store';

export const [usePollPageVoteError, getPollPageVoteError] = buildSelector(
    (state) => state.pollPageVote?.error || ''
);
