import { styled } from '@mui/material'
import StatePage from '../../controllers/StatePage'

const Wrapper = styled('div')(() => ({
  width: '100%'
}))

interface IHtmlContent {
  def: StatePage
}

export default function HtmlContent ({ def: page }: IHtmlContent) {
  const domElement = document.getElementById(page.contentName)

  if (domElement) {
    return (
      <Wrapper
        dangerouslySetInnerHTML={{__html: domElement.innerHTML}}
        style={{
          fontFamily: page.typography.fontFamily,
          color: page.typography.color
        }}
      />
    )
  }

  return ( null )
}
