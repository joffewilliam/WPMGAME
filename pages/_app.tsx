import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider as CustomThemeProvider } from '../contexts/ThemeContext';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';

// Create a basic MUI theme
const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3b82f6', // blue-600 to match Tailwind
    },
    secondary: {
      main: '#10b981', // green-500
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <CustomThemeProvider>
        <Component {...pageProps} />
      </CustomThemeProvider>
    </MuiThemeProvider>
  );
}

export default MyApp;