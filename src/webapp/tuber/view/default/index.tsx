import '../tuber.css'
import { Fragment, useState, useLayoutEffect } from 'react'
import StatePage from '../../../../controllers/StatePage'
import { IAnnotation, IResearchToolbarProps } from '../../tuber.interfaces'
import TuberAnnotationList from './tuber.annotation.list'
import TuberPlayer from './tuber.player'
import tuber_register_callbacks from '../../callbacks/tuber.callbacks'
import { styled, useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import ResearchToolbar from '../tuber.toolbar.video'
import TuberAnnotationSearchEngine from './tuber.annotation.search.engine'
import { dialog_new_youtube_annotation_from_video } from '../../callbacks/prod.annotations.youtube'
import { useMediaQuery } from '@mui/material'

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
  const [ annotationToPlay, setAnnotationToPlay ] = useState<IAnnotation>()
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
    /** Creates a new annotation @deprecated */
    annotationAddCallback: dialog_new_youtube_annotation_from_video,
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
            <TuberAnnotationList
              playerOpen={playerOpen}
              setPlayerOpen={setPlayerOpen}
              setAnnotationToPlay={setAnnotationToPlay}
            />
            <TuberPlayerWrapper>
              <TuberPlayer
                isOpen={playerOpen}
                annotation={annotationToPlay}
                toolbarProps={toolbarProps}
              />
            </TuberPlayerWrapper>
          </Grid>
        ) : (
          <Grid container direction='row'>
            <TuberAnnotationSearchEngine
              playerOpen={playerOpen}
              setPlayerOpen={setPlayerOpen}
              setAnnotationToPlay={setAnnotationToPlay}
            />
            <ResearchToolbar {...toolbarProps} />
          </Grid>
        )}
    </Fragment>
  )
}
