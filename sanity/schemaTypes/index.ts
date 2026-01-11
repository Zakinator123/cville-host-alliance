import { type SchemaTypeDefinition } from 'sanity'

import { actionAlert } from './actionAlert'
import { evidenceItem } from './evidenceItem'
import { event } from './event'
import { faq } from './faq'
import { page } from './page'
import { post } from './post'
import { seo } from './seo'
import { siteSettings } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, post, evidenceItem, event, actionAlert, faq, siteSettings, seo],
}
