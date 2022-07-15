
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { ReactElement, ReactNode } from 'react';
import '@/src/styles/globals.css';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return getLayout(
    <>
      <Head>
        <title>PCG Vultr Dashboard</title>
      </Head>
      <Component { ...pageProps } />
    </>
  );
}

export default MyApp;
