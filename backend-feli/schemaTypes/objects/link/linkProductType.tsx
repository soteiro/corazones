import {TagIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export const linkProductType = defineField({
  title: 'Product',
  name: 'linkProduct',
  type: 'object',
  icon: TagIcon,
  components: {
    annotation: (props) => (
      <span>
        <TagIcon
          style={{
            marginLeft: '0.05em',
            marginRight: '0.1em',
            width: '0.75em',
          }}
        />
        {props.renderDefault(props)}
      </span>
    ),
  },
  fields: [
    defineField({
      name: 'product',
      title: 'Producto',
      type: 'reference',
      to: [{type: 'producto'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      productName: 'product.nombre',
    },
    prepare({productName}) {
      return {
        title: productName || 'Producto',
      }
    },
  },
})
