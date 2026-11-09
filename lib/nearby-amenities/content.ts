import type { FaqItem } from 'lib/schema/faqPage'
import { NEARBY_AMENITIES_COMMUNITY } from 'lib/nearby-amenities/config'

export type NearbyContentSection = {
  id: string
  title: string
  paragraphs: string[]
}

export const NEARBY_AMENITIES_FAQ: FaqItem[] = [
  {
    question: `What grocery stores are near ${NEARBY_AMENITIES_COMMUNITY.name}?`,
    answer:
      'Smith\'s Food and Drug on Maryland Parkway and Albertsons on Desert Inn Road are among the closest full-service supermarkets, each roughly a few minutes by car from Turnberry Place on Paradise Road.',
  },
  {
    question: `How far is ${NEARBY_AMENITIES_COMMUNITY.name} from the Las Vegas Strip?`,
    answer:
      'Turnberry Place sits about one block east of the Las Vegas Strip—walking distance to resorts like Wynn Las Vegas and Encore, while remaining in a guard-gated high-rise community on Paradise Road.',
  },
  {
    question: `Are there hospitals near ${NEARBY_AMENITIES_COMMUNITY.name}?`,
    answer:
      'Yes. Sunrise Hospital & Medical Center on Maryland Parkway and Valley Hospital Medical Center on Desert Inn Road are both a short drive from 2827 Paradise Rd, which matters for peace of mind in luxury high-rise living.',
  },
  {
    question: `How long does it take to reach Harry Reid International Airport from ${NEARBY_AMENITIES_COMMUNITY.name}?`,
    answer:
      'Harry Reid International Airport is approximately 10–15 minutes by car from Turnberry Place via Paradise Road or Interstate 215, depending on traffic—one reason buyers like this Paradise corridor address.',
  },
  {
    question: `What dining is walkable from ${NEARBY_AMENITIES_COMMUNITY.name}?`,
    answer:
      'Resort restaurants at Wynn Las Vegas and Encore—including steakhouses, Italian dining, and cafés—are among the closest fine-dining options, typically within a few minutes on foot from Paradise Road.',
  },
  {
    question: `Is there shopping near ${NEARBY_AMENITIES_COMMUNITY.name}?`,
    answer:
      'Fashion Show Mall on Las Vegas Boulevard and luxury retail at Wynn Plaza and Crystals at CityCenter are a short drive or rideshare from Turnberry Place, complementing on-site Stirling Club amenities.',
  },
  {
    question: `Can residents golf near ${NEARBY_AMENITIES_COMMUNITY.name}?`,
    answer:
      'Wynn Golf Club is adjacent to the Strip resort corridor near Turnberry Place, and Las Vegas Golf Club offers additional public play a few miles west—plus Stirling Club recreation for residents on site.',
  },
  {
    question: `Who can help me tour condos at ${NEARBY_AMENITIES_COMMUNITY.name}?`,
    answer:
      'Dr. Jan Duffy, REALTOR with Berkshire Hathaway HomeServices Nevada Properties (License S.0197614.LLC), specializes in Turnberry Place and can arrange private showings—call the office line listed on this site or schedule online.',
  },
]

export const NEARBY_AMENITIES_SECTIONS: NearbyContentSection[] = [
  {
    id: 'dining',
    title: 'Dining near Turnberry Place',
    paragraphs: [
      'Turnberry Place on Paradise Road puts fine dining within easy reach of home. Wynn Las Vegas and Encore host multiple signature restaurants—including steakhouses, Italian rooms, and resort cafés—typically a short walk or quick rideshare from the towers.',
      'For entertaining at home, grocery runs to Smith\'s on Maryland Parkway or Albertsons on Desert Inn Road supplement resort dining without leaving the Paradise corridor.',
    ],
  },
  {
    id: 'parks-recreation',
    title: 'Parks & recreation',
    paragraphs: [
      'Recreation near Turnberry Place often starts on property at The Stirling Club—the community\'s private club with pools, tennis, and fitness. Clark County and City of Las Vegas operate additional parks and trails across the valley for owners who want open space beyond the towers.',
      'Wynn Golf Club lies along the Strip resort corridor within a short drive of Paradise Road for owners who want a resort course round.',
    ],
  },
  {
    id: 'healthcare',
    title: 'Healthcare & pharmacies',
    paragraphs: [
      'Sunrise Hospital & Medical Center on Maryland Parkway and Valley Hospital Medical Center on Desert Inn Road are established acute-care hospitals a short drive from 2827 Paradise Rd.',
      'Day-to-day needs are covered by nearby pharmacies including CVS on Flamingo Road and Walgreens on Paradise Road—useful for residents who split time between Las Vegas and other homes.',
    ],
  },
  {
    id: 'shopping',
    title: 'Shopping',
    paragraphs: [
      'Fashion Show Mall anchors retail on Las Vegas Boulevard with hundreds of stores, while Wynn Plaza and Crystals at CityCenter cater to luxury shoppers. Resorts World Las Vegas adds another dining-and-retail destination within minutes of Turnberry Place.',
    ],
  },
  {
    id: 'commute',
    title: 'Commute & drive times (approximate)',
    paragraphs: [
      'Harry Reid International Airport: about 10–15 minutes by car via Paradise Road or I-215, traffic dependent.',
      'Las Vegas Strip (Wynn / Encore corridor): about one block west—often under five minutes on foot to resort entrances.',
      'Downtown Summerlin: roughly 20–25 minutes west via I-215 or Charleston Boulevard, depending on time of day.',
      'Downtown Las Vegas / Symphony Park: roughly 10–15 minutes north on Paradise Road or I-15.',
    ],
  },
]
