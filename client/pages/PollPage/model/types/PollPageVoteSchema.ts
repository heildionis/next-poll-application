import { Poll } from '#/entities/Poll';

export interface PollPageVoteSchema {
    data?: Poll;
    isLoading: boolean;
    error: string;
}
