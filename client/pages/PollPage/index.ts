export type { PollPageSchema } from './model/types/PollPageSchema';
export { pollPageNamespace } from './model/slice/pollPageSlice';

export type { PollPageVoteSchema } from './model/types/PollPageVoteSchema';
export { pollPageVoteNamespace } from './model/slice/pollPageVoteSlice';

export { fetchPoll } from './model/services/fetchPoll';

export { PollPageAsync as PollPage } from './ui/PollPage/PollPage.async';
