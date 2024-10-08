import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/NavBar";

const montserrat = Montserrat({ subsets: ["latin"], weight: ['100', '200', '300', '700'] });

export const metadata: Metadata = {
  title: "ToughTalks",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main className="flex flex-grow h-screen w-screen">
        {children}
        </main>
      </body>
    </html>
  );
}
