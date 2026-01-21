import {TagIcon} from '@sanity/icons'
import type {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Categorías')
    .icon(TagIcon)
    .schemaType('categoria')
    .child(S.documentTypeList('categoria').title('Categorías').defaultOrdering([{field: 'orden', direction: 'asc'}, {field: 'titulo', direction: 'asc'}]))
)
