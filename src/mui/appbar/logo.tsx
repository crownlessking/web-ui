import { styled } from '@mui/material'
import StatePage from '../../controllers/StatePage'

/**
 * To define a logo, set the `appbar.logoTag` and `appbar.logoProps`.
 *
 * Now, the `appbar.logoTag` is optional. As in, it will default to an img tag.
 * Which means, the meat and potato is the `appbar.logoProps`. If it is not
 * defined, the logo will never show.
 *
 * To define it, if its an img tag, just give it the image src and any other
 * required attributes.
 *
 * Yes, `appbar.logoProps` is where you have to set the src of the image.
 *
 * You can also use a path tag. Just google how to create a path image and
 * set whatever attributes need to be set for the path tag in the
 * `appbar.logoProps` property.
 */
export default function Logo ({ def }: { def: StatePage }) {

  /**
   * @see https://codesandbox.io/s/7q80d?file=/src/MyAppBar.tsx
   */
  const ImgLogo = styled('img')(() => ({
    maxWidth: 40,
    marginRight: '10px'
  }))

  const PathLogo = styled('path')(() => ({}))
  const DivLogo = styled('div')(() => ({}))

  switch (def.appBar.logoTag) {
  case 'img':
    return <ImgLogo {...def.appBar.logoProps} />
  case 'path':
    return <PathLogo {...def.appBar.logoProps} />
  case 'div':
    return <DivLogo {...def.appBar.logoProps} />
  default:
    return ( null )
  }
}