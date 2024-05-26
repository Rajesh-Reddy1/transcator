// app/layout.js
import { AuthProvider } from "@/components/AuthContext"; // Import AuthProvider
import "./globals.css";

import { Viewport } from "next";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <title>Transcator</title>
      <body >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
};
