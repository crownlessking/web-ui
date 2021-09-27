import React from 'react'
import {
  alpha, Theme, makeStyles, createStyles, Menu, IconButton, AppBar, Toolbar,
  InputBase
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import MoreIcon from '@material-ui/icons/MoreVert'
import classNames from 'classnames'
import StatePage from '../../state/pages/page.controller'
import { openDrawer } from '../drawer/actions'
import { updateAppbarSearchField } from './searchfield/actions'
import { IState } from '../../interfaces'
import { connect } from 'react-redux'
import AppBarIcon from '../link'
import StateLink from '../link/controller'
import StatePageAppBar from '../../state/pages/appbar.c'

const useStyles = makeStyles((theme: Theme) => createStyles({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 12, // theme.spacing(1.5),
    marginRight: 36, // theme.spacing(3),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius * 7,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 300,
    width: `calc(100% - 300px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  logo: { // https://stackoverflow.com/questions/40450778/how-do-i-display-an-image-on-left-of-material-ui-appbar-but-retain-the-hamburg
    maxWidth: 160,
  },
  textLogoWrapper: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    flexGrow: 1
  },
  appBarPaddingRightAdjust: { width: '20px', height: '48px' }
}))

const mapStateToProps = (state: IState) => ({
  open: state.drawer.open,
  searchValues: state.appBarSearches
})

const mapDispatchToProps = {
  onOpenDrawer: openDrawer,
  updateSearchFieldValue: updateAppbarSearchField
}

interface IProps {
  open: boolean,
  searchValues: any,
  onOpenDrawer: () => void,
  updateSearchFieldValue: (route: string, text: string) => void,
  def: StatePage
}

/**
 * @see https://material-ui.com/components/app-bar/#app-bar-with-a-primary-search-field
 * @see https://stackoverflow.com/questions/40450778/how-do-i-display-an-image-on-left-of-material-ui-appbar-but-retain-the-hamburg
 */
const PrimarySearchAppBar = connect(mapStateToProps, mapDispatchToProps)

(function (props: IProps) {

  const classes = useStyles()
  const { open, onOpenDrawer, updateSearchFieldValue, def: page } = props
  const app = page.parent.parent.app
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const mobileMenuId = 'primary-search-account-menu-mobile'

  /**
   * Render mobile menu
   *
   * @todo Modify the `link.tsx` file by adding a new attribute that causes
   *       link-button description to show
   */
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {page.appBar.items.map((item, index) => (
        <AppBarIcon key={index+1} def={item} />
      ))}
    </Menu>
  )

  /**
   * Open drawer (left pane).
   */
  const onOpenDrawerWithCheck = () => {
    if (!page.hideDrawer) onOpenDrawer()
  }

  const searchFieldOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => updateSearchFieldValue(page.parent.parent.app.route, e.target.value)

  return (
    <>
      <AppBar
        position='fixed'
        elevation={0}
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{
          background: page.appBar.background.value,
          color: page.appBar.typography.color,
          fontFamily: page.appBar.typography.fontFamily
        }}
      >
        <Toolbar variant='dense' disableGutters={!open}>
          {
            !page.hideDrawer
            ? (
              <IconButton
                className={classNames(classes.menuButton, {
                  [classes.hide]: open,
                })}
                color='inherit'
                aria-label='Open drawer'
                onClick={onOpenDrawerWithCheck}
              >
                <MenuIcon />
              </IconButton>
            )
            : ( null )
          }
          {
            app.logo
            ? (<img src={app.logo} className={classes.logo} alt='' />)
            : (
                <div className={classes.textLogoWrapper}>
                  <AppBarIcon
                    def={new StateLink<StatePageAppBar>({
                      type: 'textlogo',
                      href: '/',
                      has: {text: app.title},
                    }, page.appBar)}
                  />
                </div>
              )
          }
          {
            page.appBar.hasSearchField
            ? (
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    value={props.searchValues[page.parent.parent.app.route]}
                    onChange={searchFieldOnChange}
                  />
                </div>
              )
            : ( null )
          }
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {
              page.appBar.items.map((item, index) => (
                <AppBarIcon key={index+1} def={item} />
              ))
            }
          </div>
          <div className={classes.appBarPaddingRightAdjust} />
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      { renderMobileMenu }
    </>
  )

})

export default PrimarySearchAppBar
