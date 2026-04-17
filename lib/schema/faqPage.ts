export type FaqItem = {
  question: string
  answer: string
}

/** Eight on-page + JSON-LD FAQ entries (keep in sync with homepage FAQ section). */
export const TURNBERRY_FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is Turnberry Place Las Vegas?',
    answer:
      'Turnberry Place is a luxury high-rise condominium community in Las Vegas featuring 4 towers with 1-4 bedroom residences, Strip views, and exclusive access to The Stirling Club private amenities. Located at 2827 Paradise Rd, just one block from the Las Vegas Strip.',
  },
  {
    question: 'What is the price range for condos at Turnberry Place?',
    answer:
      'Turnberry Place condos range from $800,000 to $10,000,000+ depending on tower, floor plan, floor level, and views. Tower 1 typically starts around $800K, while Tower 4 penthouses can exceed $10 million.',
  },
  {
    question: 'What amenities are available at Turnberry Place?',
    answer:
      'Turnberry Place residents enjoy exclusive access to The Stirling Club, an 80,000-square-foot private facility featuring pools, fitness center, tennis courts, spa, dining venues, and business facilities. The community is guard-gated with 24-hour security, valet parking, and concierge services.',
  },
  {
    question: 'How many towers are at Turnberry Place?',
    answer:
      'Turnberry Place consists of 4 luxury towers: Tower 1 (38 stories, completed 2000), Tower 2 (45 stories, completed 2001), Tower 3 (45 stories, completed 2002), and Tower 4 (45 stories, completed 2005).',
  },
  {
    question: 'How can I schedule a showing at Turnberry Place?',
    answer:
      'Call (702) 500-1971 to schedule a private showing, or use the Calendly scheduling link on this site to book a tour. Dr. Jan Duffy specializes in Turnberry Place condos and offers personalized tours.',
  },
  {
    question: 'Where is Turnberry Place located?',
    answer:
      'Turnberry Place is located at 2827 Paradise Rd, Las Vegas, NV 89109, just one block east of the Las Vegas Strip between the Wynn Encore and Sahara resorts. The property offers immediate proximity to world-class dining, entertainment, and attractions.',
  },
  {
    question: 'What is The Stirling Club at Turnberry Place?',
    answer:
      'The Stirling Club is an 80,000-square-foot private membership facility exclusively for Turnberry Place residents. It features state-of-the-art fitness center, resort-style pools, tennis courts, spa services, multiple dining venues, business center, and social lounges.',
  },
  {
    question: 'What types of views are available at Turnberry Place?',
    answer:
      'Turnberry Place offers spectacular views including Las Vegas Strip skyline, Red Rock Canyon, Spring Mountain Range, and panoramic city views. Views vary by tower, floor level, and unit orientation.',
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
