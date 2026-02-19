import {ListItemBuilder, StructureResolver} from 'sanity/structure';
import categorias from './categoriaStructure'
import configuracion from './configuracionStructure'
import home from './homeStructure'
import pages from './pageStructure'
import productos from './productoStructure'
import settings from './settingStructure'
import sobreMi from './sobreMiStructure'

/**
 * Structure overrides
 *
 * Sanity Studio automatically lists document types out of the box.
 * With this custom structure we achieve things like showing the `home`
 * and `settings` document types as singletons.
 *
 * You can customize this even further as your schema types progress.
 * To learn more about structure builder, visit our docs:
 * https://www.sanity.io/docs/overview-structure-builder
 */

// If you add document types to structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return ![
    'categoria',
    'configuracion',
    'home',
    'media.tag',
    'page',
    'colorTheme',
    'producto',
    'settings',
    'sobreMi',
  ].includes(id)
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Contenido')
    .items([
      home(S, context),
      S.divider(),
      productos(S, context),
      categorias(S, context),
      S.divider(),
      pages(S, context),
      sobreMi(S, context),
      S.divider(),
      configuracion(S, context),
      settings(S, context),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
