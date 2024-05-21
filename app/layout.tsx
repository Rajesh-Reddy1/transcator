// app/layout.js
import { AuthProvider } from '@/components/AuthContext'; // Import AuthProvider 
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900">
        <AuthProvider> {/* Wrap your application with AuthProvider */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}