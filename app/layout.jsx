import { DM_Sans, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "NestHub – Hostel Management",
  description: "Smart hostel management platform for students and administrators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${syne.variable} ${jetbrainsMono.variable} font-sans bg-[#F9FAFB] text-[#111827] antialiased`}>
        {children}
      </body>
    </html>
  );
}
