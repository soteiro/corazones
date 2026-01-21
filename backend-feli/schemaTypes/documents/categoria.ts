import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const categoriaType = defineType({
  name: 'categoria',
  title: 'Categoría',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      description: 'Nombre de la categoría (ej: Bufandas, Gorros, Chalecos)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL amigable para la categoría',
      options: {
        source: 'titulo',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      description: 'Descripción breve de la categoría (opcional)',
      rows: 3,
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen Representativa',
      type: 'image',
      description: 'Imagen que representa esta categoría',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'orden',
      title: 'Orden',
      type: 'number',
      description: 'Orden de aparición (menor número aparece primero)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'descripcion',
      media: 'imagen',
    },
  },
})
