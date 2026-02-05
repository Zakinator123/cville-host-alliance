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

  // Add friendly name for better deliverability
  return `Cville STR Advocates <${resendFrom}>`
}

function getUnsubscribeUrl(email: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cville-str-advocates.org'
  return `${baseUrl}/unsubscribe?email=${encodeURIComponent(email)}`
}

function getWelcomeHtml(name?: string, unsubscribeUrl?: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f9fafb;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #1e40af; padding: 24px; text-align: center;">
            <img src="https://cville-str-advocates.org/cville-str-advocates-logo.png" alt="Cville STR Advocates" style="height: 60px; width: auto;" />
          </div>
          <div style="padding: 32px 24px;">
            <h1 style="color: #1a1a1a; font-size: 24px; margin: 0 0 16px 0;">
              Welcome to Cville STR Advocates
            </h1>
            <p style="margin: 16px 0;">Hi ${name || 'there'},</p>
            <p style="margin: 16px 0;">
              Thanks for joining local hosts working toward fair STR regulations in Charlottesville. 
              We'll keep you posted on city council hearings, votes, and ways to help.
            </p>
            <p style="margin: 24px 0 0 0;">— Cville STR Advocates</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 0;" />
          <div style="padding: 24px; background-color: #f9fafb;">
            <p style="font-size: 12px; color: #666; margin: 0 0 12px 0; text-align: center;">
              Cville STR Advocates · Charlottesville, VA<br />
              You received this email because you signed up for updates.
            </p>
            ${unsubscribeUrl ? `
              <div style="text-align: center; margin-top: 16px;">
                <a href="${unsubscribeUrl}" style="display: inline-block; padding: 8px 16px; font-size: 12px; color: #666; text-decoration: none; border: 1px solid #d1d5db; border-radius: 4px; background-color: #ffffff;">
                  Unsubscribe
                </a>
              </div>
            ` : ''}
          </div>
        </div>
      </body>
    </html>
  `
}

function getPetitionHtml(name?: string, unsubscribeUrl?: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f9fafb;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #1e40af; padding: 24px; text-align: center;">
            <img src="https://cville-str-advocates.org/cville-str-advocates-logo.png" alt="Cville STR Advocates" style="height: 60px; width: auto;" />
          </div>
          <div style="padding: 32px 24px;">
            <h1 style="color: #1a1a1a; font-size: 24px; margin: 0 0 16px 0;">
              Thanks for signing the petition
            </h1>
            <p style="margin: 16px 0;">Hi ${name || 'there'},</p>
            <p style="margin: 16px 0;">
              Your signature has been recorded. We appreciate your support for balanced STR 
              regulations in Charlottesville.
            </p>
            <p style="margin: 16px 0;">We'll follow up with next steps and upcoming city council hearings.</p>
            <p style="margin: 24px 0 0 0;">— Cville STR Advocates</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 0;" />
          <div style="padding: 24px; background-color: #f9fafb;">
            <p style="font-size: 12px; color: #666; margin: 0 0 12px 0; text-align: center;">
              Cville STR Advocates · Charlottesville, VA<br />
              You received this email because you signed the petition.
            </p>
            ${unsubscribeUrl ? `
              <div style="text-align: center; margin-top: 16px;">
                <a href="${unsubscribeUrl}" style="display: inline-block; padding: 8px 16px; font-size: 12px; color: #666; text-decoration: none; border: 1px solid #d1d5db; border-radius: 4px; background-color: #ffffff;">
                  Unsubscribe
                </a>
              </div>
            ` : ''}
          </div>
        </div>
      </body>
    </html>
  `
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
  const unsubscribeUrl = getUnsubscribeUrl(to)

  return resend.emails.send({
    from,
    to,
    subject: 'Welcome to Cville STR Advocates',
    html: getWelcomeHtml(name, unsubscribeUrl),
    text: [
      `Hi${name ? ` ${name}` : ' there'},`,
      '',
      'Thanks for joining local hosts working toward fair STR regulations in Charlottesville.',
      "We'll keep you posted on city council hearings, votes, and ways to help.",
      '',
      '— Cville STR Advocates',
      '',
      `Unsubscribe: ${unsubscribeUrl}`,
    ].join('\n'),
    headers: {
      'List-Unsubscribe': `<${unsubscribeUrl}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
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
  const unsubscribeUrl = getUnsubscribeUrl(to)

  return resend.emails.send({
    from,
    to,
    subject: 'Thanks for signing the petition',
    html: getPetitionHtml(name, unsubscribeUrl),
    text: [
      `Hi${name ? ` ${name}` : ' there'},`,
      '',
      'Your signature has been recorded. We appreciate your support for balanced STR regulations in Charlottesville.',
      "We'll follow up with next steps and upcoming city council hearings.",
      '',
      '— Cville STR Advocates',
      '',
      `Unsubscribe: ${unsubscribeUrl}`,
    ].join('\n'),
    headers: {
      'List-Unsubscribe': `<${unsubscribeUrl}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
  })
}
