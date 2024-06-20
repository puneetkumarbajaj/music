import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { Menu } from "@/components/menu";

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
          <div className="flex flex-col bg-background min-h-dvh relative">
            <Menu/>
            <main className="flex-1">
            {children}
            </main>
          </div>
        </Providers>
        </body>
    </html>
  );
}
