import type { Metadata } from "next";
import { Inter, Karla, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster as Toastar} from "react-hot-toast";
import Providers from "./Provider";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });
const eczar = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--Eczar',
});
const karla = Karla({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ['latin'],
  variable: "--font-karla"
})

export const metadata: Metadata = {
  title: "Presidium",
  description: "Software de administacion de juntas directivas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body  className={karla.className + ' h-screen overflow-hidden'} >
        <Providers>
          <Toastar reverseOrder={false} position="top-center" />
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
