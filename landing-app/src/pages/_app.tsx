import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/global';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Event Panel</title>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/assets/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/assets/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/assets/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/assets/favicons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/assets/favicons/safari-pinned-tab.svg"
            color="#000b37"
          />
          <link rel="shortcut icon" href="/assets/favicons/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content="Event Panel" />
          <meta name="application-name" content="Event Panel" />
          <meta name="msapplication-TileColor" content="#000b37" />
          <meta
            name="msapplication-config"
            content="/assets/favicons/browserconfig.xml"
          />
          <meta name="theme-color" content="#000b37" />
        </Head>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(App);
