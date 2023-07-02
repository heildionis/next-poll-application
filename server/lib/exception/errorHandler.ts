import { NextApiResponse } from 'next';

import { ApiError } from './ApiError';

export const errorHandler = (res: NextApiResponse, error) => {
    if (error instanceof ApiError) {
        return res.status(error.status).json(error.message);
    }

    return res.status(500).json('Server error.');
};
