// app/layout.js or similar root-level component
"use client";
import { createContext, useState, useContext, ReactNode } from 'react';
import { AuthProvider } from '@/components/AuthContext';

export default function RootLayout({ children }:{ children: ReactNode }) {
  return (
    <html>
      {/* ... */}
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
} 