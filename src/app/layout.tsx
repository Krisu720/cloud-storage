import Navbar from "@/components/sections/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/wrappers/Providers";
import Container from "@/components/wrappers/Container";
import Footer from "@/components/sections/Footer";
import { ThemeProvider } from "@/components/wrappers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "cloudstorage",
  description: "Store and move your photos everywhere.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers className={inter.className}>
            <div className="dark:bg-neutral-900 min-h-screen">
              <Container>
                <Navbar />
                {children}
              </Container>
            </div>
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
