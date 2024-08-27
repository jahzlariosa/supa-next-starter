import type { Metadata } from 'next';
import { Antonio, Lato } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/Providers/ThemeProvider';
import Navbar from './components/Theme/Navbar';
import Footer from './components/Theme/Footer/Footer';

const antonio = Antonio({ subsets: ['latin'], weight: ['100', '300', '400', '700'] });
const lato = Lato({ subsets: ['latin'], weight: ['100', '300', '400', '700'] });

export const metadata: Metadata = {
  title: 'The Black Nazarene Hospital',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body className={`${antonio.className} ${lato.className}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
