"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// Wraps the app so light/dark mode works everywhere
const ThemeProvider = ({ children, ...props }) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;