"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";

interface AppProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

export function AppProviders({ children, locale, messages }: AppProvidersProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <NextIntlClientProvider 
        locale={locale} 
        messages={messages}
        timeZone="UTC"
      >
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}