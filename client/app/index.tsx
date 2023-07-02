import { MantineProvider } from '@mantine/core';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

import { Layout } from './layout';
import { StoreProvider } from './providers/StoreProvider';

interface ProvidersProps {
    children: ReactNode;
    store: ToolkitStore;
}

export const Providers = ({ children, store }: ProvidersProps) => (
    <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
            colorScheme: 'dark',
        }}
    >
        <StoreProvider initialStore={store}>
            <SessionProvider>
                <Layout>{children}</Layout>
            </SessionProvider>
        </StoreProvider>
    </MantineProvider>
);
