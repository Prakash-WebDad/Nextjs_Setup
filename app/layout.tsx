import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/app/provider/ReduxProvider";
import ProtectedRoute from "./protectRoute/ProtectRoute";
import AuthBootstrap from "./common/AuthBootstrap";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
});

export const metadata: Metadata = {
  title: "Luxury Land & Property Marketplace",
  description:
    "Browse exclusive land and real estate listings with modern search, immersive galleries, and premium property experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning>
        <ReduxProvider>
          <AuthBootstrap />
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
        </ReduxProvider>
      </body>
    </html>
  );
}