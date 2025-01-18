"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { useState } from "react";
import { Triangle } from "react-loader-spinner";
import CheckAuthentication from "@/components/CheckAuthentication/CheckAuthentication";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {loading ? (
          <CheckAuthentication setLoading={setLoading} loading={loading}>
            <div className="h-[100svh] w-[100svw] flex justify-center items-center">
              <Triangle
                visible={true}
                height="100"
                width="100"
                color="#282D4D"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          </CheckAuthentication>
        ) : (
          <CheckAuthentication setLoading={setLoading} loading={loading}>
            <Toaster position="top-right" />
            {children}
          </CheckAuthentication>
        )}
      </body>
    </html>
  );
}
