import type { Metadata } from 'next';
import './globals.css';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from '@/components/context/ThemeContext';
const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  
});

export const metadata: Metadata = {
  title: 'Neil Joseph | Portfolio',
  description: 'Portfolio of Neil Joseph, Software Engineer.',
  icons: {
    icon: "/favicon.ico", 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans antialiased", fontSans.variable)}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}