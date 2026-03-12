import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Calcolatrice Lievitazione',
  description: 'Tool in italiano per stimare quanto lievito usare in base a temperatura, tempo e farina.',
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
