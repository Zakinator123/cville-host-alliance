import { checkAdminAuth, getSupporters } from '@/app/actions/export'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

export default async function AdminPage() {
  await checkAdminAuth()

  const supporters = await getSupporters()

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage supporter signups
          </p>
        </div>
      </div>

      <AdminDashboard supporters={supporters} />
    </div>
  )
}
