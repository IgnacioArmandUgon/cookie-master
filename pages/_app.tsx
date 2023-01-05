import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/system';
import { darkTheme, lightTheme, customTheme } from '../themes';
import { CssBaseline } from '@mui/material';
import Cookies from 'js-cookie';

type themeType = 'dark' | 'light' | 'custom';

const themesMapping = {
  light: lightTheme,
  dark: darkTheme,
  custom: customTheme,
};

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<themeType>('dark');

  useEffect(() => {
    const validThemes = ['light', 'dark', 'custom'];
    const theme: themeType = validThemes.includes(
      Cookies.get('theme') as themeType
    )
      ? (Cookies.get('theme') as themeType)
      : 'dark';

    setTheme(theme);
    console.log({ theme });
    console.log(themesMapping[theme]);
  }, []);

  return (
    <ThemeProvider theme={themesMapping[theme]}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// MyApp.getInitialProps = async (AppCtx: AppContext) => {
//   console.log({ AppCtx });
//   const { theme } = AppCtx.ctx.req //No trae req
//     ? (AppCtx.ctx.req as any).cookies
//     : { theme: 'dark' };
//   const validThemes = ['light', 'dark', 'custom'];

//   return { theme: validThemes.includes(theme) ? theme : 'dark' };
// };

export default MyApp;
