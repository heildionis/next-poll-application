import { Title, Group, Button, Text } from '@mantine/core';
import Link from 'next/link';
import { memo } from 'react';

import { useStyles } from './NotFoundPage.styles';

export const NotFoundPage = memo(() => {
    const { classes } = useStyles();

    return (
        <div className={classes.inner}>
            <div className={classes.content}>
                <Title className={classes.title}>Nothing to see here</Title>
                <Text
                    color='dimmed'
                    size='lg'
                    align='center'
                    className={classes.description}
                >
                    Page you are trying to open does not exist. You may have
                    mistyped the address, or the page has been moved to another
                    URL. If you think this is an error contact support.
                </Text>
                <Group position='center'>
                    <Link href='/'>
                        <Button size='md'>Take me back to home page</Button>
                    </Link>
                </Group>
            </div>
        </div>
    );
});
