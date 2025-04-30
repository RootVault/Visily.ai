import { Inter, Instrument_Sans } from 'next/font/google';
import localFont from 'next/font/local';

const cal = localFont({
  src: './CalSans-SemiBold.woff2',
  variable: '--font-cal',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cal.variable} ${inter.variable} ${instrumentSans.variable}`}>
      <body>{children}</body>
    </html>
  );
} 