import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ['latin', 'cyrillic']});

export const metadata: Metadata = {
  title: "Dr.Photo | Professional Photogtaphy & Booking",
  description: "Online booking platform for proffesionally photography."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
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