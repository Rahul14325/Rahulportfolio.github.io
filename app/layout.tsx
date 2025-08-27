import type React from "react"
import type { Metadata } from "next"
import { Poppins, DM_Sans } from "next/font/google"
import "./globals.css"
import { CustomCursor } from "@/components/custom-cursor"

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Rahul Raju Halli - Mechanical Design Engineer",
  description: "Portfolio showcasing innovative CAD models, simulations, and mechanical design projects",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
html {
  font-family: ${dmSans.style.fontFamily};
  --font-sans: ${dmSans.variable};
  --font-serif: ${poppins.variable};
}
        `}</style>
      </head>
      <body className={`${poppins.variable} ${dmSans.variable} antialiased custom-cursor`}>
        <div id="cursor-dot" className="cursor-dot"></div>
        <div id="cursor-ring" className="cursor-ring"></div>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
