import {
    Container,
    rem,
    Text,
    Group,
    Button,
    createStyles,
} from '@mantine/core';
import Link from 'next/link';
import { FC, memo } from 'react';

import { getRoutePoll } from '#/shared/constants/route';

const useStyles = createStyles((theme) => ({
    inner: {
        position: 'relative',
        paddingTop: rem(200),
        paddingBottom: rem(120),

        [theme.fn.smallerThan('sm')]: {
            paddingBottom: rem(80),
            paddingTop: rem(80),
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(62),
        fontWeight: 900,
        lineHeight: 1.1,
        margin: 0,
        padding: 0,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(42),
            lineHeight: 1.2,
        },
    },

    description: {
        marginTop: theme.spacing.xl,
        fontSize: rem(24),

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(18),
        },
    },

    controls: {
        marginTop: `calc(${theme.spacing.xl} * 2)`,

        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xl,
        },
    },

    control: {
        height: rem(54),
        paddingLeft: rem(38),
        paddingRight: rem(38),

        [theme.fn.smallerThan('sm')]: {
            height: rem(54),
            paddingLeft: rem(18),
            paddingRight: rem(18),
            flex: 1,
        },
    },
}));

const MainPage: FC = memo(() => {
    const { classes } = useStyles();
    return (
        <>
            <Container size={700} className={classes.inner}>
                <h1 className={classes.title}>
                    A{' '}
                    <Text
                        component='span'
                        variant='gradient'
                        gradient={{ from: 'blue', to: 'cyan' }}
                        inherit
                    >
                        poll application
                    </Text>{' '}
                </h1>

                <Text className={classes.description} color='dimmed'>
                    Build functional polls – to choose your best choice
                </Text>

                <Group className={classes.controls}>
                    <Link href={getRoutePoll('form')}>
                        <Button
                            size='xl'
                            className={classes.control}
                            variant='gradient'
                            gradient={{ from: 'blue', to: 'cyan' }}
                        >
                            Get started
                        </Button>
                    </Link>
                    <Button
                        component='a'
                        href='https://github.com/mantinedev/mantine'
                        size='xl'
                        variant='default'
                        className={classes.control}
                    >
                        GitHub
                    </Button>
                </Group>
            </Container>
        </>
    );
});

export default MainPage;
