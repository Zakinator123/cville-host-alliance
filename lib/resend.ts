import { Resend } from 'resend'

let resendClient: Resend | null = null

function getResend() {
  if (resendClient) {
    return resendClient
  }

  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    throw new Error('Missing RESEND_API_KEY')
  }

  resendClient = new Resend(resendApiKey)
  return resendClient
}

function getFromAddress() {
  const resendFrom = process.env.RESEND_FROM

  if (!resendFrom) {
    throw new Error('Missing RESEND_FROM sender address')
  }

  return resendFrom
}

export async function sendWelcomeEmail({
  to,
  name,
}: {
  to: string
  name?: string
}) {
  const resend = getResend()
  const from = getFromAddress()

  return resend.emails.send({
    from,
    to,
    subject: 'Welcome to the Charlottesville Host Alliance',
    text: [
      `Hi${name ? ` ${name}` : ''},`,
      '',
      'Thanks for standing with local STR hosts.',
      'We will keep you updated on hearings, votes, and action alerts.',
    ].join('\n'),
  })
}

export async function sendPetitionConfirmation({
  to,
  name,
}: {
  to: string
  name?: string
}) {
  const resend = getResend()
  const from = getFromAddress()

  return resend.emails.send({
    from,
    to,
    subject: 'Thanks for signing the petition',
    text: [
      `Hi${name ? ` ${name}` : ''},`,
      '',
      'Your signature has been recorded. We appreciate your support.',
      'We will follow up with next steps as we organize.',
    ].join('\n'),
  })
}
