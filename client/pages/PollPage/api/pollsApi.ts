import { Poll } from '#/entities/Poll';
import { rtkApi } from '#/shared/api';

interface VoteInPollArg {
    shareableUrl: string;
    choices: string[];
}

const pollsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        fetchPoll: build.query<{ poll: Poll; isVoteExist: boolean }, string>({
            query: (shareableUrl) => ({
                url: `/polls`,
                params: { url: shareableUrl },
            }),
            providesTags: ['Poll'],
        }),
        checkIp: build.query<boolean, string>({
            query: (shareableUrl) => ({
                url: '/polls',
                params: {
                    url: shareableUrl,
                },
                method: 'PATCH',
            }),
        }),
        voteInPoll: build.mutation<Poll, VoteInPollArg>({
            query: ({ shareableUrl, choices }) => ({
                url: `/vote`,
                body: {
                    choices,
                },
                method: 'POST',
                params: { url: shareableUrl },
            }),
            invalidatesTags: ['Poll'],
        }),
    }),
});

export const fetchPollFromApi = pollsApi.endpoints.fetchPoll.initiate;
export const getFetchedPoll = pollsApi.endpoints.fetchPoll;

export const voteInPollFromApi = pollsApi.endpoints.voteInPoll.initiate;
export const { useFetchPollQuery, useVoteInPollMutation } = pollsApi;
export const checkIpFromApi = pollsApi.endpoints.checkIp.initiate;
