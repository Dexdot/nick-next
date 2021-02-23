import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { LayoutTree } from '@moxy/next-layout';

import { AppLayout } from '@/layouts/AppLayout';
import { useStore } from '@/store/store';
import '@/styles/index.sass';

function App({ Component, pageProps }: AppProps): JSX.Element {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <LayoutTree
        // @ts-ignore
        defaultLayout={<AppLayout />}
        Component={Component}
        pageProps={pageProps}
      />
    </Provider>
  );
}

export default App;
