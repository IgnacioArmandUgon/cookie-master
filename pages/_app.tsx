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

  const AnyComponent = Component as any;

  useEffect(() => {
    const theme: themeType = (Cookies.get('theme') || 'dark') as themeType;
    setTheme(theme);
  }, []);

  return (
    <ThemeProvider theme={themesMapping[theme]}>
      <CssBaseline />
      <AnyComponent {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
