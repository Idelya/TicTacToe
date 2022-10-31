import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#BB86FC",
    },
    secondary: {
      main: "#03DAC5",
    },
  },
});

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default Layout;
