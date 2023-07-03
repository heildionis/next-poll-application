import Head from 'next/head';
import { memo } from 'react';

import { CreatePollForm } from '#/features/CreatePollForm';

const PollCreatePage = memo(() => (
    <>
        <Head>
            <title>Create poll</title>
        </Head>
        <CreatePollForm />
    </>
));

export default PollCreatePage;
