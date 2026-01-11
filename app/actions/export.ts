'use server'

import { getSupabaseAdminClient } from '@/lib/supabase/admin'

function toCsv(rows: Record<string, unknown>[]) {
  if (!rows.length) return ''

  const headers = Object.keys(rows[0])
  const escape = (value: unknown) => {
    if (value === null || value === undefined) return ''
    const str = String(value)
    if (str.includes('"') || str.includes(',') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`
    }
    return str
  }

  const lines = [
    headers.join(','),
    ...rows.map((row) => headers.map((key) => escape(row[key])).join(',')),
  ]

  return lines.join('\n')
}

export async function exportSupportersCsv() {
  const supabase = getSupabaseAdminClient()
  const { data, error } = await supabase.from('supporters').select('*')

  if (error || !data) {
    throw new Error('Unable to export supporters')
  }

  return toCsv(data as Record<string, unknown>[])
}

export async function exportPetitionsCsv() {
  const supabase = getSupabaseAdminClient()
  const { data, error } = await supabase.from('petition_signatures').select('*')

  if (error || !data) {
    throw new Error('Unable to export petition signatures')
  }

  return toCsv(data as Record<string, unknown>[])
}
