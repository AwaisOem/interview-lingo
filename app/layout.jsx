import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "InterviewLingo",
  description: "Ai Powered Hiring Assistant",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="bg-white">
              <Navbar/>
              {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
