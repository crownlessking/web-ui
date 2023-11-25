import '../tuber.css'
import { Fragment, useState, useLayoutEffect } from 'react'
import StatePage from '../../../../controllers/StatePage'
import { IBookmark, IResearchToolbarProps } from '../../tuber.interfaces'
import TuberBookmarkList from './tuber.bookmark.list'
import TuberPlayer from './tuber.player'
import tuber_register_callbacks from '../../callbacks/tuber.callbacks'
import { styled, useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import ResearchToolbarFixed from '../tuber.toolbar.video.search'
// import TuberBookmarkSearchEngine from './tuber.bookmark.search.engine'
import TuberBookmarkSearchWithThumbnails from './tuber.bookmark.search.with.thumbnails'
import { dialog_new_youtube_bookmark_from_video }
  from '../../callbacks/prod.bookmarks.youtube'
import { useMediaQuery } from '@mui/material'
import TuberThumbnailedBookmarkList from './tuber.bookmark.list.with.thumbnail'
import { useSelector } from 'react-redux'
import { RootState } from 'src/state'

tuber_register_callbacks()

const TuberPlayerWrapper = styled('div')(({ theme }) => ({
  flexGrow: 1,
  [theme.breakpoints.up('md')]: {
    paddingRight: theme.spacing(2),
  },
  height: 'calc(100vh - 128px)',
  top: 64,
  right: 0,
}))

export default function ViewDefault({ def: page }: { def: StatePage}) {
  const [ playerOpen, setPlayerOpen ] = useState<boolean>(false)
  const [ bookmarkToPlay, setBookmarkToPlay ] = useState<IBookmark>()
  const [ showThumbnail, setShowThumbnail ] = useState<boolean>(true)
  const themeMode = useSelector((state: RootState) => state.theme.palette?.mode)
  const theme = useTheme()
  const greaterThanMid = useMediaQuery(theme.breakpoints.up('md'))

  const toolbarProps: IResearchToolbarProps = {
    togglePlayerCallback: () => () => {
      if (greaterThanMid) {
        setPlayerOpen(!playerOpen)
      } else {
        setPlayerOpen(false)
      }
    },
    /** Creates a new bookmark @deprecated */
    bookmarkAddCallback: dialog_new_youtube_bookmark_from_video,
    toggleThumbnailsCallback: () => () => {
      setShowThumbnail(!showThumbnail)
    },
    // appbar definition
    def: page.appBar
  }

  // Closes the integrated player if window size too small.
  useLayoutEffect(() => {
    const updateLayout = () => {
      if (!greaterThanMid) {
        setPlayerOpen(false)
      }
    }
    window.addEventListener('resize', updateLayout)
    updateLayout()
    return () => window.removeEventListener('resize', updateLayout)
  })

  return (
    <Fragment>
      <Toolbar />
        {playerOpen ? (
          <Grid container direction='row'>
            {showThumbnail ? (
              <TuberThumbnailedBookmarkList
                props={{
                  playerOpen,
                  setPlayerOpen,
                  setBookmarkToPlay
                }}
              />
            ) : (
              <TuberBookmarkList
                props={{
                  playerOpen,
                  setPlayerOpen,
                  setBookmarkToPlay
                }}
              />
            )}
            <TuberPlayerWrapper>
              <TuberPlayer
                props={{
                  isOpen: playerOpen,
                  bookmark: bookmarkToPlay,
                  toolbarProps
                }}
              />
            </TuberPlayerWrapper>
          </Grid>
        ) : (
          <Fragment>
            <TuberBookmarkSearchWithThumbnails
              props={{
                playerOpen,
                setPlayerOpen,
                setBookmarkToPlay
              }}
            />
            <ResearchToolbarFixed {...toolbarProps} />
          </Fragment>
        )}
    </Fragment>
  )
}
