'use client'

import { useState } from 'react'
import { exportSupportersCsv } from '@/app/actions/export'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

type AdminDashboardProps = {
  supporters: Supporter[]
}

export function AdminDashboard({ supporters }: AdminDashboardProps) {
  const [exportingSupporters, setExportingSupporters] = useState(false)

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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Supporters ({supporters.length})</CardTitle>
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
  )
}
