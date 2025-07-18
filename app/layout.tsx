import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Providers from "./provider"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chronofy	",
  description: "Timesheet management system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}