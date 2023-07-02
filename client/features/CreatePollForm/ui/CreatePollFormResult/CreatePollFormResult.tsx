import { Group, Title, Text, Skeleton, Button } from '@mantine/core';
import Link from 'next/link';
import { FC, memo, useCallback } from 'react';

import {
    useCreatePollFormData,
    useCreatePollFormIsLoading,
    useCreatePollFormTitle,
} from '../../model/selectors/createPollFormSelectors';
import { useCreatePollFormActions } from '../../model/slice/createPollFormSlice';

import { PollCopyButton } from '#/entities/Poll';
import { getRoutePoll, getRouteRoot } from '#/shared/constants/route';

export const CreatePollFormResult: FC = memo(() => {
    const title = useCreatePollFormTitle();
    const poll = useCreatePollFormData();
    const isLoading = useCreatePollFormIsLoading();
    const { resetState } = useCreatePollFormActions();

    const onResetClick = useCallback(() => {
        resetState();
    }, [resetState]);

    if (isLoading) {
        return (
            <>
                <Skeleton width='100%' height={50} />
                <Skeleton mt={10} width='100%' height={30} />
            </>
        );
    }

    return (
        <>
            <Title>Poll: `{title}` created!</Title>
            <Group py={5} position='apart'>
                <Button onClick={onResetClick} variant='outline'>
                    Create another poll
                </Button>
                <Group>
                    <Link href={getRoutePoll(poll.shareableUrl)}>
                        <Text color='blue'>Go to poll</Text>
                    </Link>
                    <PollCopyButton
                        url={getRouteRoot(getRoutePoll(poll.shareableUrl))}
                    />
                </Group>
            </Group>
        </>
    );
});
