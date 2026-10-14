import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import TopBar from "@/components/TopBar";
import Providers from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LIV DOT · Host Dashboard",
  description: "Manage a live event and prepare it for broadcast.",
};

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html
    lang="en"
    className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
  >
    <body className="min-h-full flex flex-col bg-white">
      <Providers>
        <TopBar />
        {children}
      </Providers>
    </body>
  </html>
);

export default RootLayout;
