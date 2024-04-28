import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import NavBar from "@/components/NavBar";
import { cn } from "@/app/lib/utils";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";


const inter = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning     className = {cn('overflow-x-auto', inter.className)}
    >
    <body
    className={cn('min-h-screen')}
    >
    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
        {children}
        <Toaster />
        <Footer />
        </ThemeProvider>
        </body>
    </html>
  );
}
