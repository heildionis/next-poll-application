import { Container, Text, Group, Button } from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';
import { FC, memo } from 'react';

import { useStyles } from './MainPage.styles';

import { getRoutePoll } from '#/shared/constants/route';

const MainPage: FC = memo(() => {
    const { classes } = useStyles();
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
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
                        href='https://github.com/heildionis/next-poll-application'
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
