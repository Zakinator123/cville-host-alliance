// Inline content data - extracted from seed script

export type SiteSettings = {
  orgName: string;
  tagline: string;
  heroContent: {
    headline: string;
    subheadline: string;
    ctaLabel: string;
    ctaHref: string;
  };
};

export type Page = {
  _id: string;
  title: string;
  slug: string;
  content: string[];
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  publishedAt: string;
  featured: boolean;
};

export type EvidenceItem = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  source: string;
  sourceUrl: string;
  stats: Array<{ label: string; value: string }>;
};

export const siteSettings: SiteSettings = {
  orgName: 'Cville STR Advocates',
  tagline: 'Demanding inclusive process and evidence-based policy.',
  heroContent: {
    headline: 'We Need Thoughtful HomeStay/STR Policy',
    subheadline:
      'We are a group of Charlottesville and Albemarle hosts working to keep STR rules fair — and ready to bring our own ideas to the City when the time comes.',
    ctaLabel: 'Stay in the loop',
    ctaHref: '#email-signup',
  },
};

export const pages: Page[] = [
  {
    _id: 'page.about',
    title: 'About',
    slug: 'about',
    content: [
      'Cville STR Advocates is a growing group of Charlottesville residents involved in the local short-term rental (STR) and homestay community. We include individuals with a range of perspectives—some who initially opposed STRs but have since gained a better understanding of how they function within our community.',
      'We were not given a meaningful opportunity to participate in the discussion about the current and new regulations. We were presented with a proposal at a public meeting that most of the people this affects did not know about. We are demanding that the City pause further action and allow for broader, more inclusive engagement that seeks input on both the current regulations and proposed new regulations before any decisions are made.',
      'Our members include families who rely on STR income to pay their mortgages, homeowners building ADUs for aging parents, caregivers earning flexible income while raising young children, and small local developers rehabilitating older properties and adding missing middle housing to the city. We are the people directly affected by these regulations, and we deserve a seat at the table.',
      'We share the community\'s goals: we want more housing, we want affordable housing, and we want to protect neighborhood character. But we believe the current process is flawed, the data is insufficient, and the proposed regulations are disconnected from the financial realities facing local families.',
      'Going forward, we want to stay in touch as a group of hosts so we can show up at meetings when it matters, and occasionally bring our own ideas to the City instead of only reacting to proposals. If you host, own an ADU, or care about how Charlottesville handles this, we\'d like to be able to reach you the next time it counts.',
    ],
  },
  {
    _id: 'page.platform',
    title: 'What We\'re Asking For',
    slug: 'platform',
    content: [
      'When NDS first proposed amendments to the homestay ordinance in late 2025 — a $500/3-year permit, mandatory pre-permit inspections, and an affidavit requirement — most of the city\'s 529 identified homestay operators had never been notified. Hosts, ADU owners, and neighbors organized, showed up, and asked the City to slow down and run an inclusive process before changing rules that have worked for a decade.',
      'On **March 24, 2026**, NDS staff reversed course and recommended **no amendments** at this time, focusing instead on monitoring, permitting, and education. The Planning Commission was generally supportive. That was a real win — and it happened because operators spoke up.',
      'The City Council work session in early May is the next decision point. Our ask now is simple: **support staff\'s recommendation, don\'t retask NDS with a new round of restrictions, and keep stakeholders at the table** as Charlottesville responds to the new state law on tenant-operated STRs and any future homestay conversation. The questions that drove the original pushback are still the right ones for any future ordinance work to answer:',
      '**1. What problems are we actually solving?** Why do STRs require additional regulation beyond existing ordinances for noise, parking, and neighborhood conduct? The documented fire incidents in Charlottesville have occurred in traditional commercial rentals, not resident-operated STRs or homestays.',
      '**2. Why are current STR regulations not being applied equitably across all zones?** We need to examine ALL short-term rental activity occurring in ALL zones. Out-of-town and local developers operating at scale are not held to the same safety or training standards, despite contributing more significantly to impacts. The playing field between resident-operators and developers in the same neighborhoods is not level, and that imbalance deserves closer examination before further restrictions are imposed. Why are resident operators—including young families—being limited for not having the ability to purchase buildings that are allowed to operate with less oversight?',
      '**3. How do STRs actually correlate with affordable housing?** New York City banned most STRs in 2023—listings dropped 80%, but rents kept rising and vacancy stayed at historic lows. Meanwhile, in comparable cities, STRs represent less than 2% of housing stock. Are we solving a real problem, or creating new ones? We should explore allocating or marking taxes collected by STRs for Affordable Housing once "Affordable" has been defined.',
      '**4. How can STR regulations incentivize new housing creation?** Without STR income, many residents cannot afford to build ADUs, convert basements, or rehabilitate older properties. Construction costs and interest rates have doubled. How do we ensure zoning reforms actually lead to new missing-middle housing being built? How can STR regulations help offset the costs needed to add new units of missing-middle housing?',
      '**5. Who has been consulted?** The most recent city survey was based on fewer than 600 participants—less than 1.3% of the city\'s population. This is insufficient for policy decisions with far-reaching consequences. Meanwhile, STR and homestay operators—the people most affected—were not meaningfully notified or consulted. We need to ensure that NDS, the Planning Commission, and City Council members have adequately heard and considered perspectives from all stakeholders on this issue, not solely from individuals who submit complaints to NDS—particularly where those complaints are not formally documented or where multiple complaints may originate from the same individuals.',
      'We support safety and responsible management. The constructive framework we want Council to keep building toward is one that:',
      '- **Encourages responsible management**, ensuring that nobody infringes on the quiet enjoyment of anyone\'s home.',
      '- **Rather than limiting residents**, explores how homestays can help the City — by enabling residents and young families to afford homeownership, supporting local tourism, and creating supplemental income and jobs for local households.',
      '- **Modernizes the STR and homestay codes** in a way that is beneficial to both the City and its residents, and treats the new state law on tenant-operated STRs thoughtfully.',
      'If safety and training measures are truly imperative, the right place to start is with the larger commercial operators — not the resident-occupied homestays that have operated safely for years.',
      '**Important for those who may not be aware:** All short-term rentals — whether currently permitted or not — generate tax revenue for both the city and the state. Eliminating this revenue would require the city to offset the shortfall through increases in property taxes, meals taxes, or both, which would have a direct negative impact on local businesses and city residents.',
      'The work isn\'t done. Showing up to the early-May Council work session and the summer 2026 hearings keeps the constructive path on track. Between meetings, we want to stay reachable as a group of hosts so we can rally voices when it matters and, now and then, bring our own ideas to the City rather than only reacting to theirs.',
    ],
  },
];

