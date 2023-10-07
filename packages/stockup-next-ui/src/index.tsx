import { ThemeProvider } from "@material-tailwind/react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

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

root.render(
  <BrowserRouter>
    <ThemeProvider value={materialTheme as any}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
