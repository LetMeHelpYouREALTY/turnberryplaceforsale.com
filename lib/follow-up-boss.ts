const FUB_EVENTS_URL = 'https://api.followupboss.com/v1/events'
export const FUB_SITE_SOURCE = 'turnberryplaceforsale.com'

export type FollowUpBossEventType =
  | 'General Inquiry'
  | 'Seller Inquiry'
  | 'Property Inquiry'
  | 'Registration'

export type FollowUpBossLeadInput = {
  name: string
  email?: string
  phone?: string
  message?: string
  /** Human-readable form label, e.g. "Photos exit-intent" */
  formName?: string
  sourceUrl?: string
  eventType?: FollowUpBossEventType
}

export type FollowUpBossPerson = {
  firstName: string
  lastName: string
  emails: Array<{ value: string }>
  phones: Array<{ value: string }>
  tags: string[]
}

export type FollowUpBossEventBody = {
  source: string
  system: string
  type: FollowUpBossEventType
  message: string
  description: string
  sourceUrl: string
  person: FollowUpBossPerson
}

const VALID_EVENT_TYPES: FollowUpBossEventType[] = [
  'General Inquiry',
  'Seller Inquiry',
  'Property Inquiry',
  'Registration',
]

export function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim()
  if (!trimmed) return { firstName: '', lastName: '' }
  const space = trimmed.indexOf(' ')
  if (space === -1) return { firstName: trimmed, lastName: '' }
  return {
    firstName: trimmed.slice(0, space),
    lastName: trimmed.slice(space + 1).trim(),
  }
}

export function inferEventType(input: FollowUpBossLeadInput): FollowUpBossEventType {
  if (input.eventType && VALID_EVENT_TYPES.includes(input.eventType)) {
    return input.eventType
  }

  const haystack = `${input.formName ?? ''} ${input.message ?? ''}`.toLowerCase()
  if (
    haystack.includes('vip') ||
    haystack.includes('newsletter') ||
    haystack.includes('exclusive listings') ||
    haystack.includes('exit intent') ||
    haystack.includes('registration')
  ) {
    return 'Registration'
  }

  if (haystack.includes('home value') || haystack.includes('valuation') || haystack.includes('selling')) {
    return 'Seller Inquiry'
  }

  if (haystack.includes('listing') || haystack.includes('mls') || haystack.includes('property')) {
    return 'Property Inquiry'
  }

  return 'General Inquiry'
}

export function buildFollowUpBossEventBody(
  input: FollowUpBossLeadInput,
  fallbackSourceUrl: string
): FollowUpBossEventBody {
  const { firstName, lastName } = splitFullName(input.name)
  const email = input.email?.trim() ?? ''
  const phone = input.phone?.trim() ?? ''
  const formName = input.formName?.trim() || 'Website form'
  const sourceUrl = input.sourceUrl?.trim() || fallbackSourceUrl
  const type = inferEventType(input)

  const fieldSummary = [
    email ? `Email: ${email}` : '',
    phone ? `Phone: ${phone}` : '',
    input.message?.trim() ? `Notes: ${input.message.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  const message =
    input.message?.trim() ||
    fieldSummary ||
    `Lead from ${formName} on ${sourceUrl}`

  const description = `${formName}${sourceUrl ? ` — ${sourceUrl}` : ''}`

  const tags = [FUB_SITE_SOURCE, formName]

  return {
    source: FUB_SITE_SOURCE,
    system: FUB_SITE_SOURCE,
    type,
    message,
    description,
    sourceUrl,
    person: {
      firstName,
      lastName,
      emails: email ? [{ value: email }] : [],
      phones: phone ? [{ value: phone }] : [],
      tags,
    },
  }
}

export type SendFollowUpBossResult =
  | { ok: true; status: number }
  | { ok: false; status?: number; reason: 'missing_api_key' | 'http_error' | 'network_error' }

export async function sendFollowUpBossEvent(
  body: FollowUpBossEventBody,
  fetchImpl: typeof fetch = fetch
): Promise<SendFollowUpBossResult> {
  const apiKey = process.env.FOLLOW_UP_BOSS_API_KEY
  if (!apiKey) {
    return { ok: false, reason: 'missing_api_key' }
  }

  const authorization = `Basic ${Buffer.from(`${apiKey}:`, 'utf8').toString('base64')}`

  try {
    const response = await fetchImpl(FUB_EVENTS_URL, {
      method: 'POST',
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
        'X-System': FUB_SITE_SOURCE,
      },
      body: JSON.stringify(body),
    })

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return { ok: true, status: response.status }
    }

    return { ok: false, status: response.status, reason: 'http_error' }
  } catch {
    return { ok: false, reason: 'network_error' }
  }
}
