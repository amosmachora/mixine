import "./globals.css";
import { Inter } from "next/font/google";
import { GlobalDataProvider } from "@/hooks/useGlobalData";
import { AuthDataProvider } from "@/hooks/useAuthData";
import { ToastContainer } from "react-toastify";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mixine",
  description: "What if YouTube and Spotify had a baby?",
};

config.autoAddCss = false;

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
