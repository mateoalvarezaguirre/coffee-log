import type { Metadata } from "next";
import "@/app/ui/styles/globals.css";
import { RobotoMono } from "@/app/ui/fonts/fonts";
import Providers from "./store/Providers";

export const metadata: Metadata = {
  title: {
    template: '%s | Coffee.log',
    default: 'Coffee.log',
  },
  description: "A blog about coffee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${RobotoMono} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
