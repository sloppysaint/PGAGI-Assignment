import '../app/globals.css'
import Providers from './providers'
import MainLayout from '../components/MainLayout'

export const metadata = {
  title: 'Personalized Dashboard',
  description: 'Your personalized content feed',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <MainLayout>
            {children}
          </MainLayout>
        </Providers>
      </body>
    </html>
  )
}
