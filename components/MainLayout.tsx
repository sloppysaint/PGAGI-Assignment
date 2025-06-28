import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'
import { Toaster } from 'react-hot-toast'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
      {/* Global Toaster for notifications */}
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </div>
  )
}
