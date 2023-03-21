import { CacheProvider, EmotionCache } from "@emotion/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import theme from "src/app/client/presentation/styles/theme";
import createEmotionCache from "src/app/server/createEmotionCache";

import "./global.css";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
