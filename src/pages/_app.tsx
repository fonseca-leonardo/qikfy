import { CacheProvider, EmotionCache } from "@emotion/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import theme from "src/app/client/presentation/styles/theme";
import createEmotionCache from "src/app/server/createEmotionCache";

import "./global.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
        <DndProvider backend={HTML5Backend}>
          {/* <CssBaseline /> */}
          <Component {...pageProps} />
        </DndProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
