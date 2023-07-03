import { SegmentedControl, Text } from '@mantine/core';
import { memo, useCallback, useMemo } from 'react';

import {
    expirationDurationMapper,
    expirationDurationMapperKeys,
} from '../../model/constants/expirationDurationMapper';
import { useCreatePollFormExpirationDuration } from '../../model/selectors/createPollFormSelectors';
import { useCreatePollFormActions } from '../../model/slice/createPollFormSlice';

/**
 * Renders a control to select the expiration duration for the create poll form.
 * It also defines an `onChangeExpirationDuration` function to handle the change event of the segmented control and update the expiration duration in the store.
 * The selected expiration duration is displayed using the `Text` component.
 */
export const CreatePollFormExpirationControl = memo(() => {
    const expirationDuration = useCreatePollFormExpirationDuration();
    const { setExpirationDuration } = useCreatePollFormActions();

    /**
     * Handles the change event of the segmented control and updates the expiration duration in the store.
     */
    const onChangeExpirationDuration = useCallback(
        (selectedDuration: string) => {
            setExpirationDuration(expirationDurationMapper[selectedDuration]);
        },
        [setExpirationDuration]
    );

    /**
     * Retrieves the expiration duration key based on the current expiration duration value.
     */
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
