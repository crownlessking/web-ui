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
import BookmarkActionsToolbar from './tuber.bookmark.list.actions'
import { SHORTENED_NOTE_MAX_LENGTH } from '../../tuber.config'
import Thumbnail from './tuber.bookmark.thumbnail'

const StyledList = styled(List)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
}))

const StyledListItem = styled(ListItem)(({ theme: { spacing } }) => ({
  float: 'left',
  marginBottom: spacing(4),
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

// const Note = styled(Markdown)(({ theme }) => ({
//   marginLeft: theme.spacing(3),
//   // maxWidth: theme.spacing(50),
// }))

const StackGrid = styled(Grid)(() => ({
  position: 'relative',
}))

const TitleWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start'
}))

const Title = styled('a')(() => ({
  textDecoration: 'none',
  fontSize: '1.13rem',
  color: '#1b74e4',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}))

const TitleText = styled('span')(() => ({
  fontSize: 20,
  fontWeight: 400,
  wordBreak: 'break-word'
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

export default function TuberBookmarkSearchWithThumbnails (props: ITuberBookmarksProps) {
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

  const handleExpandDetailIconOnClick = (
    bookmark: IBookmark,
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
      // const note = bookmark.note?.replace(/\n/g, '<br />')
      const note = bookmark.note ? bookmark.note.replace('\n', '<br>') : '(No note)'
      detail.innerHTML = note
    } else {
      // Insert the shortened note into the detail div using text node
      detail.appendChild(document.createTextNode(shorten_text(bookmark.note)))
    }
  }

  return (
    <Container maxWidth='lg'>
      <LoadEarlierBookmarksFromServer def={data} />
      <StyledList>
        {bookmarks.map((bookmark, i) => (
          <StyledListItem key={`bookmark[${i}]`} disablePadding>
            <Thumbnail i={i} bookmark={bookmark} />
            <StackGrid container direction='column'>
              <Grid container direction='row'>
                <TitleWrapper>
                  <PlatformIcon src={get_platform_icon_src(bookmark.platform)} />
                  <Title href='#' onClick={handleOnClick(bookmark, playerOpen)}>
                    <TitleText>{ bookmark.title }</TitleText>
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
            </StackGrid>
          </StyledListItem>
        ))}
      </StyledList>
      <LoadMoreBookmarksFromServer def={data} />
    </Container>
  )
}
