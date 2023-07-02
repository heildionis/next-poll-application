import { SegmentedControl, Text } from '@mantine/core';
import { memo, useCallback, useMemo } from 'react';

import {
    expirationDurationMapper,
    expirationDurationMapperKeys,
} from '../../model/constants/expirationDurationMapper';
import { useCreatePollFormExpirationDuration } from '../../model/selectors/createPollFormSelectors';
import { useCreatePollFormActions } from '../../model/slice/createPollFormSlice';

export const CreatePollFormExpirationControl = memo(() => {
    const expirationDuration = useCreatePollFormExpirationDuration();
    const { setExpirationDuration } = useCreatePollFormActions();

    const onChangeExpirationDuration = useCallback(
        (selectedDuration: string) => {
            setExpirationDuration(expirationDurationMapper[selectedDuration]);
        },
        [setExpirationDuration]
    );

    const expirationDurationKey = useMemo(
        () =>
            Object.keys(expirationDurationMapper).find(
                (key) => expirationDurationMapper[key] === expirationDuration
            ),
        [expirationDuration]
    );

    return (
        <>
            <Text component='h3'>
                Select the time when the poll will expire
            </Text>
            <SegmentedControl
                radius='sm'
                size='sm'
                bg='gray'
                color='dark'
                value={expirationDurationKey}
                onChange={onChangeExpirationDuration}
                data={expirationDurationMapperKeys}
            />
        </>
    );
});
