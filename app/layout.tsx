import "./globals.css";
import { Inter } from "next/font/google";
import { GlobalDataProvider } from "@/hooks/useGlobalData";
import { AuthDataProvider } from "@/hooks/useAuthData";
import { ToastContainer } from "react-toastify";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <AuthDataProvider>
          <GlobalDataProvider>{children}</GlobalDataProvider>
        </AuthDataProvider>
      </body>
    </html>
  );
}
