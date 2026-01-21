import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

const TITLE = 'Configuración'

export const configuracionType = defineType({
  name: 'configuracion',
  title: TITLE,
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'general',
      title: 'General',
      default: true,
    },
    {
      name: 'contacto',
      title: 'Contacto',
    },
    {
      name: 'branding',
      title: 'Marca',
    },
  ],
  fields: [
    defineField({
      name: 'nombreSitio',
      title: 'Nombre del Sitio',
      type: 'string',
      description: 'Nombre de tu marca o emprendimiento',
      initialValue: 'Sueños Abrigados',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      description: 'Descripción breve de tu emprendimiento',
      group: 'general',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: '🎨 Logo de tu marca',
      options: {
        hotspot: true,
      },
      group: 'branding',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Ícono pequeño que aparece en la pestaña del navegador',
      options: {
        accept: 'image/png, image/x-icon, image/svg+xml',
      },
      group: 'branding',
    }),
    defineField({
      name: 'coloresMarca',
      title: 'Colores de Marca',
      type: 'object',
      description: '🎨 Colores principales de tu marca',
      group: 'branding',
      fields: [
        {
          name: 'primario',
          title: 'Color Primario',
          type: 'color',
        },
        {
          name: 'secundario',
          title: 'Color Secundario',
          type: 'color',
        },
        {
          name: 'acento',
          title: 'Color de Acento',
          type: 'color',
        },
      ],
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'object',
      group: 'contacto',
      fields: [
        {
          name: 'numero',
          title: 'Número',
          type: 'string',
          description: '📱 Número con código de país (ej: +56912345678)',
          placeholder: '+56912345678',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'mensajePredeterminado',
          title: 'Mensaje Predeterminado',
          type: 'text',
          rows: 2,
          description: 'Mensaje que aparecerá al abrir WhatsApp',
          initialValue: '¡Hola! Me interesan tus productos tejidos',
        },
      ],
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'object',
      group: 'contacto',
      fields: [
        {
          name: 'usuario',
          title: 'Usuario',
          type: 'string',
          description: '@usuario de Instagram',
          placeholder: '@suenosabrigados',
          validation: (Rule) => 
            Rule.custom((value: string | undefined) => {
              if (value && !value.startsWith('@')) {
                return 'El usuario debe comenzar con @'
              }
              return true
            }),
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
          description: 'Enlace completo al perfil',
          placeholder: 'https://instagram.com/suenosabrigados',
        },
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email de Contacto',
      type: 'string',
      description: '📧 Email principal de contacto',
      validation: (Rule) => Rule.email(),
      group: 'contacto',
    }),
    defineField({
      name: 'telefono',
      title: 'Teléfono',
      type: 'string',
      description: '☎️ Teléfono de contacto (opcional)',
      group: 'contacto',
    }),
    defineField({
      name: 'direccion',
      title: 'Dirección',
      type: 'text',
      rows: 2,
      description: 'Dirección física (si aplica)',
      group: 'contacto',
    }),
    defineField({
      name: 'horarioAtencion',
      title: 'Horario de Atención',
      type: 'text',
      rows: 2,
      description: 'Horarios en que respondes mensajes/pedidos',
      placeholder: 'Lunes a Viernes: 9:00 - 18:00\nSábados: 10:00 - 14:00',
      group: 'contacto',
    }),
  ],
  preview: {
    select: {
      title: 'nombreSitio',
      media: 'logo',
    },
    prepare({title, media}) {
      return {
        title: title || TITLE,
        subtitle: 'Configuración General',
        media: media || CogIcon,
      }
    },
  },
})
