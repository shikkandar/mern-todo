import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#7C3AED', // Your custom primary color
    },
    secondary: {
      main: '#FDE68A', // Your custom secondary color
    },
    error: {
      main: '#f44336', // Your custom error color
    },
    warning: {
      main: '#ff9800', // Your custom warning color
    },
    info: {
      main: '#2196f3', // Your custom info color
    },
    success: {
      main: '#4caf50', // Your custom success color
    },
    // You can also customize background, text, and other parts of the palette
    background: {
      default: '#fafafa', // Custom background color
      paper: '#ffffff', // Background for paper components
    },
    text: {
      primary: '#212121', // Primary text color
      secondary: '#757575', // Secondary text color
    },
  },
});

export const darkTheme = createTheme({
    palette: {
      mode: 'dark', // Set the theme to dark mode
      primary: {
        main: '#90caf9', // Custom primary color for dark mode
      },
      secondary: {
        main: '#f48fb1', // Custom secondary color for dark mode
      },
      background: {
        default: '#121212', // Dark background color
        paper: '#1d1d1d', // Background for paper components
      },
      text: {
        primary: '#ffffff', // Primary text color
        secondary: '#b0bec5', // Secondary text color
      },
      error: {
        main: '#f44336', // Error color
      },
      warning: {
        main: '#ff9800', // Warning color
      },
      info: {
        main: '#2196f3', // Info color
      },
      success: {
        main: '#4caf50', // Success color
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif', // Optional: Customize the font family
    },
  });
  

