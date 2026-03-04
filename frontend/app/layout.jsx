import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: "NEXUS AI - Contact Center Intelligence Platform",
  description: "Enterprise Contact Center Intelligence Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className={`${figtree.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
