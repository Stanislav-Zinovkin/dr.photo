import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "@/app/globals.css";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

const inter = Inter({ subsets: ["latin", "cyrillic"],
                      variable: "--font-inter",
 });

export interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// Dynamic metadata for languages (SEO-friendly)

export async function generateMetadata({ params }: { params: Promise<{locale: string}>}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "Index" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
           <div className="relative flex min-h-screen flex-col"> 
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
           </div> 
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}