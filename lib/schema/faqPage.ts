import { GBP_PHONE_DISPLAY } from 'lib/google-business-profile'

export type FaqItem = {
  question: string
  answer: string
}

/** Eight on-page + JSON-LD FAQ entries (keep in sync with homepage FAQ section). */
export const TURNBERRY_FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is Turnberry Place?',
    answer:
      'Turnberry Place is a guard-gated, four-tower luxury high-rise condominium community at 2827 Paradise Rd in Las Vegas (89109), one block east of the Las Vegas Strip. Residents enjoy private amenities plus membership access to the 80,000-square-foot Stirling Club.',
  },
  {
    question: 'How many towers does Turnberry Place have?',
    answer:
      'Turnberry Place has four towers—Tower 1 (38 stories, completed 2000) and Towers 2–4 (45 stories each, completed 2001–2005). Together they form one iconic Paradise Road address with sweeping Strip, mountain, and city views.',
  },
  {
    question: 'What is the price range for Turnberry Place condos?',
    answer:
      'Residences have historically ranged from roughly $800,000 entry points to $10,000,000+ for premium penthouses, depending on tower, floor, finishes, and view. Dr. Jan Duffy can walk you through what is available today and how pricing compares across towers.',
  },
  {
    question: 'What is The Stirling Club?',
    answer:
      'The Stirling Club is an approximately 80,000-square-foot private club for Turnberry Place residents, with pools, fitness, tennis, spa, dining, and business and social spaces—think resort-style living without leaving the community.',
  },
  {
    question: 'Is Turnberry Place guard-gated?',
    answer:
      'Yes. The community is guard-gated with controlled access and on-site security staff, plus conveniences like valet and concierge—privacy and peace of mind are part of the lifestyle buyers expect here.',
  },
  {
    question: 'How close is Turnberry Place to the Las Vegas Strip?',
    answer:
      'Turnberry Place sits about one block east of the Las Vegas Strip—close enough for world-class dining and entertainment, yet set back from the sidewalk crowds. Landmarks like Wynn and Encore are essentially neighbors.',
  },
  {
    question: 'Who is the listing agent for Turnberry Place condos?',
    answer:
      `Dr. Jan Duffy, REALTOR, focuses on Turnberry Place and Las Vegas luxury high-rise condos. She is licensed in Nevada (S.0197614.LLC) with Berkshire Hathaway HomeServices Nevada Properties and can be reached at ${GBP_PHONE_DISPLAY}.`,
  },
  {
    question: 'Are Turnberry Place condos a good investment?',
    answer:
      'Every buyer’s goals differ, and real estate carries risks—there are no guarantees. What draws investors and owner-occupants alike is a finite high-rise footprint near the Strip, strong lifestyle amenities, and a trophy address. Dr. Jan helps clients review comps, HOA considerations, and timing with their own financial and tax advisors.',
  },
]

export function buildFaqPageSchema(items: FaqItem[] = TURNBERRY_FAQ_ITEMS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  }
}
