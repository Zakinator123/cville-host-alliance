'use server'

import { getSupabaseServerClient } from '@/lib/supabase/server'
import { sendWelcomeEmail } from '@/lib/resend'

type ActionResult = {
  ok: boolean
  error?: string
}

export async function subscribeEmail(input: {
  email: string
  source?: string
}): Promise<ActionResult> {
  const email = input.email?.trim().toLowerCase()

  if (!email) {
    return { ok: false, error: 'Email is required' }
  }

  const supabase = await getSupabaseServerClient()
  const { error } = await supabase.from('supporters').insert({
    email,
    source: input.source ?? 'website',
    subscribed: true,
  })

  if (error && error.code !== '23505') {
    // Ignore unique constraint violation (email already exists)
    return { ok: false, error: 'Unable to save your email right now' }
  }

  try {
    await sendWelcomeEmail({ to: email })
  } catch (err) {
    // Don't block signup if email fails
    console.error('Failed to send welcome email:', err)
  }

  return { ok: true }
}

export async function updateSupporterInfo(input: {
  email: string
  name?: string
  locality?: string
  zip?: string
}): Promise<ActionResult> {
  const email = input.email?.trim().toLowerCase()

  if (!email) {
    return { ok: false, error: 'Email is required' }
  }

  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from('supporters')
    .update({
      name: input.name,
      locality: input.locality,
      zip: input.zip,
    })
    .eq('email', email)
    .select()

  if (error) {
    console.error('Update error:', error)
    return { ok: false, error: 'Unable to update your info right now' }
  }

  console.log('Update result:', data)

  return { ok: true }
}
