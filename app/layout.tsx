"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { SettingsProvider } from '../app/service/SettingsContext';
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMounted, setIsMounted] = useState(false); 

  useEffect(() => {
    setIsMounted(true); 
    const lang = localStorage.getItem("lang") || "en";
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, []);

  const bodyClass = isMounted && localStorage.getItem("lang") === "ar" 
    ? `${inter.className} rtl`
    : inter.className;

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>Saldwich</title>
        <link rel="icon" type="image/x-icon" href="/w_logo_white.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=Zain:wght@200;300;400;700;800;900&display=swap" rel="stylesheet"></link>
      </head>

      <body className={bodyClass} suppressHydrationWarning={true}>
        <SettingsProvider>
        {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
