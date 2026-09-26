import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { AppProviders } from "@/components/providers/app-providers";
import { getDictionary } from "@/lib/dictionary";
import { Toaster } from "sonner";

// Fonts
const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const locales = ["en", "uk", "pl"];

export interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
// checking locale 
  if (!locales.includes(locale)) {
    return {};
  }
  
  const dict = await getDictionary(locale);

  return {
    title: dict.Index?.title || "Dr.Photo",
    description: dict.Index?.description || "Professional photography",
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }


  const dict = await getDictionary(locale);

  return (
    <html 
      lang={locale} 
      className={`${inter.variable} dark`} 
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased font-sans" suppressHydrationWarning>
        <AppProviders >
          <div className="relative flex min-h-screen flex-col"> 
            <Header navDict={dict.Navigation} commonDict={dict.Common} />
            <main className="flex-1 w-full">{children}</main>
            <Toaster theme="dark" position="bottom-right" richColors />
            <Footer footerDict={dict.Footer} navDict={dict.Navigation} />
          </div> 
        </AppProviders>
      </body>
    </html>
  );
}