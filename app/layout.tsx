import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Calcolatrice Lievitazione',
  description: 'Baseline tecnico del progetto per la webapp di stima del lievito fresco.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
