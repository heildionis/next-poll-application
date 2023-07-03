import {
    Card,
    Checkbox,
    Title,
    Text,
    Group,
    Stack,
    Button,
} from '@mantine/core';
import { ChangeEvent, FC, ReactNode, memo, useMemo } from 'react';

import { Poll, SelectedChoice } from '../../model/types/poll';

import { formatDate } from '#/shared/lib/date/formatDate/formatDate';

interface PollCardProps {
    item: Poll;
    choices: SelectedChoice[];
    onChangeChoice?: (
        choice: SelectedChoice,
        index: number
    ) => (e: ChangeEvent<HTMLInputElement>) => void;
    onVoteClick?: () => void;
    isVoteUnavailable?: boolean;
    renderOptions?: (poll: Poll) => ReactNode;
    renderExtra?: () => ReactNode;
}

/**
 * Renders a card displaying a poll with options to select choices and vote.
 * The component receives a Poll object as a prop and renders the poll title, choices with checkboxes, and voting options.
 * It also provides an optional renderExtra prop to render additional content and a renderOptions prop to render custom voting options.
 */
export const PollCard: FC<PollCardProps> = memo((props) => {
    const {
        item,
        choices,
        onChangeChoice,
        onVoteClick,
        isVoteUnavailable = false,
        renderOptions,
        renderExtra,
    } = props;

    const renderChoices = useMemo(
        () =>
            choices?.map(({ choice, selected }, index) => (
                <Group key={index} spacing={10}>
                    <Checkbox
                        size='md'
                        mr='xs'
                        checked={selected}
                        onChange={onChangeChoice?.({ choice, selected }, index)}
                        styles={{ input: { cursor: 'pointer' } }}
                    />
                    <Text component='p' fw={500} size='xl'>
                        {choice}
                    </Text>
                </Group>
            )),
        [onChangeChoice, choices]
    );

    return (
        <Card radius='md' p='xl' withBorder>
            <Title order={2}>{item?.title}</Title>
            {renderExtra?.()}
            <Stack spacing={3} py={10}>
                {renderChoices}
            </Stack>
            <Group align='center' position='apart'>
                <Stack>
                    <Text size='sm' component='p'>
                        expires at {formatDate(item.expiresAt)}
                    </Text>
                </Stack>
                <Group>
                    {renderOptions?.(item)}
                    <Button
                        size='xs'
                        disabled={isVoteUnavailable}
                        onClick={onVoteClick}
                    >
                        Send vote
                    </Button>
                </Group>
            </Group>
        </Card>
    );
});
