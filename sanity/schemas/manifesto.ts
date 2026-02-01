import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'manifestoItem',
  title: 'Manifesto Item',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      validation: (Rule) => Rule.required(),
      rows: 3,
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Quote', value: 'quote'},
          {title: 'News', value: 'news'},
          {title: 'Exhibition', value: 'exhibition'},
          {title: 'Process', value: 'process'},
        ],
      },
      initialValue: 'quote',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'type',
    },
  },
})
