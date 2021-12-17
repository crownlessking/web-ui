import StateLink from '../../controllers/StateLink'

export default function JsonLinkText({ def: link }:{ def: StateLink}) {
  switch (link.type) {
  case 'icon':
    return ( <p>link.has.text</p> )
  case 'hybrid':
  case 'link':
  case 'text':
  case 'textlogo':
  default:
    return ( null )
  }
}
