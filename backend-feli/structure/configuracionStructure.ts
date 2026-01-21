import {CogIcon} from '@sanity/icons'
import type {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Configuración')
    .icon(CogIcon)
    .child(
      S.editor()
        .id('configuracion')
        .schemaType('configuracion')
        .documentId('configuracion')
        .title('Configuración')
    )
)
