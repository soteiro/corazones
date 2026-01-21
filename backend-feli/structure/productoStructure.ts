import {PackageIcon} from '@sanity/icons'
import type {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Productos')
    .icon(PackageIcon)
    .schemaType('producto')
    .child(
      S.documentTypeList('producto')
        .title('Productos')
        .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
        .filter('_type == "producto"')
    )
)
