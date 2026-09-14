"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";


interface AppProvidersProps {
  children: React.ReactNode;
  locale: string;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
        {children}
    </ThemeProvider>
  );
}