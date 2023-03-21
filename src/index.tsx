import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import baseTheme from "@/themes/base";
import "@/assets/scss/main.scss";
import { SnackbarProvider } from "notistack";
import { VerifiedUserTwoTone } from "@mui/icons-material";
import { getStorage, setStorage } from "./lib/GenericStorage";

const DOCUMENT_READY_STATE: Array<DocumentReadyState> = [
  "complete",
  "interactive",
];

const LoginScreen = () => {
  const [verifying, setVerifying] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [value, setValue] = useState("");

  function checkPassword(e: any) {
    e?.preventDefault();

    if (btoa(value.trim()) === "RHJpbmtDb2ZmZWVFdmVyeWRheQ==") {
      console.log(value);
      setIsLogged(true);
      setValue("");
      setStorage("loginKey", true);
    }
  }

  useEffect(() => {
    const login = getStorage("loginKey");
    console.log(login);
    setIsLogged(typeof login === "boolean");
  }, []);

  if (!isLogged) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "black", width: 80, height: 80 }}>
            <img src="/img/catu-simbolo.svg" alt="Catu Tools" width="100%" />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontFamily: "Monument Extended" }}>
            Catu Tools
          </Typography>
          <Box component="form" onSubmit={() => {}} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={value}
              onChange={(e) => setValue(e.target.value)}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              onClick={checkPassword}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              startIcon={<VerifiedUserTwoTone />}>
              Acessar
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={baseTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

function bootstrapApp() {
  let root = document.getElementById("root") as HTMLElement;

  if (root) {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <SnackbarProvider>
          <LoginScreen />
        </SnackbarProvider>
      </React.StrictMode>
    );
  } else {
    setTimeout(bootstrapApp, 500);
  }
}

function onDocumentReady(func: any) {
  if (DOCUMENT_READY_STATE.includes(document.readyState)) {
    setTimeout(func, 1);
  } else {
    try {
      document.addEventListener("DOMContentLoaded", func, false);
    } catch (e) {
      window.addEventListener("DOMContentLoaded", func, false);
    }
  }
}

Object.assign(window, { onDocumentReady });

onDocumentReady(bootstrapApp);
