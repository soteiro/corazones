import {HeartIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {seoType} from '../objects/seoType'

export const productoType = defineType({
  name: 'producto',
  title: 'Producto',
  type: 'document',
  icon: HeartIcon,
  groups: [
    {
      name: 'general',
      title: 'General',
      default: true,
    },
    {
      name: 'detalles',
      title: 'Detalles',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del Producto',
      type: 'string',
      description: '🧶 Nombre descriptivo del producto tejido',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL amigable para el producto',
      options: {
        source: 'nombre',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'imagenes',
      title: 'Galería de Fotos',
      type: 'array',
      description: '🖼️ Sube varias fotos del producto desde distintos ángulos',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo',
              description: 'Descripción de la imagen para accesibilidad',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
      validation: (Rule) => Rule.required().min(1).error('Debes subir al menos una foto'),
      group: 'general',
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      description: 'Descripción detallada del producto, materiales, tamaño, etc.',
      rows: 5,
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'reference',
      to: [{type: 'categoria'}],
      description: 'Selecciona la categoría del producto',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'precio',
      title: 'Precio',
      type: 'number',
      description: '💰 Precio en pesos chilenos (CLP)',
      validation: (Rule) => Rule.required().min(0).positive().error('El precio debe ser mayor a 0'),
      group: 'detalles',
    }),
    defineField({
      name: 'estado',
      title: 'Estado',
      type: 'string',
      description: 'Estado actual del producto',
      options: {
        list: [
          {title: '✅ Disponible', value: 'disponible'},
          {title: '❌ Vendido', value: 'vendido'},
          {title: '🧶 Hecho a Pedido', value: 'a-pedido'},
        ],
        layout: 'radio',
      },
      initialValue: 'disponible',
      validation: (Rule) => Rule.required(),
      group: 'detalles',
    }),
    defineField({
      name: 'etiquetas',
      title: 'Etiquetas',
      type: 'array',
      description: 'Palabras clave para el producto (ej: "hecho a mano", "lana", "regalo")',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      group: 'detalles',
    }),
    defineField({
      name: 'destacado',
      title: '⭐ Producto Destacado',
      type: 'boolean',
      description: 'Marcar para mostrar en la página principal',
      initialValue: false,
      group: 'detalles',
    }),
    defineField({
      name: 'materiales',
      title: 'Materiales',
      type: 'text',
      description: 'Tipo de lana, hilo o material utilizado',
      rows: 2,
      group: 'detalles',
    }),
    defineField({
      name: 'dimensiones',
      title: 'Dimensiones',
      type: 'string',
      description: 'Tamaño o medidas del producto (ej: "25cm x 30cm")',
      group: 'detalles',
    }),
    defineField({
      name: 'tiempoElaboracion',
      title: 'Tiempo de Elaboración',
      type: 'string',
      description: 'Tiempo estimado para hacer el producto (ej: "2-3 días")',
      group: 'detalles',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'nombre',
      estado: 'estado',
      precio: 'precio',
      media: 'imagenes.0',
      categoria: 'categoria.titulo',
    },
    prepare(selection) {
      const {title, estado, precio, media, categoria} = selection as {
        title: string
        estado: 'disponible' | 'vendido' | 'a-pedido'
        precio: number
        media: any
        categoria: string
      }
      
      const estadoEmoji = {
        'disponible': '✅',
        'vendido': '❌',
        'a-pedido': '🧶',
      }[estado] || ''

      const precioFormateado = precio 
        ? new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
          }).format(precio)
        : 'Sin precio'

      return {
        title: title,
        subtitle: `${estadoEmoji} ${precioFormateado} • ${categoria || 'Sin categoría'}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Nombre (A-Z)',
      name: 'nombreAsc',
      by: [{field: 'nombre', direction: 'asc'}],
    },
    {
      title: 'Nombre (Z-A)',
      name: 'nombreDesc',
      by: [{field: 'nombre', direction: 'desc'}],
    },
    {
      title: 'Precio (Mayor a Menor)',
      name: 'precioDesc',
      by: [{field: 'precio', direction: 'desc'}],
    },
    {
      title: 'Precio (Menor a Mayor)',
      name: 'precioAsc',
      by: [{field: 'precio', direction: 'asc'}],
    },
    {
      title: 'Más Recientes',
      name: 'createdDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
})
