import { Poll } from '#/entities/Poll';
import { rtkApi } from '#/shared/api';

export interface CreatePollFormArg {
    title: string;
    choices: string[];
    expirationDuration: number;
}

const createPollFormApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        createPoll: build.mutation<Poll, CreatePollFormArg>({
            query: (poll) => ({
                url: '/polls',
                method: 'POST',
                body: poll,
            }),
        }),
    }),
});

export const createPollFromApi =
    createPollFormApi.endpoints.createPoll.initiate;
