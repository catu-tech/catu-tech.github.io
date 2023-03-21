import { createTheme } from '@mui/material/styles';
import { getColors } from 'theme-colors';

export const baseTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#96FF33',
      ...getColors('#96FF33'),
    },
    secondary: {
      main: '#F9F4EA',
      ...getColors('#F9F4EA'),
    },
    warning: {
      main: "#edd400",
      ...getColors('#edd400'),
    },
    error: {
      main: "#ef2929",
      ...getColors('#ef2929'),
    }
  },
  typography: {
    fontFamily: 'Inter, Helvetica, sans-serif',
    subtitle1: {
      fontSize: "1.25rem",
      lineHeight: 1.25,
    }
  },
  spacing: 8,
});

export default baseTheme;
