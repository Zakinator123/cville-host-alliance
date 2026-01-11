import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  // Token is required even for public datasets when querying from server-side
  token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN,
})
