type TurnstileResponse = {
  success: boolean
  "error-codes"?: string[]
  challenge_ts?: string
  hostname?: string
  action?: string
  cdata?: string
}

export async function verifyTurnstileToken(
  token: string,
  remoteip?: string,
): Promise<TurnstileResponse> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  // In development without Turnstile configured, bypass verification
  if (!secretKey) {
    console.warn('TURNSTILE_SECRET_KEY not set - bypassing verification (development only)')
    return { success: true }
  }

  // If no token provided when Turnstile is enabled, fail verification
  if (!token) {
    return { success: false, "error-codes": ['missing-input-response'] }
  }

  const formData = new FormData()
  formData.append('secret', secretKey)
  formData.append('response', token)

  if (remoteip) {
    formData.append('remoteip', remoteip)
  }

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    throw new Error('Failed to verify Turnstile token')
  }

  return (await res.json()) as TurnstileResponse
}
