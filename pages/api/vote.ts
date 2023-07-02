import { NextApiRequest, NextApiResponse } from 'next';

import { httpPollController } from '$/infrastructure/controllers/Poll/HttpPollController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'POST':
            httpPollController.voteInPoll(req, res);
            break;

        default:
            break;
    }
}
