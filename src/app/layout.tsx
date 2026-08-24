import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ['latin', 'cyrillic']});

export const metadata: Metadata = {
  title: "Dr.Photo | Professional Photogtaphy & Booking",
  description: "Online booking platform for proffesionally photography."
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  
  const { locale } = await params; // lang from URL ([locale])
  return (
    <html lang="" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}