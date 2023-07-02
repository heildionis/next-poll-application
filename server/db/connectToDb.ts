import { Client } from 'faunadb';

export const client = new Client({
    secret: process.env.FAUNA_SECRET,
    endpoint: 'https://db.fauna.com/',
});
