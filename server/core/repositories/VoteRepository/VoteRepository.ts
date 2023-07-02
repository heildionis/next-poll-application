import { query } from 'faunadb';

import { client } from '$/db/connectToDb';

export interface VoteRepository {
    isVoteExist(ipAddress: string, poll: object);
    addVoteByIp(ipAddress: string, poll: object);
}

export class VoteRepo implements VoteRepository {
    async isVoteExist(ipAddress: string, poll: object) {
        const voteExists = await client.query(
            query.Exists(
                query.Match(query.Index('votes_by_ipAddress_and_pollId'), [
                    // @ts-ignore
                    poll.ref.id,
                    ipAddress,
                ])
            )
        );

        return voteExists;
    }

    async addVoteByIp(ipAddress: string, poll: object) {
        await client.query(
            query.Create(query.Collection('votes'), {
                data: {
                    // Ignored because I didn't find any typing for faunadb
                    // @ts-ignore
                    pollId: poll.ref.id,
                    ipAddress,
                },
            })
        );
    }
}

export const voteRepository = new VoteRepo();
