import { Fragment } from 'react'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'
import StateData from 'src/controllers/StateData'
import { RootState } from 'src/state'
import { gen_video_url, get_platform_icon_src, shorten_text } from '../../_tuber.common.logic'
import { IBookmark, ITuberBookmarksProps } from '../../tuber.interfaces'
import LoadMoreBookmarksFromServer, {
  LoadEarlierBookmarksFromServer
} from './tuber.bookmark.list.load.more'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import BookmarkActionsToolbar from './tuber.bookmark.list.actions'
import { SHORTENED_NOTE_MAX_LENGTH } from '../../tuber.config'

const StyledList = styled(List)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
}))

const StyledListItem = styled(ListItem)(() => ({
  float: 'left'
}))

const NoteGrid = styled(Grid)(() => ({
  display: 'flex'
}))

const NoteWrapper = styled('div')(() => ({
  position: 'relative',
  flex: 1
}))

const Note = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(3),
  // maxWidth: theme.spacing(50),
}))

const TitleWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start'
}))

const Title = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  fontSize: '1.13rem',
  color: theme.palette.primary.main,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}))

const PlatformIcon = styled('img')(() => ({
  width: '1.5rem',
  height: '1.5rem',
  margin: '0.25rem 0.5rem 0 0'
}))

const ExpandNoteIconWrapper = styled('a')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  position: 'absolute',
  left: 0,
  top: 0,
  textDecoration: 'none',
  color: theme.palette.grey[500],
}))

const ExpandNoteIcon = styled(PlayArrowIcon)(({ theme }) => ({
  width: '1.5rem',
  height: '1.5rem',
}))

const expandNote: boolean[] = []

export default function TuberBookmarkSearchEngine (props: ITuberBookmarksProps) {
  const { setBookmarkToPlay, playerOpen, setPlayerOpen } = props
  const data = new StateData(
    useSelector((state: RootState) => state.data)
  )
  const bookmarks = data.configure({endpoint: 'bookmarks'})
    .collection()
    .get<IBookmark>()

  const handleOnClick = (
    bookmark: IBookmark,
    playerOpen?: boolean
  ) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (playerOpen) {
      setBookmarkToPlay(bookmark)
      setPlayerOpen(true)
    } else {
      // [TODO] Generate platform url.
      const url = bookmark.url || gen_video_url(bookmark)
      window.open(url, '_blank')?.focus()
    }
  }

  // const handleOnMouseOver = (e: React.MouseEvent) => {
  //   e.preventDefault()
  //   // Accesss dom element directly
  //   const element = e.currentTarget as HTMLLIElement
  //   const children = element.children.item(0) as HTMLDivElement
  //   const grandChild = children.children.item(2) as HTMLDivElement
  //   // Great solution found at: https://stackoverflow.com/a/19929157/1875859
  //   grandChild.style.opacity = '1'
  //   grandChild.style.transition = 'opacity .25s ease-in-out .0s'
  // }

  // const handleOnMouseLeave = (e: React.MouseEvent) => {
  //   e.preventDefault()
  //   // Accesss dom element directly
  //   const element = e.currentTarget as HTMLLIElement
  //   const children = element.children.item(0) as HTMLDivElement
  //   const grandChild = children.children.item(2) as HTMLDivElement
  //   grandChild.style.opacity = '0'
  // }

  const handleExpandDetailIconOnClick = (
    annotaion: IBookmark,
    i: number
  ) => (e: React.MouseEvent) => {
    e.preventDefault()
    const element = e.currentTarget as HTMLAnchorElement
    const icon = element.children.item(0) as HTMLOrSVGImageElement
    icon.style.transition = 'all 0.4s ease'
    expandNote[i] = !expandNote[i]
    icon.style.transform = expandNote[i]
      ? 'rotateZ(90deg)'
      : 'rotateZ(0deg)'
    const detail = element.parentElement?.children.item(1) as HTMLDivElement
    while (detail.firstChild) {
      detail.removeChild(detail.firstChild)
    }
    if (expandNote[i]) {
      // Insert the full note into the detail div using text node
      detail.appendChild(document.createTextNode(annotaion.note ?? '(No note)'))
    } else {
      // Insert the shortened note into the detail div using text node
      detail.appendChild(document.createTextNode(shorten_text(annotaion.note)))
    }
  }

  return (
    <Container maxWidth='lg'>
      <LoadEarlierBookmarksFromServer def={data} />
      <StyledList>
        {bookmarks.map((bookmark, i) => (
          <StyledListItem key={`bookmark[${i}]`} disablePadding>
            <Stack sx={{ position: 'relative' }}>
              <Grid container direction='row'>
                <TitleWrapper>
                  <PlatformIcon src={get_platform_icon_src(bookmark.platform)} />
                  <Title href='#' onClick={handleOnClick(bookmark, playerOpen)}>
                    <ListItemText primary={bookmark.title} />
                  </Title>
                </TitleWrapper>
              </Grid>
              { bookmark.note ? (
                <Fragment>
                  <NoteGrid container direction='row'>
                    <NoteWrapper>
                      {bookmark.note.length > SHORTENED_NOTE_MAX_LENGTH ? (
                        <ExpandNoteIconWrapper
                          href='#'
                          onClick={handleExpandDetailIconOnClick(bookmark, i)}
                        >
                          <ExpandNoteIcon aria-label='expand row' />
                        </ExpandNoteIconWrapper>
                      ) : ( null )}
                      <Note>{ shorten_text(bookmark.note) }</Note>
                    </NoteWrapper>
                  </NoteGrid>
                  <BookmarkActionsToolbar i={i} bookmark={bookmark} />
                </Fragment>
              ) : (
                <BookmarkActionsToolbar i={i} bookmark={bookmark} />
              )}
            </Stack>
          </StyledListItem>
        ))}
      </StyledList>
      <LoadMoreBookmarksFromServer def={data} />
    </Container>
  )
}
