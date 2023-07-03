import { Container, Group, Header, Text } from '@mantine/core';
import Link from 'next/link';
import { FC, memo } from 'react';

import cls from './Navbar.module.scss';

import { getRouteMain, getRoutePoll } from '#/shared/constants/route';

export const Navbar: FC = memo(() => (
    <Header pt={10} className={cls.Navbar} height={56}>
        <Container>
            <Group position='right'>
                <Link href={getRouteMain()}>
                    <Text color='blue'>Home</Text>
                </Link>
                <Link href={getRoutePoll('form')}>
                    <Text color='blue'>Create poll</Text>
                </Link>
            </Group>
        </Container>
    </Header>
));
