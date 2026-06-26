import { Rule } from '@sanity/types';

export const schemaTypes = [
  {
    name: 'page',
    title: 'Página',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Título',
        type: 'string',
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: 'slug',
        title: 'URL',
        type: 'slug',
        options: { source: 'title' },
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: 'content',
        title: 'Conteúdo',
        type: 'array',
        of: [{ type: 'block' }],
      },
      {
        name: 'heroImage',
        title: 'Imagem Principal',
        type: 'image',
        options: { hotspot: true },
        fields: [
          {
            name: 'alt',
            title: 'Texto Alternativo',
            type: 'string',
          },
        ],
      },
      {
        name: 'seo',
        title: 'SEO',
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Título SEO',
            type: 'string',
          },
          {
            name: 'description',
            title: 'Descrição SEO',
            type: 'text',
          },
        ],
      },
    ],
    preview: {
      select: {
        title: 'title',
        media: 'heroImage',
      },
    },
  },
];