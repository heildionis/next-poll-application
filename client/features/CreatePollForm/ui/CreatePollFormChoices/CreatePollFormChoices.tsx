import { Button, Group, Input, Text } from '@mantine/core';
import { ChangeEvent, memo, useCallback } from 'react';

import { useCreatePollFormChoices } from '../../model/selectors/createPollFormSelectors';
import { useCreatePollFormActions } from '../../model/slice/createPollFormSlice';

import cls from './CreatePollFormChoices.module.scss';

export const CreatePollFormChoices = memo(() => {
    const choices = useCreatePollFormChoices();
    const { removeChoice, setChoice, addChoice } = useCreatePollFormActions();

    const onAddChoiceClick = useCallback(() => {
        addChoice();
    }, [addChoice]);

    const onRemoveChoiceClick = useCallback(
        (choiceIndex: number, choice: string) => () => {
            removeChoice([choiceIndex, choice]);
        },
        [removeChoice]
    );

    const onChangeChoice = useCallback(
        (choiceIndex: number) => (e: ChangeEvent<HTMLInputElement>) => {
            setChoice([choiceIndex, e.target.value]);
        },
        [setChoice]
    );

    return (
        <>
            <Group>
                <Text component='h3'>Add any choices </Text>
                <Button onClick={onAddChoiceClick} variant='light'>
                    +
                </Button>
            </Group>
            {choices?.map((choice, index) => (
                <Group key={index}>
                    <Input
                        onChange={onChangeChoice(index)}
                        value={choice}
                        placeholder='Input new choice'
                        className={cls.input}
                    />
                    <Button
                        onClick={onRemoveChoiceClick(index, choice)}
                        variant='light'
                    >
                        -
                    </Button>
                </Group>
            ))}
        </>
    );
});
