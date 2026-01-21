import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

const TITLE = 'Sobre Mí'

export const sobreMiType = defineType({
  name: 'sobreMi',
  title: TITLE,
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      description: 'Título de la sección (ej: "Sobre Mí", "Mi Historia")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fotoPerfil',
      title: 'Foto de Perfil',
      type: 'image',
      description: '📸 Tu foto personal',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'biografia',
      title: 'Biografía / Historia',
      type: 'array',
      description: '✍️ Cuenta tu historia, cómo empezaste a tejer, tu inspiración...',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Título 2', value: 'h2'},
            {title: 'Título 3', value: 'h3'},
            {title: 'Cita', value: 'blockquote'},
          ],
          lists: [
            {title: 'Viñetas', value: 'bullet'},
            {title: 'Numerada', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Negrita', value: 'strong'},
              {title: 'Cursiva', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Enlace externo',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'enlacesSociales',
      title: 'Enlaces Sociales',
      type: 'object',
      description: '🔗 Tus redes sociales',
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'object',
          fields: [
            {
              name: 'usuario',
              title: 'Usuario',
              type: 'string',
              description: 'Tu usuario de Instagram (ej: @suenosabrigados)',
              placeholder: '@suenosabrigados',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Enlace completo a tu perfil',
              placeholder: 'https://instagram.com/suenosabrigados',
            },
          ],
        }),
        defineField({
          name: 'whatsapp',
          title: 'WhatsApp',
          type: 'object',
          fields: [
            {
              name: 'numero',
              title: 'Número',
              type: 'string',
              description: 'Número con código de país (ej: +56912345678)',
              placeholder: '+56912345678',
            },
            {
              name: 'mensaje',
              title: 'Mensaje Predeterminado',
              type: 'text',
              rows: 2,
              description: 'Mensaje que aparecerá al abrir WhatsApp',
              placeholder: 'Hola! Me interesan tus productos tejidos...',
            },
          ],
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          description: '📧 Tu email de contacto',
          validation: (Rule) => Rule.email(),
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
          description: 'Enlace a tu página de Facebook (opcional)',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Metadatos para motores de búsqueda',
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      media: 'fotoPerfil',
    },
    prepare({title, media}) {
      return {
        title: title || TITLE,
        subtitle: 'Página Sobre Mí',
        media: media || UserIcon,
      }
    },
  },
})
