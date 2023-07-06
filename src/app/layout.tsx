import Navbar from "@/components/sections/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/wrappers/Providers";
import Container from "@/components/wrappers/Container";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "cloudstorage",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="dark:bg-neutral-900 min-h-screen">
            <Container>
              <Navbar />
              {children}
            </Container>
          </div>
        </Providers>
      </body>
    </html>
  );
}
