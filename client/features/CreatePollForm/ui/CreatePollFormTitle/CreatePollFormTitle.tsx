import { Input } from '@mantine/core';
import { ChangeEvent, memo, useCallback } from 'react';

import { useCreatePollFormTitle } from '../../model/selectors/createPollFormSelectors';
import { useCreatePollFormActions } from '../../model/slice/createPollFormSlice';

/**
 * Renders an input field for the title of the create poll form.
 * The component uses the `useCreatePollFormTitle` selector to get the current title value from the store,
 * and the `useCreatePollFormActions` slice to update the title in the store.
 * It also defines an `onChangeTitle` function to handle the input change event and update the title in the store.
 */
export const CreatePollFormTitle = memo(() => {
    const title = useCreatePollFormTitle();
    const { setTitle } = useCreatePollFormActions();

    const onChangeTitle = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
        },
        [setTitle]
    );

    return (
        <>
            <Input.Wrapper>
                <Input.Placeholder>Title of poll</Input.Placeholder>
                <Input
                    placeholder='Input title of poll'
                    value={title}
                    onChange={onChangeTitle}
                />
            </Input.Wrapper>
        </>
    );
});
