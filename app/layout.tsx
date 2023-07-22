import "./globals.css";
import { Inter } from "next/font/google";
import { AppProps } from "next/app";
import { GlobalDataProvider } from "@/hooks/useGlobalData";
import { AuthDataProvider } from "@/hooks/useAuthData";
import { toast, ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mixine",
  description: "What if YouTube and Spotify had a baby?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <AuthDataProvider>
          <GlobalDataProvider>{children}</GlobalDataProvider>
        </AuthDataProvider>
      </body>
    </html>
  );
}
