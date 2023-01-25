import React from "react";
import "./App.css";
import Router from "./routes/routes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import { themeSelector } from "./features/ThemeSlice";
import { SnackbarProvider } from "notistack";
import Slide from "@mui/material/Slide";
import { ConfirmProvider } from "material-ui-confirm";

const defaultConfirmationOptions = {
  confirmationText: "yes",
  confirmationButtonProps: { variant: "contained", color: "primary" },
  cancellationText: "no",
  cancellationButtonProps: { variant: "outlined", color: "error" },
  contentProps: { dividers: true },
  allowClose: false,
  title: "",
};

function App() {
  const theme = createTheme(useSelector(themeSelector));
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ConfirmProvider defaultOptions={defaultConfirmationOptions}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          TransitionComponent={Slide}
          autoHideDuration={2000}
        >
          <Router />
        </SnackbarProvider>
      </ConfirmProvider>
    </ThemeProvider>
  );
}

export default App;
