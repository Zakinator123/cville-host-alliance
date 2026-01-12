import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../sanity/env'

const token = process.env.SANITY_API_TOKEN

if (!token) {
  throw new Error('Missing SANITY_API_TOKEN for seeding')
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

type SeedDoc = Record<string, unknown> & { _id: string }

// Helper to generate random keys for blocks
const randomKey = () => Math.random().toString(36).substring(2, 11)

const blocks = (...text: string[]) =>
  text.map((t) => {
    // Parse text for **bold** markers and create proper marks
    const children: any[] = []
    const parts = t.split(/(\*\*.*?\*\*)/)
    
    parts.forEach(part => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Bold text
        const boldText = part.slice(2, -2)
        children.push({
          _key: randomKey(),
          _type: 'span',
          text: boldText,
          marks: ['strong']
        })
      } else if (part) {
        // Regular text
        children.push({
          _key: randomKey(),
          _type: 'span',
          text: part,
          marks: []
        })
      }
    })
    
    return {
      _key: randomKey(),
      _type: 'block',
      style: 'normal',
      children: children.length > 0 ? children : [{ _key: randomKey(), _type: 'span', text: t, marks: [] }],
      markDefs: []
    }
  })

const docs: SeedDoc[] = [
  {
    _id: 'siteSettings.default',
    _type: 'siteSettings',
    orgName: 'Charlottesville Host Alliance',
    tagline: 'Demanding inclusive process and evidence-based policy.',
    heroContent: {
      headline: 'We Need Thoughtful HomeStay/STR Policy',
      subheadline:
        'We are a coalition of Charlottesville and Albemarle hosts standing up for balanced STR policy that protects housing, tourism, and neighborhood vitality.',
      ctaLabel: 'Join Us',
      ctaHref: '#email-signup',
    },
  },
  {
    _id: 'page.about',
    _type: 'page',
    title: 'About',
    slug: { _type: 'slug', current: 'about' },
    content: blocks(
      'The Charlottesville Host Alliance is a growing group of Charlottesville residents involved in the local short-term rental (STR) and homestay community. We include individuals with a range of perspectives—some who initially opposed STRs but have since gained a better understanding of how they function within our community.',
      'We were not given a meaningful opportunity to participate in the discussion about the current and new regulations. We were presented with a proposal at a public meeting that most of the people this affects did not know about. We are demanding that the City pause further action and allow for broader, more inclusive engagement that seeks input on both the current regulations and proposed new regulations before any decisions are made.',
      'Our members include families who rely on STR income to pay their mortgages, homeowners building ADUs for aging parents, caregivers earning flexible income while raising young children, and small local developers rehabilitating older properties and adding missing middle housing to the city. We are the people directly affected by these regulations, and we deserve a seat at the table.',
      'We share the community\'s goals: we want more housing, we want affordable housing, and we want to protect neighborhood character. But we believe the current process is flawed, the data is insufficient, and the proposed regulations are disconnected from the financial realities facing local families.',
    ),
  },
  {
    _id: 'page.platform',
    _type: 'page',
    title: 'What We\'re Asking For',
    slug: { _type: 'slug', current: 'platform' },
    content: blocks(
      'We are asking the City to **PAUSE** further action on STR regulations until there is a transparent, inclusive process that solicits input on both the current regulations and proposed new regulations, and addresses the following questions:',
      '**1. What problems are we actually solving?** Why do STRs require additional regulation beyond existing ordinances for noise, parking, and neighborhood conduct? The documented fire incidents in Charlottesville have occurred in traditional commercial rentals, not resident-operated STRs or homestays.',
      '**2. Why are current STR regulations not being applied equitably across all zones?** Out-of-town and local developers operating at scale are not held to the same safety or training standards, despite contributing more significantly to impacts. Why are resident operators—including young families—being limited for not having the ability to purchase buildings that are allowed to operate with less oversight?',
      '**3. How do STRs actually correlate with affordable housing?** New York City banned most STRs in 2023—listings dropped 80%, but rents kept rising and vacancy stayed at historic lows. Meanwhile, in comparable cities, STRs represent less than 2% of housing stock. Are we solving a real problem, or creating new ones?',
      '**4. How can STR regulations incentivize new housing creation?** Without STR income, many residents cannot afford to build ADUs, convert basements, or rehabilitate older properties. Construction costs and interest rates have doubled. How do we ensure zoning reforms actually lead to new missing-middle housing being built?',
      '**5. Who has been consulted?** The most recent city survey was based on fewer than 600 participants—less than 1.3% of the city\'s population. This is insufficient for policy decisions with far-reaching consequences. Meanwhile, STR and homestay operators—the people most affected—were not meaningfully notified or consulted.',
      'We support safety and responsible management. But a pause will give us time to clarify what the City is trying to achieve, present ideas from all stakeholders, and ensure that regulations encourage responsible operation rather than simply limiting residents while giving developers a free pass.',
      'Rather than rushing through poorly-conceived restrictions, let\'s have the conversation that should have happened from the beginning.',
    ),
  },
  {
    _id: 'post.process-flawed',
    _type: 'post',
    title: 'The STR regulation process is flawed—and it\'s not too late to fix it',
    slug: { _type: 'slug', current: 'process-flawed' },
    excerpt:
      'The City presented STR regulations at a meeting most affected residents didn\'t know about, based on a survey of less than 1.3% of the population. We\'re demanding a pause and a real conversation.',
    content: blocks(
      'Here\'s what happened: The City Planning Department developed new homestay regulations and presented them at a public meeting. The City\'s own Granicus software identified 529 STR operators in Charlottesville—yet most of us were never directly notified about the meeting or invited to participate in shaping the proposal.',
      'The majority of us feel we have not been given a meaningful opportunity to participate. We were presented with a finished proposal, not invited to help shape it. And the foundation for these regulations? A city survey with "over 1,000 respondents" according to staff—that\'s just 2% of Charlottesville\'s population.',
      'This is not how policy should be made, especially when it affects 529 local operators and their families—people who rely on STR income to pay mortgages, build housing for aging parents, or earn flexible income while caring for young children.',
      'We\'re not opposed to safety inspections or responsible management standards. But the current proposal creates a two-tier system that rewards wealth over local residency. Residential operators (local homeowners) face strict owner-occupancy requirements, $500 permits, mandatory inspections, and training. Meanwhile, commercial-district operators (often out-of-town investors who can afford expensive commercial properties) face fewer restrictions.',
      'For example, one suggestion was that residential operators should simply purchase "by-right" properties in commercial districts to avoid restrictions. But commercial properties are far more expensive and completely inaccessible to the local families these regulations claim to protect.',
      'The proposed rules penalize local residents for not having the capital to buy commercial real estate, while giving a free pass to wealthy investors who can. This is exactly backwards.',
      'We are asking the City to pause, step back, and have the conversation that should have happened from the beginning. Let\'s seek input on both the current regulations and proposed new regulations, talk about what problems we\'re actually trying to solve, why residential operators should face stricter rules than commercial ones, and how we can create an equitable system that encourages—rather than prevents—local residents from participating in the tourism economy.',
      'It\'s not too late to get this right. But it requires transparency, inclusivity, and a willingness to hear from all 529 operators—not just those who file complaints.',
    ),
    publishedAt: new Date().toISOString(),
    featured: true,
  },
  {
    _id: 'evidence.str-tiny-share',
    _type: 'evidenceItem',
    title: 'STRs are a tiny share of housing stock in comparable cities',
    slug: { _type: 'slug', current: 'str-tiny-share' },
    category: 'housing',
    summary:
      'Research from multiple cities shows STRs typically represent less than 2% of total housing units—far too small to be a primary driver of affordability challenges.',
    source: 'Multiple municipal studies and research reports',
    sourceUrl:
      'https://www.rrcassociates.com/blog/short-term-rental-research/',
    stats: [
      { _key: 'stat1', label: 'Burlington, VT', value: '~0.7%' },
      { _key: 'stat2', label: 'Missoula, MT', value: '~1.5%' },
      { _key: 'stat3', label: 'Buncombe County, NC', value: '~4.5%' },
      {
        _key: 'stat4',
        label: 'European cities (Oxford Economics)',
        value: '<0.5%',
      },
    ],
  },
  {
    _id: 'evidence.nyc-ban-failed',
    _type: 'evidenceItem',
    title: 'NYC\'s STR ban didn\'t improve affordability',
    slug: { _type: 'slug', current: 'nyc-ban-failed' },
    category: 'housing',
    summary:
      'New York City essentially banned STRs in 2023. Listings dropped over 80%, but rents kept rising and vacancy remained at historic lows. Supply—not STR bans—drives affordability.',
    source: 'Multiple news sources, Zillow data, StreetEasy',
    sourceUrl: 'https://www.zillow.com/research/',
    stats: [
      { _key: 'stat1', label: 'Drop in STR listings', value: '80%+' },
      { _key: 'stat2', label: 'Rent increase year-over-year', value: '~3.5%' },
      { _key: 'stat3', label: 'Vacancy rate', value: '~1.4%' },
    ],
  },
  {
    _id: 'evidence.burlington-housing-fund',
    _type: 'evidenceItem',
    title: 'Burlington collected $1.5M in STR taxes for affordable housing',
    slug: { _type: 'slug', current: 'burlington-housing-fund' },
    category: 'revenue',
    summary:
      'Burlington, Vermont directed $1.5 million in short-term rental tax revenue to its Housing Trust Fund in just over two years. Charlottesville could do the same.',
    source: 'Burlington city government and Vermont state legislature reports',
    sourceUrl: 'https://www.burlingtonvt.gov',
    stats: [
      { _key: 'stat1', label: 'Revenue to Housing Trust Fund', value: '$1.5M' },
      { _key: 'stat2', label: 'Time period', value: '~2 years' },
      { _key: 'stat3', label: 'Registered STR units', value: '~204' },
    ],
  },
  {
    _id: 'evidence.hosts-local-residents',
    _type: 'evidenceItem',
    title: 'Most STR hosts are local residents, not corporate investors',
    slug: { _type: 'slug', current: 'hosts-local-residents' },
    category: 'operators',
    summary:
      'Research from Hawai\'i County found that 75% of STR owners operate only one unit, and 54% rely on STR income to cover their own housing costs.',
    source: 'Hawai\'i County STVR Economic Impact Study',
    sourceUrl: 'https://www.responsiblevacationrentals.com',
    stats: [
      { _key: 'stat1', label: 'Operate only one unit', value: '75%' },
      { _key: 'stat2', label: 'Rely on income for housing costs', value: '54%' },
      { _key: 'stat3', label: 'View purely as investment', value: '20%' },
    ],
  },
  {
    _id: 'evidence.minimal-price-impact',
    _type: 'evidenceItem',
    title: 'STR status accounts for ~1% of housing price changes',
    slug: { _type: 'slug', current: 'minimal-price-impact' },
    category: 'housing',
    summary:
      'Harvard Business Review and Colorado research show STRs account for roughly 1% of housing price changes. Job growth, income growth, and construction shortfalls are the real drivers.',
    source: 'KUNC summary of Colorado research and Harvard Business Review',
    sourceUrl: 'https://www.kunc.org',
    stats: [
      {
        _key: 'stat1',
        label: 'STR contribution to price changes',
        value: '~1-1.14%',
      },
      { _key: 'stat2', label: 'Rent increase correlation', value: '~0.8%' },
      {
        _key: 'stat3',
        label: 'Conway, NH: STR impact on annual rent',
        value: '0.002%',
      },
    ],
  },
  {
    _id: 'actionAlert.demand-pause',
    _type: 'actionAlert',
    title: 'Demand a pause and inclusive process on STR regulations',
    urgency: 'high',
    description: blocks(
      'The City is rushing STR regulations without meaningful input from affected residents. We need City Council to hear from STR operators, homestay hosts, contractors, cleaners, and neighbors who were left out of the process.',
      'Tell Council: Pause the process. Include all stakeholders. Seek input on both current and proposed regulations. Get the facts right before making decisions.',
    ),
    emailTemplate: blocks(
      '**To:** STR@charlottesville.gov',
      '**Subject:** Request to Pause STR Regulations for Inclusive Process',
      '',
      'Dear City Council,',
      'My name is [YOUR NAME] and I live in [NEIGHBORHOOD]. I\'m writing to ask you to **PAUSE** further action on STR regulations until there is a transparent, inclusive process that solicits input on both the current regulations and proposed new regulations, and involves all stakeholders.',
      'The current proposal was developed without meaningful input from the people most affected. Many of us were not notified about the public meeting and were never invited to help shape the regulations. The city survey that informed this process included fewer than 600 participants—less than 1.3% of Charlottesville\'s population.',
      '[Share your personal story: Are you an STR/homestay operator who relies on this income? Do you work in the industry? Are you planning to build housing that requires STR income to be financially viable? Or are you a neighbor with concerns who wants a real conversation?]',
      'Before moving forward, I ask that the City take time to address these critical questions:',
      '• **What problems are we actually solving?** Why do STRs need regulation beyond existing noise and parking ordinances?',
      '• **Why are resident operators held to higher standards** than large-scale commercial developers?',
      '• **How do STRs actually correlate with housing affordability?** (NYC banned STRs—rents still rose.)',
      '• **How can we use STR income to incentivize new housing creation,** not prevent it?',
      '• **Who has been meaningfully consulted** in this process?',
      'I support safety and responsible management. But this process has been rushed, inequitable, and disconnected from the realities facing local families.',
      'Please pause, step back, and have the conversation that should have happened from the beginning.',
      'Thank you,',
      '[YOUR NAME]',
    ),
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'faq.process-broken',
    _type: 'faq',
    question: 'What\'s wrong with the current regulatory process?',
    answer: blocks(
      'The Planning Department developed STR regulations and presented them at a public meeting—but most of the 529 identified STR and homestay operators were never notified. We were presented with a proposal, not invited to help shape it.',
      'The city survey that informed the regulations had "over 1,000 respondents" according to staff—but with a city population of ~46,000, that\'s still just 2% of residents. Many respondents indicated they had no concerns about STRs, yet the proposed rules focus only on restrictions.',
      'Additionally, the process feels rushed and disconnected from reality. For example, staff suggested operators should simply buy properties in "by-right" commercial districts to continue operating—ignoring that commercial properties are far more expensive and inaccessible to local families who rely on STR income to afford their current homes.',
      'We\'re asking for a pause, broader engagement, and a transparent process that seeks input on both current and proposed regulations and includes all stakeholders—not just those who file complaints.',
    ),
    category: 'Process',
    order: 1,
  },
  {
    _id: 'faq.inequitable-standards',
    _type: 'faq',
    question: 'Why are resident operators held to higher standards than commercial developers?',
    answer: blocks(
      'The proposed regulations create a two-tier system that favors wealthy, out-of-town investors over local residents. Here\'s how:',
      'Homestays (residential districts): Must be owner-occupied (185 days/year), require $500 permit every 3 years, mandatory safety inspection, human trafficking training, max 8 occupants, signed affidavit proving residency. These apply to local residents operating in their own homes.',
      'Commercial STRs (by-right commercial districts): Fewer restrictions, no owner-occupancy requirement. These properties are typically much more expensive and owned by large developers or out-of-town investors who can afford commercial real estate.',
      'The proposed rules essentially reward those with capital to buy in commercial zones while restricting local homeowners in residential areas. Why should a resident operating a single unit in their home face stricter rules than a commercial operator running multiple units?',
      'Documented fire incidents in Charlottesville have occurred in traditional commercial rentals, not resident-operated homestays. Yet the regulations target small-scale operators while giving commercial developments a pass.',
    ),
    category: 'Equity',
    order: 2,
  },
  {
    _id: 'faq.enforcement',
    _type: 'faq',
    question: 'Is enforcement too difficult and expensive?',
    answer: blocks(
      'Enforcement does require resources, but registration fees and lodging taxes can fund it. Burlington uses Host Compliance software to track listings and has successfully registered over 200 units.',
      'Missoula raised its registration fees specifically to fund enforcement staff. Technology makes compliance monitoring much easier than it used to be.',
      'The question is whether we want to capture that revenue and regulate the activity—or push it underground where we have no visibility or control.',
    ),
    category: 'Enforcement',
    order: 3,
  },
  {
    _id: 'faq.remove-housing',
    _type: 'faq',
    question: 'Don\'t STRs remove housing from the market and hurt affordability?',
    answer: blocks(
      'The data tells a different story. In comparable cities, STRs make up less than 2% of housing stock. New York City banned most STRs in 2023—listings dropped over 80%, but rents kept climbing and vacancy stayed near historic lows.',
      'The real drivers of affordability are supply, zoning, and construction costs. Many STR-funded units—ADUs, basement apartments, renovated older homes—wouldn\'t exist at all without STR income to justify construction.',
      'This is exactly the conversation we\'re asking to have. Rather than assuming STRs harm affordability, let\'s look at the evidence and explore how STR income can actually incentivize new housing creation.',
    ),
    category: 'Housing',
    order: 4,
  },
]

async function run() {
  // First, delete all existing documents
  console.log('Deleting all existing documents...')
  const allDocs = await client.fetch<Array<{ _id: string }>>(
    '*[_type in ["siteSettings", "page", "post", "evidenceItem", "actionAlert", "faq"]]{_id}'
  )
  
  if (allDocs.length > 0) {
    // Delete documents in batches (Sanity recommends batches of 100)
    const batchSize = 100
    for (let i = 0; i < allDocs.length; i += batchSize) {
      const batch = allDocs.slice(i, i + batchSize)
      const mutations = batch.map((doc) => ({
        delete: { id: doc._id },
      }))
      await client.mutate(mutations)
      console.log(`Deleted batch ${Math.floor(i / batchSize) + 1} (${batch.length} documents)`)
    }
    console.log(`Deleted ${allDocs.length} existing documents`)
  } else {
    console.log('No existing documents to delete')
  }

  // Then create/seed all documents
  console.log('Seeding documents...')
  for (const doc of docs) {
    await client.createOrReplace(doc)
    console.log(`Seeded ${doc._id}`)
  }

  console.log('Seed complete')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
