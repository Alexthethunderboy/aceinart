import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'exhibition',
  title: 'Exhibition',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Exhibition Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (Private Link ID)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'The URL path segment. E.g. /curated/private-client-x',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'password',
      title: 'Password (Optional)',
      type: 'string',
      description: 'If set, users must enter this to view the exhibition.',
    }),
    defineField({
      name: 'artworks',
      title: 'Curated Artworks',
      type: 'array',
      of: [{type: 'reference', to: {type: 'artwork'}}],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'description',
      title: 'Curator Note',
      type: 'text',
    }),
  ],
})
