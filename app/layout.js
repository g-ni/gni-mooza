"use client";
import "./globals.css";
import "tailwindcss/tailwind.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import store from "./_utils/store";
import theme from "./_utils/theme";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <SessionProvider refetchOnWindowFocus={false}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
