import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MockView",
  description: "Ai Powered Hiring Assistant",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Analytics/>
        <SpeedInsights/>
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
