import type { Metadata, Viewport } from "next"
import { GeistSans } from 'geist/font/sans'
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono',
  display: 'swap',
})
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { ToastProvider } from "@/components/providers/ToastProvider"
import { AuthProvider } from "@/features/auth/providers/AuthProvider"
import { GlobalStateProvider } from "@/components/providers/GlobalStateProvider"
import { ShellProvider } from "@/components/providers/ShellProvider"
import { AppShell } from "@/components/layout/shell/AppShell"
import { cn } from "@/lib/utils"
import "./globals.css"

export const metadata: Metadata = {
  title: "AssetDNA | Industrial Knowledge Intelligence",
  description: "The Living Memory of Every Industrial Asset. AI-powered contextual analysis and investigation platform.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(GeistSans.variable, jetbrainsMono.variable)}>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,500,700&f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <GlobalStateProvider>
              <ShellProvider>
                <AppShell>
                  {children}
                </AppShell>
              </ShellProvider>
            </GlobalStateProvider>
          </AuthProvider>
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  )
}
