import { NextApiResponse } from 'next';
import requestIp from 'request-ip';

import {
    CreatePollRequest,
    GetPollRequest,
    VoteInPollRequest,
} from './types/httpPollRequest';

import {
    PollService,
    pollService,
} from '$/core/services/PollService/PollService';
import {
    VoteService,
    voteService,
} from '$/core/services/VoteService/VoteService';
import { ApiError } from '$/lib/exception/ApiError';
import { errorHandler } from '$/lib/exception/errorHandler';

export class HttpPollController {
    constructor(
        readonly pollService: PollService,
        readonly voteService: VoteService
    ) {}

    /**
     * Create a new poll.
     *
     * @param req - The create poll request.
     * @param res - The response object.
     * @returns The created poll.
     */
    async createPoll(req: CreatePollRequest, res: NextApiResponse) {
        try {
            const {
                title,
                choices,
                // default: 24 hours
                expirationDuration = 24 * 60 * 60 * 1000,
            } = req.body;

            if (!choices.length || !title) {
                throw ApiError.notAcceptable(
                    'Fields of poll must not be empty.'
                );
            }

            const poll = {
                title,
                choices,
                expirationDuration,
            };

            const createdPoll = await this.pollService.add(poll);

            return res.status(200).send(createdPoll);
        } catch (error) {
            console.log('Error creating poll:', error);
            return errorHandler(res, error);
        }
    }

    /**
     * Get a poll by its URL.
     *
     * @param req - The get poll request.
     * @param res - The response object.
     * @returns The poll and a flag indicating if the user has already voted.
     */
    async getPoll(req: GetPollRequest, res: NextApiResponse) {
        try {
            const { url } = req.query;

            const ipAddress = requestIp.getClientIp(req);

            const poll = await this.pollService.getByUrl(url);

            if (!poll.data) {
                throw ApiError.notAcceptable('Poll with this url not found.');
            }

            const isVoteExist = await this.voteService.isVoteExist(
                ipAddress as string,
                poll
            );

            return res.status(200).send({ poll: poll.data, isVoteExist });
        } catch (error) {
            console.log('Error fetching poll:', error);
            return errorHandler(res, error);
        }
    }

    /**
     * Vote in a poll.
     *
     * @param req - The vote in poll request.
     * @param res - The response object.
     * @returns The updated poll.
     */
    async voteInPoll(req: VoteInPollRequest, res: NextApiResponse) {
        try {
            const { url } = req.query;
            const { choices } = req.body;
            const ipAddress =
                req.headers['x-real-ip'] || req.connection.remoteAddress;

            const poll = await this.pollService.getByUrl(url);

            if (!poll) {
                throw ApiError.notFound('Poll not found.');
            }

            const isVoteExist = await this.voteService.isVoteExist(
                ipAddress as string,
                poll
            );

            if (isVoteExist) {
                throw ApiError.notAcceptable(
                    'One vote per IP address is allowed.'
                );
            }

            const updatedPoll = await this.pollService.addVote(url, choices);

            this.voteService.addVoteByIp(ipAddress as string, poll);

            return res.status(200).send(updatedPoll);
        } catch (error) {
            console.error('Error voting in poll:', error);
            return errorHandler(res, error);
        }
    }
}

export const httpPollController = new HttpPollController(
    pollService,
    voteService
);
