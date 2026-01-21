import { redirect } from 'next/navigation'
import { checkAdminAuth, getSupporters, getPetitionSignatures } from '@/app/actions/export'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

export default async function AdminPage() {
  await checkAdminAuth()

  const [supporters, petitionSignatures] = await Promise.all([
    getSupporters(),
    getPetitionSignatures(),
  ])

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage supporters and petition signatures
          </p>
        </div>
      </div>

      <AdminDashboard
        supporters={supporters}
        petitionSignatures={petitionSignatures}
        petitionEnabled={true}
      />
    </div>
  )
}
