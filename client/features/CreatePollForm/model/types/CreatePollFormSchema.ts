import { Poll } from '#/entities/Poll';

export interface CreatePollFormSchema {
    // Fields of form
    title: string;
    choices: string[];
    expirationDuration?: number;

    isPollCreated: boolean;

    // Fields for created polls
    data?: Poll;
    isLoading: boolean;
    error: string;
}
