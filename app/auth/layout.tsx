import { ThemeProvider } from '@/components/theme-provider'
import Providers from '../providers'


export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Providers>
        <div className="min-h-screen flex items-center justify-center bg-background">
          {children}
        </div>
      </Providers>
    </ThemeProvider>
  )
}
