import { Button, Group, Input, Text } from '@mantine/core';
import { ChangeEvent, memo, useCallback } from 'react';

import { useCreatePollFormChoices } from '../../model/selectors/createPollFormSelectors';
import { useCreatePollFormActions } from '../../model/slice/createPollFormSlice';

import cls from './CreatePollFormChoices.module.scss';

/**
 * Renders a form control to add and remove choices for the create poll form.
 * It also defines functions to handle adding, removing, and changing choices.
 */
export const CreatePollFormChoices = memo(() => {
    const choices = useCreatePollFormChoices();
    const { removeChoice, setChoice, addChoice } = useCreatePollFormActions();

    const onAddChoiceClick = useCallback(() => {
        addChoice();
    }, [addChoice]);

    /**
     * Handles the click event of the remove choice button and removes the selected choice from the store.
     * @param choiceIndex - The index of the choice in the choices array.
     * @param choice - The value of the choice to be removed.
     */
    const onRemoveChoiceClick = useCallback(
        (choiceIndex: number, choice: string) => () => {
            removeChoice([choiceIndex, choice]);
        },
        [removeChoice]
    );

    /**
     * Handles the change event of the choice input and updates the selected choice in the store.
     * @param choiceIndex - The index of the choice in the choices array.
     */
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
