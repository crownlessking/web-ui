import React from 'react'
import {
  Grid,
  createStyles,
  Theme,
  makeStyles,
} from '@material-ui/core'
import { CSSProperties } from '@material-ui/core/styles/withStyles'

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

/**
 * NON-SCROLLING CENTERED LAYOUT.
 *
 * The content of this layout cannot be scrolled, so make sure it is small
 * enough to fit the available viewport space. The content should automatically
 * resize.
 */
export const LayoutCenteredNoScroll = React.forwardRef(({ children }: any, ref) => {
  const classes = makeStyles(() => createStyles({
    container: {
      // fontWeight: 'bold',
      minHeight: '100vh'
    }
  }))()
  return (
    <Grid
      className={classes.container}
      container={true}
      spacing={0}
      alignItems='center'
      justify='center'
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
 */
const LayoutCenteredFactory = (mHeight?: number) => {
  return React.forwardRef(({ children }: any, ref) => {
    const classes = makeStyles(({ mixins, spacing }: Theme) => createStyles({
      toolbar: {
        ...defaultClasses.container,
    
        // info: https://stackoverflow.com/questions/52995225/how-does-one-use-or-get-started-with-theme-mixins-toolbar-in-material-ui
        minHeight: mHeight !== undefined
          ? mHeight
          : mixins.toolbar.minHeight // '29px', // ...theme.mixins.toolbar
      },
      content: {
        ...defaultClasses.content,

        padding: spacing(3),
      },

      // TODO put your styles here

    }))()

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid
          container
          spacing={0}
          alignItems='center'
          justify='center'
        >
          { children }
        </Grid>
      </main>
    )
  })
} // 

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
    const classes = makeStyles(({mixins, spacing}: Theme) => createStyles({
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        { children }
      </main>
    )
  })
}

export const DefaultLayout = LayoutDefaultFactory()
export const VirtualizedTableLayout = LayoutDefaultFactory(49) // 29
