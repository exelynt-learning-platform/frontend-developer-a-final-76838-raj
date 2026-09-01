import React from 'react';
import EmployeeManagementContainer from './containers/EmployeeManagementContainer';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    background: { default: '#f4f6f8' },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EmployeeManagementContainer />
    </ThemeProvider>
  );
}