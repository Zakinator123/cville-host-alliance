import { CalendarIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hearing', value: 'hearing' },
          { title: 'Vote', value: 'vote' },
          { title: 'Meeting', value: 'meeting' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'actionUrl',
      title: 'Action URL',
      type: 'url',
      description: 'Link to agenda, signup, or additional context.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      type: 'type',
    },
    prepare({ title, date, type }) {
      return {
        title,
        subtitle: `${type ?? 'Event'} • ${date ? new Date(date).toLocaleDateString() : 'Date TBD'}`,
      }
    },
  },
})
