
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import '@/src/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PCG Vultr Dashboard</title>
      </Head>
      <Script src="https://code.iconify.design/2/2.2.1/iconify.min.js" />
      <Component { ...pageProps } />
    </>
  );
}

export default MyApp;
