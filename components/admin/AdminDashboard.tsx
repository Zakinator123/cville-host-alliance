'use client'

import { useState } from 'react'
import { exportSupportersCsv, exportPetitionsCsv } from '@/app/actions/export'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IconDownload } from '@tabler/icons-react'

type Supporter = {
  id: string
  email: string
  name: string | null
  zip: string | null
  locality: string | null
  tags: string[] | null
  source: string | null
  subscribed: boolean
  created_at: string
}

type PetitionSignature = {
  id: string
  email: string
  name: string
  zip: string | null
  locality: string | null
  is_host: boolean
  consent_given: boolean
  consent_timestamp: string
  source: string | null
  created_at: string
}

type AdminDashboardProps = {
  supporters: Supporter[]
  petitionSignatures: PetitionSignature[]
  petitionEnabled: boolean
}

export function AdminDashboard({
  supporters,
  petitionSignatures,
  petitionEnabled,
}: AdminDashboardProps) {
  const [exportingSupporters, setExportingSupporters] = useState(false)
  const [exportingPetitions, setExportingPetitions] = useState(false)

  async function handleExportSupporters() {
    setExportingSupporters(true)
    try {
      const csv = await exportSupportersCsv()
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `supporters-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export supporters')
    } finally {
      setExportingSupporters(false)
    }
  }

  async function handleExportPetitions() {
    setExportingPetitions(true)
    try {
      const csv = await exportPetitionsCsv()
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `petition-signatures-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export petition signatures')
    } finally {
      setExportingPetitions(false)
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Tabs defaultValue="supporters" className="space-y-4">
      <TabsList>
        <TabsTrigger value="supporters">
          Supporters ({supporters.length})
        </TabsTrigger>
        <TabsTrigger value="petitions">
          Petition Signatures ({petitionSignatures.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="supporters" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Supporters</CardTitle>
              <Button
                onClick={handleExportSupporters}
                disabled={exportingSupporters}
                variant="outline"
                size="sm"
              >
                <IconDownload className="mr-2 h-4 w-4" />
                {exportingSupporters ? 'Exporting...' : 'Export CSV'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {supporters.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No supporters yet
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Email</th>
                      <th className="text-left p-2 font-medium">Name</th>
                      <th className="text-left p-2 font-medium">Location</th>
                      <th className="text-left p-2 font-medium">Source</th>
                      <th className="text-left p-2 font-medium">Subscribed</th>
                      <th className="text-left p-2 font-medium">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supporters.map((supporter) => (
                      <tr key={supporter.id} className="border-b">
                        <td className="p-2">{supporter.email}</td>
                        <td className="p-2">{supporter.name || '-'}</td>
                        <td className="p-2">
                          {supporter.locality || supporter.zip || '-'}
                        </td>
                        <td className="p-2">{supporter.source || '-'}</td>
                        <td className="p-2">
                          {supporter.subscribed ? 'Yes' : 'No'}
                        </td>
                        <td className="p-2 text-muted-foreground">
                          {formatDate(supporter.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="petitions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Petition Signatures</CardTitle>
                <Button
                  onClick={handleExportPetitions}
                  disabled={exportingPetitions}
                  variant="outline"
                  size="sm"
                >
                  <IconDownload className="mr-2 h-4 w-4" />
                  {exportingPetitions ? 'Exporting...' : 'Export CSV'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {petitionSignatures.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No petition signatures yet
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Name</th>
                        <th className="text-left p-2 font-medium">Email</th>
                        <th className="text-left p-2 font-medium">Location</th>
                        <th className="text-left p-2 font-medium">Host</th>
                        <th className="text-left p-2 font-medium">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {petitionSignatures.map((signature) => (
                        <tr key={signature.id} className="border-b">
                          <td className="p-2">{signature.name}</td>
                          <td className="p-2">{signature.email}</td>
                          <td className="p-2">
                            {signature.locality || signature.zip || '-'}
                          </td>
                          <td className="p-2">
                            {signature.is_host ? 'Yes' : 'No'}
                          </td>
                          <td className="p-2 text-muted-foreground">
                            {formatDate(signature.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
    </Tabs>
  )
}
