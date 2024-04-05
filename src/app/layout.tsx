/** @format */
"use client";

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/components/Maps/popupMarker.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app"
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <head>
        <title>Weather Forecast</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
