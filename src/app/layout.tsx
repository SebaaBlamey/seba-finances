"use client";

import "./globals.css";
import { AuthProvider } from "@/presentation/contexts/AuthContext";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          themes={["light", "dark"]}
        >
          <HeroUIProvider>
            <AuthProvider>{children}</AuthProvider>
          </HeroUIProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
