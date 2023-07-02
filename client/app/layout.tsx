import { Container } from '@mantine/core';
import { ReactNode } from 'react';

import { Navbar } from '#/widgets/Navbar';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
    <>
        <Navbar />
        <main className='root'>
            <Container>{children}</Container>
        </main>
    </>
);
