import "./globals.css";

export const metadata = {
  title: "NestHub – Hostel Management",
  description: "Smart hostel management platform for students and administrators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
