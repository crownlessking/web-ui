import React from 'react'
import { makeStyles, CSSProperties, useTheme } from '@mui/styles'
import { Box, Grid, Theme } from '@mui/material'

interface IMainProps {
  p?: string | number
  children: any
}

const defaultClasses: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
  },
  content: {
    flexGrow: 1
  }
}

const Main = ({ p, children }: IMainProps) => (
  <Box
    component='main'
    sx={{...defaultClasses.content, p}}
  >
    { children }
  </Box>
)

const Toolbar = ({ mHeight }: { mHeight?: string|number }) => {
  const { mixins } = useTheme<Theme>()
  const minHeight = (mHeight !== undefined)
    ? mHeight
    // info: https://stackoverflow.com/questions/52995225/how-does-one-use-or-get-started-with-theme-mixins-toolbar-in-material-ui
    : mixins.toolbar.minHeight
  return (
    <Box>
      sx={{
        ...defaultClasses.container,
        minHeight
      }}
    </Box>
  )
}

/**
 * NON-SCROLLING CENTERED LAYOUT.
 *
 * The content of this layout cannot be scrolled, so make sure it is small
 * enough to fit the available viewport space. The content should automatically
 * resize.
 */
export const LayoutCenteredNoScroll = React.forwardRef(({ children }: any, ref) => {
  return (
    <Grid
      sx={{
        minHeight: '100vh'
      }}
      container={true}
      spacing={0}
      alignItems='center'
      justifyContent='center'
    >
      { children }
    </Grid>
  )
})

/**
 * Centered layout factory.
 *
 * Creates a layout where the content will be centered.
 * Use the parameter to adjust the gap between the `appBar` and the content.
 * The greater the number, the greater the gap.
 *
 * @param mHeight height of content in pixels
 *
 * @see https://stackoverflow.com/a/56497384/1875859
 */
const LayoutCenteredFactory = (mHeight?: number) => {
  return React.forwardRef(({ children }: any, ref) => {
    const theme = useTheme<Theme>()

    return (
      <Main p={theme.spacing(3)}>
        <Toolbar mHeight={mHeight} />
        <Grid
          container
          spacing={0}
          alignItems='center'
          justifyContent='center'
        >
          { children }
        </Grid>
      </Main>
    )
  })
}

/**
 * LAYOUT CENTERED with the default `AppBar` space top margin.
 */
export const LayoutCentered = LayoutCenteredFactory(32)

/**
 * LAYOUT CENTERED with no top margin.
 */
export const LayoutCenteredDialog = LayoutCenteredFactory(0)

/**
 * Default layout factory
 *
 * @param mHeight 
 */
const LayoutDefaultFactory = (mHeight = 0) => {
  return React.forwardRef(({children}: any, ref) => {
    const { spacing } = useTheme<Theme>()
    const classes = makeStyles(({mixins, spacing}: Theme) => ({
      toolbar: {
        ...defaultClasses.container,
    
        // info: https://stackoverflow.com/questions/52995225/how-does-one-use-or-get-started-with-theme-mixins-toolbar-in-material-ui
        minHeight: mHeight || mixins.toolbar.minHeight // '29px', // ...theme.mixins.toolbar
      },
      content: {
        ...defaultClasses.content,

        padding: spacing(0, 2),
      },
    }))()
    return (
      <Main p={spacing(0, 2)}>
        <Toolbar mHeight={mHeight} />
        { children }
      </Main>
    )
  })
}

export const DefaultLayout = LayoutDefaultFactory()
export const VirtualizedTableLayout = LayoutDefaultFactory(49) // 29

/** Applies toolbar space at the top if the page has an appBar */
const LayoutNoneFactory = (mHeight = 0) => {
  return React.forwardRef(({children}: any, ref) => {
    return (
      <Box component='main' sx={{ w: '100%' }}>
        <Toolbar mHeight={mHeight} />
        { children }
      </Box>
    )
  })
}

/**
 * Applies toolbar space to prevent content from being hidden under the
 * appBar.
 */
export const DefaultLayoutToolbared = LayoutNoneFactory(40)
