import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";

const materialTheme = {
  button: {
    styles: {
      base: {
        initial: {
          rounded: "rounded",
        },
      },
    },
  },
  card: {
    styles: {
      base: {
        initial: {
          rounded: "rounded-sm",
        },
      },
    },
  },
  cardHeader: {
    styles: {
      base: {
        initial: {
          rounded: "rounded-sm",
        },
      },
    },
  },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider value={materialTheme as any}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
