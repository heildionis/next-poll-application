import { NextApiRequest, NextApiResponse } from 'next';

import { httpPollController } from '$/infrastructure/controllers/Poll/HttpPollController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'POST':
            httpPollController.createPoll(req, res);
            break;
        case 'GET':
            httpPollController.getPoll(req, res);
            break;
        default:
            break;
    }
}
