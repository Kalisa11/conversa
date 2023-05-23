import ToastContext from "./context/ToastContext";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Conversa",
  description: "Versatile messaging app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToastContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
