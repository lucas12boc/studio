
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeInitializer } from '@/components/theme-initializer';

export const metadata: Metadata = {
  title: 'ProsperIA: AI para tu Éxito Financiero',
  description: 'Genera estrategias de ingresos personalizadas, descubre oportunidades de aprendizaje y encuentra el trabajo de tus sueños con ProsperIA.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeInitializer />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
