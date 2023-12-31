import { query } from 'faunadb';

import { AddPollDto } from './dto/AddPollDto';

import { client } from '$/db/connectToDb';

export interface PollRepository {
    add(dto: AddPollDto);
    addVote(url: string, choices: string[]);
    getByUrl(url: string);
}

export class PollRepo implements PollRepository {
    /**
     * Adds a new poll to the FaunaDB database.
     *
     * @param dto - The poll data to be added.
     * @returns The added poll data.
     */
    public async add(dto: AddPollDto) {
        const response = await client.query(
            query.Create(query.Collection('polls'), { data: dto })
        );

        // Ignored because I didn't find any typing for faunadb
        // @ts-ignore
        return response.data;
    }

    /**
     * Adds a vote to a poll in the FaunaDB database.
     *
     * @param url - The shareable URL of the poll.
     * @param choices - The choices to be voted for.
     * @returns The updated poll data after adding the vote.
     */
    public async addVote(url: string, choices: string[]) {
        const poll = await client.query(
            query.Get(query.Match(query.Index('polls_by_shareableUrl'), url))
        );

        // Ignored because I didn't find any typing for faunadb
        // @ts-ignore
        const pollRef = query.Ref(query.Collection('polls'), poll.ref.id);

        const updatedPoll = await client.query(
            query.Let(
                {
                    poll: query.Get(pollRef),
                    updatedChoices: choices.reduce(
                        (acc, choice) =>
                            query.Update(query.Select(['ref'], acc), {
                                data: {
                                    choices: {
                                        [choice]: query.Add(
                                            query.Select(
                                                ['data', 'choices', choice],
                                                acc
                                            ),
                                            1
                                        ),
                                    },
                                },
                            }),
                        query.Var('poll')
                    ),
                },
                query.Var('updatedChoices')
            )
        );

        // Ignored because I didn't find any typescript support for faunadb
        // @ts-ignore
        return updatedPoll.data;
    }

    /**
     * Retrieves a poll from the FaunaDB database by its shareable URL.
     *
     * @param url - The shareable URL of the poll.
     * @returns The poll data.
     */
    public async getByUrl(url: string) {
        const response = await client.query(
            query.Get(query.Match(query.Index('polls_by_shareableUrl'), url))
        );

        return response;
    }
}

export const pollRepository = new PollRepo();
