import Navbar from "~/components/sections/Navbar";
import "~/styles/globals.css";
import { Inter } from "next/font/google";
import Providers from "~/components/wrappers/Providers";
import Footer from "~/components/sections/Footer";
import { ThemeProvider } from "~/components/wrappers/ThemeProvider";

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
          <Providers className={""}>
            <div className="min-h-screen  sm:container mx-auto">
              {/* <Container> */}
              <Navbar />
              {children}
              {/* </Container> */}
            </div>
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
