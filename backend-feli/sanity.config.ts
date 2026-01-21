import {defineConfig, isDev} from 'sanity'

import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {imageHotspotArrayPlugin} from 'sanity-plugin-hotspot-array'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import {customDocumentActions} from './plugins/customDocumentActions'
import Navbar from './components/studio/Navbar'

const devOnlyPlugins = [visionTool()]

export default defineConfig({
  name: 'default',
  title: 'Sueños Abrigados',

  projectId: 'qsk5q0dj',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    colorInput(),
    imageHotspotArrayPlugin(),
    customDocumentActions(),
    media(),
    ...(isDev ? devOnlyPlugins : []),
  ],

  schema: {
    types: schemaTypes,
  },

  theme: {
    colors: {
      default: {
        base: {
          bg: '#fef9f5', // Beige cálido suave
          fg: '#2c1810', // Marrón oscuro para texto
          border: '#e8d4c4', // Beige más oscuro para bordes
          focusRing: '#d4896b', // Terracota suave para focus
          shadow: {
            outline: 'rgba(212, 137, 107, 0.5)',
            umbra: 'rgba(44, 24, 16, 0.2)',
            penumbra: 'rgba(44, 24, 16, 0.14)',
            ambient: 'rgba(44, 24, 16, 0.12)',
          },
        },
        // Color primario - Terracota/Rosa viejo
        primary: {
          enabled: {
            bg: '#d4896b',
            fg: '#ffffff',
            border: '#c07456',
          },
          hovered: {
            bg: '#c07456',
            fg: '#ffffff',
            border: '#a96348',
          },
          pressed: {
            bg: '#a96348',
            fg: '#ffffff',
            border: '#945539',
          },
          selected: {
            bg: '#d4896b',
            fg: '#ffffff',
            border: '#c07456',
          },
          disabled: {
            bg: '#e8d4c4',
            fg: '#9b8577',
            border: '#d4c2b4',
          },
        },
        // Color positivo - Verde suave natural
        positive: {
          enabled: {
            bg: '#8ba888',
            fg: '#ffffff',
            border: '#7a9677',
          },
          hovered: {
            bg: '#7a9677',
            fg: '#ffffff',
            border: '#6a8466',
          },
        },
        // Color de advertencia - Mostaza suave
        caution: {
          enabled: {
            bg: '#d4a76b',
            fg: '#ffffff',
            border: '#c09456',
          },
        },
        // Color crítico - Rosa oscuro
        critical: {
          enabled: {
            bg: '#c47a6b',
            fg: '#ffffff',
            border: '#b06856',
          },
        },
      },
    },
  },

  form: {
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
      },
    },
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource)
      },
    },
  },

  studio: {
    components: {
      navbar: Navbar,
    },
  },

  document: {
    // Configurar nombres más amigables para los documentos
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => !['settings', 'home', 'sobreMi', 'configuracion'].includes(templateItem.templateId)
        )
      }
      return prev
    },
  },
})