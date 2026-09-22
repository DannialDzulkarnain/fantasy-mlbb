import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Fantasy MPL MY | Fantasy Esports for Mobile Legends Malaysia',
  description: 'Interactive fantasy esports web application for Mobile Legends Professional League Malaysia (MPL MY). Build your dream 5-man roster on the MOBA battlefield.',
  openGraph: {
    title: 'Fantasy MPL MY | Fantasy Esports for Mobile Legends Malaysia',
    description: 'Interactive fantasy esports web application for Mobile Legends Professional League Malaysia (MPL MY). Build your dream 5-man roster on the MOBA battlefield.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fantasy MPL MY | Fantasy Esports for Mobile Legends Malaysia',
    description: 'Interactive fantasy esports web application for Mobile Legends Professional League Malaysia (MPL MY). Build your dream 5-man roster on the MOBA battlefield.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
