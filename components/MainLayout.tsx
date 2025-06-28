'use client'
import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'

export default function MainLayout({ children }: { children: React.ReactNode }) {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1">
        <Header
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
      {/* Global Toaster for notifications */}
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </div>
  )
}
