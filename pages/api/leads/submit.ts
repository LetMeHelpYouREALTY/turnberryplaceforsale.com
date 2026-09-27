import type { NextApiRequest, NextApiResponse } from 'next'

import {
  buildFollowUpBossEventBody,
  sendFollowUpBossEvent,
  type FollowUpBossEventType,
} from 'lib/follow-up-boss'

type LeadFormData = {
  name?: string
  email?: string
  phone?: string
  message?: string
  formName?: string
  sourceUrl?: string
  eventType?: FollowUpBossEventType
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function defaultSourceUrl(req: NextApiRequest): string {
  const fromClient =
    typeof req.body?.sourceUrl === 'string' ? req.body.sourceUrl.trim() : ''
  if (fromClient) return fromClient

  const referer = req.headers.referer
  if (typeof referer === 'string' && referer.trim()) return referer.trim()

  const base = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '')
  return base ? `${base}/` : 'https://www.turnberryplaceforsale.com/'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body: LeadFormData =
    req.body && typeof req.body === 'object' ? req.body : {}

  if (Object.keys(body).length === 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: { body: 'Request body is required' },
    })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!name) {
    return res.status(400).json({
      error: 'Validation failed',
      details: { name: 'Name is required' },
    })
  }

  if (!email && !phone) {
    return res.status(400).json({
      error: 'Validation failed',
      details: { contact: 'Email or phone is required' },
    })
  }

  if (email && !EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      error: 'Validation failed',
      details: { email: 'Invalid email format' },
    })
  }

  const fubBody = buildFollowUpBossEventBody(
    {
      name,
      email: email || undefined,
      phone: phone || undefined,
      message: message || undefined,
      formName: typeof body.formName === 'string' ? body.formName : undefined,
      sourceUrl: typeof body.sourceUrl === 'string' ? body.sourceUrl : undefined,
      eventType: body.eventType,
    },
    defaultSourceUrl(req)
  )

  const fubResult = await sendFollowUpBossEvent(fubBody)

  if (!fubResult.ok) {
    if (fubResult.reason === 'missing_api_key') {
      console.error(
        'FOLLOW_UP_BOSS_API_KEY is not configured — lead was not sent to Follow Up Boss.'
      )
      return res.status(503).json({
        error: 'Lead capture is temporarily unavailable',
      })
    }

    if (fubResult.reason === 'http_error') {
      console.error(
        `Follow Up Boss events API returned HTTP ${fubResult.status ?? 'unknown'}`
      )
    } else {
      console.error('Follow Up Boss events API request failed (network error)')
    }
    return res.status(502).json({
      error: 'Failed to submit lead to CRM',
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Lead submitted successfully',
  })
}
