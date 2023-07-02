import { Button, Group, Paper, Stack, Title, Text } from '@mantine/core';
import { FC, memo, useCallback, useMemo } from 'react';

import {
    useCreatePollFormError,
    useCreatePollFormIsPollCreated,
} from '../../model/selectors/createPollFormSelectors';
import { createPoll } from '../../model/services/createPoll';
import { createPollFormReducer } from '../../model/slice/createPollFormSlice';
import { CreatePollFormChoices } from '../CreatePollFormChoices/CreatePollFormChoices';
import { CreatePollFormExpirationControl } from '../CreatePollFormExpirationControl/CreatePollFormExpirationControl';
import { CreatePollFormResult } from '../CreatePollFormResult/CreatePollFormResult';
import { CreatePollFormTitle } from '../CreatePollFormTitle/CreatePollFormTitle';

import {
    DynamicModuleLoader,
    ReducersList,
} from '#/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '#/shared/lib/hooks/useAppDispatch';

const reducers: ReducersList = {
    createPollForm: createPollFormReducer,
};

export const CreatePollForm: FC = memo(() => {
    const isPollCreated = useCreatePollFormIsPollCreated();
    const error = useCreatePollFormError();
    const dispatch = useAppDispatch();

    const onCreatePollClick = useCallback(() => {
        dispatch(createPoll());
    }, [dispatch]);

    const renderForm = useMemo(() => {
        if (isPollCreated) {
            return <CreatePollFormResult />;
        }

        return (
            <>
                <Title size={32}>Create a Poll</Title>
                <Text color='red' component='p'>
                    {error}
                </Text>
                <Stack py={32}>
                    <CreatePollFormTitle />
                    <CreatePollFormExpirationControl />
                    <CreatePollFormChoices />
                </Stack>
                <Group position='right'>
                    <Button onClick={onCreatePollClick}>Create</Button>
                </Group>
            </>
        );
    }, [isPollCreated, error, onCreatePollClick]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
            <Paper p='xl' withBorder>
                {renderForm}
            </Paper>
        </DynamicModuleLoader>
    );
});
