// import { Inter } from "next/font/google";

import ReactQueryClientProvider from "@/components/ReactQueryClientProvider/ReactQueryClientProvider";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Git browser",
  description: "A simple GitHub browser",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </body>
    </html>
  );
}
