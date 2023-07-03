import {
    Card,
    Divider,
    Group,
    Slider,
    SliderStylesNames,
    Stack,
    Styles,
    Text,
    Title,
} from '@mantine/core';
import { FC, ReactNode, memo, useMemo } from 'react';

import { Poll } from '../../model/types/poll';

import { formatDate } from '#/shared/lib/date/formatDate/formatDate';

interface PollCardResultsProps {
    item: Poll;
    renderHeading?: () => ReactNode;
}

/**
 * Renders a card displaying the results of a poll.
 * The component receives a Poll object as a prop and renders the poll title, choices with their respective percentages, and total votes.
 * It also provides an optional renderHeading prop to render additional heading content.
 */
export const PollCardResults: FC<PollCardResultsProps> = memo((props) => {
    const { item, renderHeading } = props;

    /**
     * Styles for the Slider component.
     */
    const styles: Styles<SliderStylesNames, Record<string, any>> = useMemo(
        () => ({
            thumb: {},
            bar: {
                background: 'lightskyblue',
                height: 15,
            },
            trackContainer: {
                cursor: 'auto',
            },
            track: {
                height: 15,
            },
        }),
        []
    );

    /**
     * Calculates the total votes and percentage ratio for each choice in the poll.
     */
    const { totalVotes, percentageRatio } = useMemo(() => {
        const percentageRatio: Record<string, number> = {};

        const totalVotes = Object.entries(item.choices).reduce(
            (totalVotes, [choiceName, votes]) => {
                percentageRatio[choiceName] = 0;

                return totalVotes + votes;
            },
            0
        );

        Object.entries(item?.choices).forEach(([choiceName, votes]) => {
            percentageRatio[choiceName] = (votes / totalVotes) * 100;

            if (!percentageRatio[choiceName]) {
                percentageRatio[choiceName] = 0;
            }
        });

        return {
            totalVotes,
            percentageRatio,
        };
    }, [item.choices]);

    return (
        <Card radius='md' p='xl' withBorder>
            {renderHeading?.()}
            <Title>{item.title}</Title>
            <Stack spacing={16}>
                {Object.entries(percentageRatio).map(
                    ([choiceName, ratio], index) => (
                        <Stack key={index} spacing={4}>
                            <Group position='apart'>
                                <Text>{choiceName}</Text>
                                <Text>{ratio.toFixed(2)}%</Text>
                            </Group>
                            <Slider
                                disabled
                                styles={styles}
                                min={0}
                                max={100}
                                value={ratio}
                            />
                        </Stack>
                    )
                )}
            </Stack>
            <Divider my={16} />
            <Group position='apart'>
                <Text component='h2'>Total votes: {totalVotes}</Text>
                <Text>expired at {formatDate(item?.expiresAt)}</Text>
            </Group>
        </Card>
    );
});
