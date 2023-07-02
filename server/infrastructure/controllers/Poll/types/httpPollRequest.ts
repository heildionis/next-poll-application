import { NextApiRequest } from 'next';

export interface CreatePollRequest extends NextApiRequest {
    body: {
        title: string;
        choices: string[];
        expirationDuration: number;
    };
}

export interface GetPollRequest extends NextApiRequest {
    query: {
        url?: string;
    };
}

export interface VoteInPollRequest extends NextApiRequest {
    query: {
        url?: string;
    };
    body: {
        choices: string[];
    };
}

export interface IsVoteExistRequest extends NextApiRequest {
    query: {
        url?: string;
    };
}
