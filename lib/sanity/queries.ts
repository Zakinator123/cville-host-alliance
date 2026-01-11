import { groq } from 'next-sanity'

import { client } from '@/sanity/lib/client'

export async function getPageBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "page" && slug.current == $slug][0]{
      _id,
      _type,
      title,
      "slug": slug.current,
      content,
      seo
    }`,
    { slug },
  )
}

export async function getAllPosts() {
  return client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc){
      _id,
      _type,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      featured,
      seo
    }`,
  )
}

export async function getPostBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      _type,
      title,
      "slug": slug.current,
      excerpt,
      content,
      publishedAt,
      featured,
      seo
    }`,
    { slug },
  )
}

export async function getEvidenceItems() {
  return client.fetch(
    groq`*[_type == "evidenceItem"] | order(category asc, title asc){
      _id,
      _type,
      title,
      "slug": slug.current,
      category,
      summary,
      source,
      sourceUrl,
      stats,
      image,
      seo
    }`,
  )
}

export async function getEvidenceBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "evidenceItem" && slug.current == $slug][0]{
      _id,
      _type,
      title,
      "slug": slug.current,
      category,
      summary,
      source,
      sourceUrl,
      stats,
      image,
      seo
    }`,
    { slug },
  )
}

export async function getUpcomingEvents() {
  return client.fetch(
    groq`*[_type == "event" && date >= now()] | order(date asc){
      _id,
      _type,
      title,
      date,
      location,
      type,
      description,
      actionUrl
    }`,
  )
}

export async function getActiveActions() {
  return client.fetch(
    groq`*[_type == "actionAlert" && (!defined(deadline) || deadline >= now())] | order(deadline asc){
      _id,
      _type,
      title,
      urgency,
      description,
      callScript,
      emailTemplate,
      deadline
    }`,
  )
}

export async function getFAQs() {
  return client.fetch(
    groq`*[_type == "faq"] | order(order asc, question asc){
      _id,
      _type,
      question,
      answer,
      category,
      order
    }`,
  )
}

export async function getSiteSettings() {
  return client.fetch(
    groq`*[_type == "siteSettings"][0]{
      _id,
      _type,
      orgName,
      tagline,
      heroContent,
      socialLinks,
      seo
    }`,
  )
}
