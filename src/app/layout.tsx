import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Talkaholic",
  description: "Join events and trivia with our community!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <title>{metadata.title ?? "Default Title"}</title>
        <meta
          name="description"
          content={metadata.description ?? "Default description for SEO."}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-white text-gray-800">
        <Header />
        <main className="flex-grow px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
