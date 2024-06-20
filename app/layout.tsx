import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans",});

export const metadata: Metadata = {
  title: "Applify",
  description: "your music app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={cn("min-h-screen bg-background font-sans antialiased", 
        inter.variable
        )}
      >
        <Providers>
          <div className="flex min-h-dvh flex-col bg-background">
            {children}
          </div>
        </Providers>
        </body>
    </html>
  );
}