export const posts: Post[] = [
  {
    _id: 'post.process-flawed',
    title: 'The STR regulation process is flawed—and it\'s not too late to fix it',
    slug: 'process-flawed',
    excerpt:
      'The City presented STR regulations at a meeting most affected residents didn\'t know about, based on a survey of less than 1.3% of the population. We\'re demanding a pause and a real conversation.',
    content: [
      'Here\'s what happened: The City Planning Department developed new homestay regulations and presented them at a public meeting. The City\'s own Granicus software identified 529 STR operators in Charlottesville—yet most of us were never directly notified about the meeting or invited to participate in shaping the proposal.',
      'The majority of us feel we have not been given a meaningful opportunity to participate. We were presented with a finished proposal, not invited to help shape it. And the foundation for these regulations? A city survey with "over 1,000 respondents" according to staff—that\'s just 2% of Charlottesville\'s population.',
      'This is not how policy should be made, especially when it affects 529 local operators and their families—people who rely on STR income to pay mortgages, build housing for aging parents, or earn flexible income while caring for young children.',
      'We\'re not opposed to safety inspections or responsible management standards. But the current proposal creates a two-tier system that rewards wealth over local residency. Residential operators (local homeowners) face strict owner-occupancy requirements, $500 permits, mandatory inspections, and training. Meanwhile, commercial-district operators (often out-of-town investors who can afford expensive commercial properties) face fewer restrictions.',
      'For example, one suggestion was that residential operators should simply purchase "by-right" properties in commercial districts to avoid restrictions. But commercial properties are far more expensive and completely inaccessible to the local families these regulations claim to protect.',
      'The proposed rules penalize local residents for not having the capital to buy commercial real estate, while giving a free pass to wealthy investors who can. This is exactly backwards.',
      'We are asking the City to pause, step back, and have the conversation that should have happened from the beginning. Let\'s seek input on both the current regulations and proposed new regulations, talk about what problems we\'re actually trying to solve, why residential operators should face stricter rules than commercial ones, and how we can create an equitable system that encourages—rather than prevents—local residents from participating in the tourism economy.',
      'It\'s not too late to get this right. But it requires transparency, inclusivity, and a willingness to hear from all 529 operators—not just those who file complaints.',
    ],
    publishedAt: new Date().toISOString(),
    featured: true,
  },
];

