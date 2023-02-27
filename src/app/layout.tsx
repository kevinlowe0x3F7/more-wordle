"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import { NavBar } from "./navBar";
import { theme } from "./theme/themes";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body>
          <NavBar />
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
