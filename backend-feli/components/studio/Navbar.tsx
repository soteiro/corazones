import type {NavbarProps} from 'sanity'
import {HeartYarnIcon} from '../icons/HeartYarn'
import {Flex, Text} from '@sanity/ui'

export default function Navbar(props: NavbarProps) {
  return (
    <Flex align="center" gap={2} paddingLeft={3}>
      <Text size={2} style={{color: '#d4896b', fontSize: '1.5rem'}}>
        <HeartYarnIcon />
      </Text>
      {props.renderDefault(props)}
    </Flex>
  )
}
