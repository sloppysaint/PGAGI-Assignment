import '../app/globals.css'
import Providers from './providers'
import MainLayout from '../components/MainLayout'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata = {
  title: 'Personalized Dashboard',
  description: 'Your personalized content feed',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
        <Providers>
          <MainLayout>
            
            {children}
            
          </MainLayout>
        </Providers>
        </ThemeProvider>
       
        
      </body>
    </html>
  )
}
