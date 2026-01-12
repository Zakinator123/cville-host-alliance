import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { AdminLoginForm } from '@/components/admin/AdminLoginForm'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export default async function AdminLoginPage() {
  // If no password is set, allow access (for development)
  if (!ADMIN_PASSWORD) {
    redirect('/admin')
  }

  // If already authenticated, redirect to admin dashboard
  const cookieStore = await cookies()
  const authenticated = cookieStore.get('admin-authenticated')?.value === 'true'
  
  if (authenticated) {
    redirect('/admin')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <AdminLoginForm />
    </div>
  )
}
