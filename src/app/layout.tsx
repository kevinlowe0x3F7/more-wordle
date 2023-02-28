"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import { NavBar } from "./navBar";
import { darkTheme } from "./theme/themes";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <body>
          <NavBar />
          <main className="flex min-h-screen flex-col items-center justify-center">
            {children}
          </main>
        </body>
      </ThemeProvider>
    </html>
  );
}
