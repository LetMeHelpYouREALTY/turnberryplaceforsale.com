import assert from 'node:assert/strict'
import { describe, it, mock } from 'node:test'

import {
  buildFollowUpBossEventBody,
  FUB_SITE_SOURCE,
  sendFollowUpBossEvent,
} from './follow-up-boss.ts'

describe('buildFollowUpBossEventBody', () => {
  it('maps registration exit-intent leads', () => {
    const body = buildFollowUpBossEventBody(
      {
        name: 'Gallery Visitor',
        email: 'visitor@example.com',
        message: 'Exclusive listings request from /photos (exit intent)',
        formName: 'Photos exit-intent',
        sourceUrl: 'https://www.turnberryplaceforsale.com/photos',
        eventType: 'Registration',
      },
      'https://www.turnberryplaceforsale.com/photos'
    )

    assert.equal(body.type, 'Registration')
    assert.equal(body.source, FUB_SITE_SOURCE)
    assert.equal(body.person.emails[0]?.value, 'visitor@example.com')
    assert.ok(body.person.tags.includes('Photos exit-intent'))
  })
})

describe('sendFollowUpBossEvent', () => {
  it('posts to FUB with Basic auth when API key is set', async () => {
    const originalKey = process.env.FOLLOW_UP_BOSS_API_KEY
    process.env.FOLLOW_UP_BOSS_API_KEY = 'test-key-only'

    const fetchMock = mock.fn(async (url: string, init?: RequestInit) => {
      assert.equal(url, 'https://api.followupboss.com/v1/events')
      assert.equal(init?.method, 'POST')
      const headers = init?.headers as Record<string, string>
      assert.equal(headers.Authorization, `Basic ${Buffer.from('test-key-only:', 'utf8').toString('base64')}`)
      assert.equal(headers['X-System'], FUB_SITE_SOURCE)
      return new Response(null, { status: 201 })
    })

    const result = await sendFollowUpBossEvent(
      buildFollowUpBossEventBody(
        {
          name: 'Test User',
          email: 'test@example.com',
          formName: 'Unit test',
        },
        'https://www.turnberryplaceforsale.com/'
      ),
      fetchMock as typeof fetch
    )

    assert.equal(result.ok, true)
    assert.equal(fetchMock.mock.calls.length, 1)

    if (originalKey === undefined) {
      delete process.env.FOLLOW_UP_BOSS_API_KEY
    } else {
      process.env.FOLLOW_UP_BOSS_API_KEY = originalKey
    }
  })
})
