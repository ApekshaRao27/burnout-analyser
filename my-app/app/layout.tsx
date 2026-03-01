"use client";

import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="font-bold text-lg text-blue-600">
              Burnout Risk Analyzer
            </h1>

            <div className="flex gap-4 text-sm font-medium">
              <Link href="/">Dashboard</Link>
              <Link href="/log-work">Log Work</Link>
              <Link href="/log-stress">Log Stress</Link>
              <Link href="/insights">Insights</Link>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
