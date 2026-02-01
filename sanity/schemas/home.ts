import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroLabel',
      title: 'Hero Label',
      type: 'string',
      description: 'Small text above the main title (e.g., CREATIVE TECHNOLOGIST)',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main heading (e.g., HI, I\'M ACE)',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      description: 'Introductory text under the title.',
    }),
    defineField({
      name: 'primaryCTA',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'link', type: 'string', title: 'Link (e.g., /about)' },
      ],
    }),
    defineField({
      name: 'secondaryCTA',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'link', type: 'string', title: 'Link (e.g., mailto:...)' },
      ],
    }),
  ],
})
