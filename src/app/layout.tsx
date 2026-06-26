import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from './components/Navbar'; 
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Meu Site Premium",
  description: "Sites profissionais com design de excelência",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Navbar />  {/* ← ADICIONAR AQUI */}
        {children}
      </body>
    </html>
  );
}