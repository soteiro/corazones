import {UserIcon} from '@sanity/icons'
import type {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Sobre Mí')
    .icon(UserIcon)
    .child(
      S.editor()
        .id('sobreMi')
        .schemaType('sobreMi')
        .documentId('sobreMi')
        .title('Sobre Mí')
    )
)
