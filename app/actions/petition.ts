'use server'

import { getSupabaseServerClient } from '@/lib/supabase/server'
import { verifyTurnstileToken } from '@/lib/turnstile'
import { sendPetitionConfirmation } from '@/lib/resend'

type ActionResult = {
  ok: boolean
  error?: string
}

export async function submitPetition(input: {
  name: string
  email: string
  locality?: string
  isHost?: boolean
  consentGiven: boolean
  turnstileToken: string
}): Promise<ActionResult> {
  if (!input.consentGiven) {
    return { ok: false, error: 'Consent is required' }
  }

  const name = input.name?.trim()
  const email = input.email?.trim().toLowerCase()

  if (!name) {
    return { ok: false, error: 'Name is required' }
  }

  if (!email) {
    return { ok: false, error: 'Email is required' }
  }

  try {
    const verification = await verifyTurnstileToken(input.turnstileToken)
    if (!verification.success) {
      return { ok: false, error: 'Turnstile verification failed' }
    }
  } catch {
    return { ok: false, error: 'Turnstile verification failed' }
  }

  const supabase = await getSupabaseServerClient()
  const { error } = await supabase.from('petition_signatures').insert({
    name,
    email,
    locality: input.locality,
    is_host: input.isHost ?? false,
    consent_given: input.consentGiven,
    consent_timestamp: new Date().toISOString(),
    source: 'website',
  })

  if (error && error.code !== '23505') {
    return { ok: false, error: 'Unable to save your signature right now' }
  }

  try {
    await sendPetitionConfirmation({ to: email, name })
  } catch {
    // Swallow email errors
    console.error('Failed to send petition confirmation')
  }

  return { ok: true }
}

export async function getPetitionCount() {
  const supabase = await getSupabaseServerClient()
  const { count, error } = await supabase
    .from('petition_signatures')
    .select('*', { count: 'exact', head: true })

  if (error) {
    return 0
  }

  return count ?? 0
}
