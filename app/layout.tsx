import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Inkly",
  description: "Connected workspace where better and faster work happens",
  icons:[
    {
      media: "(prefers-color-scheme: light)",
      url: "/newlogo-light-mode.png",
      href: "/newlogo-light-mode.png",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/new-logo-dark-mode.png",
      href: "/newlogo-dark-mode.png",
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
