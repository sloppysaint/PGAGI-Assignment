// app/(dashboard)/layout.tsx
import MainLayout from '@/components/MainLayout'
import AuthRequired from '../auth-required'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthRequired>
      <MainLayout>
        {children}
      </MainLayout>
    </AuthRequired>
  )
}
