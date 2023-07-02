import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import { Providers } from '#/app';
import { wrapper } from '#/app/providers/StoreProvider';
import '#/app/styles/index.scss';

interface PageProps {
    pageProps: {
        id: number;
    };
}

const inter = Inter({
    weight: ['400', '500', '700'],
    subsets: ['cyrillic', 'latin'],
});

const App = ({
    Component,
    ...rest
}: Omit<AppProps, 'pageProps'> & PageProps) => {
    const { store, props } = wrapper.useWrappedStore(rest);

    return (
        <Providers store={store}>
            <div className={inter.className}>
                <Component {...props.pageProps} />
            </div>
        </Providers>
    );
};

export default App;