export const evidenceItems: EvidenceItem[] = [
  {
    _id: 'evidence.str-tiny-share',
    title: 'STRs are a tiny share of housing stock in comparable cities',
    slug: 'str-tiny-share',
    category: 'housing',
    summary:
      'Research from multiple cities shows STRs typically represent less than 2% of total housing units—far too small to be a primary driver of affordability challenges.',
    source: 'Multiple municipal studies and research reports',
    sourceUrl: 'https://www.kpax.com/news/missoula-county/data-suggest-short-term-rentals-in-missoula-represent-fragment-of-housing-stock',
    stats: [
      { label: 'Burlington, VT', value: '~1%' },
      { label: 'Missoula, MT', value: '~1%' },
      { label: 'Buncombe County, NC', value: '~4.5%' },
      { label: 'European cities (Oxford Economics)', value: '<0.5%' },
    ],
  },
  {
    _id: 'evidence.nyc-ban-failed',
    title: 'NYC\'s STR ban didn\'t improve affordability',
    slug: 'nyc-ban-failed',
    category: 'housing',
    summary:
      'New York City essentially banned STRs in 2023. Listings dropped over 80%, but rents kept rising and vacancy remained at historic lows. Supply—not STR bans—drives affordability.',
    source: 'StreetEasy rental market analysis and NYC data',
    sourceUrl: 'https://www.aol.com/nycs-short-term-rental-ban-155816669.html',
    stats: [
      { label: 'Drop in STR listings', value: '80%+' },
      { label: 'Citywide rent growth (Aug 2023-2024)', value: '0.5%' },
      { label: 'Inventory increase', value: '~3.4%' },
    ],
  },
  {
    _id: 'evidence.colorado-str-revenue',
    title: 'Colorado mountain towns raise millions from STR taxes for community needs',
    slug: 'colorado-str-revenue',
    category: 'revenue',
    summary:
      'Colorado resort communities are using STR lodging taxes to fund affordable housing, infrastructure, childcare, and public safety—demonstrating how STRs can be a net positive for communities when properly taxed.',
    source: 'Avalara and Colorado municipal data',
    sourceUrl: 'https://www.avalara.com/mylodgetax/en/blog/2023/08/how-governments-put-str-lodging-taxes-to-work.html',
    stats: [
      { label: 'Steamboat Springs (annual)', value: '$11M' },
      { label: 'Aspen (annual)', value: '$9M' },
      { label: 'Dillon (annual)', value: '$4.5M' },
    ],
  },
  {
    _id: 'evidence.hosts-local-residents',
    title: 'Most STR hosts are local residents, not corporate investors',
    slug: 'hosts-local-residents',
    category: 'operators',
    summary:
      'Research from Hawai\'i County found that over 75% of STR owners operate only one unit, and 54% rely on STR income to cover their own housing costs.',
    source: 'Hawai\'i County STVR Economic Impact Study (Hunden Partners)',
    sourceUrl: 'https://www.hawaiilife.com/blog/what-the-recent-stvr-study-reveals-implications-for-hawaii-countys-economy/',
    stats: [
      { label: 'Operate only one unit', value: '>75%' },
      { label: 'Rely on income for housing costs', value: '54%' },
      { label: 'Would convert to long-term housing', value: '4%' },
    ],
  },
  {
    _id: 'evidence.minimal-price-impact',
    title: 'STR status accounts for ~1% of housing price changes',
    slug: 'minimal-price-impact',
    category: 'housing',
    summary:
      'Harvard Business Review and Colorado research show STRs account for roughly 1% of housing price changes. Job growth, income growth, and construction shortfalls are the real drivers.',
    source: 'KUNC report on Western Mountain Resort Alliance study',
    sourceUrl: 'https://www.kunc.org/news/2025-03-02/short-term-rental-study-sponsors-argue-against-regulation-others-say-findings-ignore-workforce',
    stats: [
      { label: 'Housing price increase (HBR)', value: '1.14%' },
      { label: 'Rent increase correlation (HBR)', value: '0.8%' },
      { label: 'Overall STR impact on prices', value: '~1%' },
    ],
  },
];

// Helper functions to match the query API
export function getPageBySlug(slug: string): Page | null {
  return pages.find((p) => p.slug === slug) || null;
}

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  return posts.find((p) => p.slug === slug) || null;
}

export function getEvidenceItems(): EvidenceItem[] {
  return [...evidenceItems].sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.title.localeCompare(b.title);
  });
}

export function getSiteSettings(): SiteSettings {
  return siteSettings;
}
