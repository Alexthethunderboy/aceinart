import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    defineField({
      name: 'gallery',
      title: 'Artwork Gallery',
      type: 'array',
      description: 'Upload as many images or video files (.mp4) as you want to showcase this piece.',
      of: [
        { 
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alternative Text' }
          ]
        },
        { 
          type: 'file',
          title: 'Video File',
          options: { accept: 'video/mp4,video/webm' }
        }
      ],
    }),
    defineField({
      name: 'year',
      title: 'Year created',
      type: 'string',
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string', // Could be array of strings or tags
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vulnerabilityLevel',
      title: 'Vulnerability Level (1-10)',
      description: '1-5: Failed/Raw (Hidden by default), 6-10: Portfolio Ready (Always shown)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'More detailed explanation of the artwork.',
    }),
    defineField({
      name: 'artistNote',
      title: 'Artist Note (The Regret/Thought)',
      type: 'text',
      description: 'Handwritten style note for Raw Mode. E.g. "I hate the shading here."',
      hidden: () => {
        // Optional logic to hide if level > 5, but maybe we want notes on good art too?
        // User said: "A 'Post-it' note element is attached... with the artist's regret"
        return false
      }
    }),
    defineField({
      name: 'mood',
      title: 'Mood / Emotion',
      type: 'string',
      options: {
        list: [
          {title: 'Angry', value: 'angry'},
          {title: 'Melancholic', value: 'melancholic'},
          {title: 'Euphoric', value: 'euphoric'},
          {title: 'Calm', value: 'calm'},
          {title: 'Anxious', value: 'anxious'},
        ],
      }
    }),
    defineField({
      name: 'progress',
      title: 'Process Timeline',
      type: 'array',
      of: [{type: 'image'}],
      description: 'WIP images: Sketch -> Lineart -> Flat -> Render',
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      description: 'Hex code for the dynamic theme (e.g., #FFD700)',
    }),
    defineField({
      name: 'creativeDNA',
      title: 'Creative DNA Metrics',
      type: 'object',
      fields: [
        {name: 'medium', title: 'Medium Specificity (1-10)', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'complexity', title: 'Complexity (1-10)', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'emotion', title: 'Emotional Intensity (1-10)', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'abstraction', title: 'Abstraction (1-10)', type: 'number', validation: Rule => Rule.min(1).max(10)},
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      level: 'vulnerabilityLevel',
      media: 'mainImage',
    },
    prepare(selection) {
      const {level} = selection
      return {
        ...selection,
        subtitle: `Level: ${level} - ${level <= 5 ? 'Raw/Failed' : 'Polished'}`,
      }
    }
  }
})
