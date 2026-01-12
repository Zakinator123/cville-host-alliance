'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getSupabaseServerClient } from '@/lib/supabase/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export async function verifyAdminPassword(password: string) {
  if (!ADMIN_PASSWORD) {
    return { ok: false, error: 'Admin password not configured' }
  }

  if (password !== ADMIN_PASSWORD) {
    return { ok: false, error: 'Incorrect password' }
  }

  const cookieStore = await cookies()
  cookieStore.set('admin-authenticated', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return { ok: true }
}

export async function checkAdminAuth() {
  if (!ADMIN_PASSWORD) {
    return true // Allow access if no password is set (for development)
  }

  const cookieStore = await cookies()
  const authenticated = cookieStore.get('admin-authenticated')?.value === 'true'
  
  if (!authenticated) {
    redirect('/admin/login')
  }

  return true
}

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

export async function getSupporters() {
  await checkAdminAuth()
  
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from('supporters')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error('Unable to fetch supporters')
  }

  return data || []
}

export async function getPetitionSignatures() {
  await checkAdminAuth()
  
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from('petition_signatures')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error('Unable to fetch petition signatures')
  }

  return data || []
}

export async function exportSupportersCsv() {
  await checkAdminAuth()
  
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase.from('supporters').select('*')

  if (error || !data) {
    throw new Error('Unable to export supporters')
  }

  return toCsv(data as Record<string, unknown>[])
}

export async function exportPetitionsCsv() {
  await checkAdminAuth()
  
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase.from('petition_signatures').select('*')

  if (error || !data) {
    throw new Error('Unable to export petition signatures')
  }

  return toCsv(data as Record<string, unknown>[])
}
