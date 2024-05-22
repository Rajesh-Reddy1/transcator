// app/layout.js
import { AuthProvider } from '@/components/AuthContext'; // Import AuthProvider 
import './globals.css';
import Home from "@/app/Home/page"
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <title>Transcator</title>
      <body className="bg-gray-100 dark:bg-gray-900">
        <AuthProvider>
          {children}
        </AuthProvider>

      </body>
    </html>
  );
}