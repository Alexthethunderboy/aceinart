import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'mainContent',
      title: 'Main Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'philosophyTitle',
      title: 'Philosophy Title',
      type: 'string',
    }),
    defineField({
      name: 'philosophyItems',
      title: 'Philosophy Items',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'CTA Button Label',
      type: 'string',
    }),
  ],
  initialValue: {
    title: 'About Ace-in-art',
    subtitle: 'Creative Technologist & Visual Artist',
    mainContent: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "I'm Achilihu Chinedu Emmanuel, a creative technologist and visual artist based in Lagos, Nigeria. My work exists at the intersection of art, design, and technology—where pixels become poetry and code transforms into canvas." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Through digital mediums, I explore themes of identity, culture, and the human experience in our increasingly connected world. Each piece is an experiment, a question posed in color and form, inviting viewers to pause and reflect." }]
      }
    ],
    philosophyTitle: 'Creative Philosophy',
    philosophyItems: [
      "Design with intention, create with passion",
      "Embrace the chaos, find the beauty",
      "Every project tells a story",
      "Push boundaries, break conventions"
    ],
    ctaTitle: "Let's Create Together",
    ctaDescription: "Whether you have a project in mind or just want to chat about art and design, I'd love to hear from you.",
    ctaButtonLabel: "Get in Touch"
  }
})
