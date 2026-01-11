import { BellIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const actionAlert = defineType({
  name: 'actionAlert',
  title: 'Action Alert',
  type: 'document',
  icon: BellIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'urgency',
      title: 'Urgency',
      type: 'string',
      options: {
        list: [
          { title: 'High', value: 'high' },
          { title: 'Medium', value: 'medium' },
          { title: 'Low', value: 'low' },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'callScript',
      title: 'Call Script',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'emailTemplate',
      title: 'Email Template',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'deadline',
      title: 'Deadline',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      urgency: 'urgency',
      deadline: 'deadline',
    },
    prepare({ title, urgency, deadline }) {
      return {
        title,
        subtitle: `${urgency ? `${urgency.toUpperCase()} priority` : 'No urgency'}${
          deadline ? ` • Due ${new Date(deadline).toLocaleDateString()}` : ''
        }`,
      }
    },
  },
})
