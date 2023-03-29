import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Head>
        <title>pokemons</title>
        <meta name="description" content="table of pokemons" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Provider>
  );
}
