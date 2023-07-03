import { AppProps } from 'next/app';

import { Providers } from '#/app';
import { wrapper } from '#/app/providers/StoreProvider';
import '#/app/styles/index.scss';

interface PageProps {
    pageProps: {
        id: number;
    };
}

const App = ({
    Component,
    ...rest
}: Omit<AppProps, 'pageProps'> & PageProps) => {
    const { store, props } = wrapper.useWrappedStore(rest);

    return (
        <Providers store={store}>
            <Component {...props.pageProps} />
        </Providers>
    );
};

export default App;
