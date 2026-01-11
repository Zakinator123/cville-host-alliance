'use server'

import { getSupabaseServerClient } from '@/lib/supabase/server'

type ActionResult = { ok: boolean; error?: string }

export async function unsubscribeEmail(input: {
  email: string
}): Promise<ActionResult> {
  const email = input.email?.trim().toLowerCase()

  if (!email) {
    return { ok: false, error: 'Email is required' }
  }

  const supabase = await getSupabaseServerClient()
  const { error } = await supabase
    .from('supporters')
    .update({ subscribed: false })
    .eq('email', email)

  if (error) {
    return { ok: false, error: 'Unable to unsubscribe right now' }
  }

  return { ok: true }
}
