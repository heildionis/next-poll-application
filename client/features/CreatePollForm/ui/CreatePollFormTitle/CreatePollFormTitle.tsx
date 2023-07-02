import { Input } from '@mantine/core';
import { ChangeEvent, memo, useCallback } from 'react';

import { useCreatePollFormTitle } from '../../model/selectors/createPollFormSelectors';
import { useCreatePollFormActions } from '../../model/slice/createPollFormSlice';

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
