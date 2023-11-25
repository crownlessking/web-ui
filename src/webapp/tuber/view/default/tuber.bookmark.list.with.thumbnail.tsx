import { Fragment } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { RootState } from 'src/state'
import { gen_video_url, get_platform_icon_src, shorten_text } from '../../_tuber.common.logic'
import LoadMoreBookmarksFromServer, {
  LoadEarlierBookmarksFromServer
} from './tuber.bookmark.list.load.more'
import { IBookmark, ITTBList } from '../../tuber.interfaces'
import BookmarkActionsToolbar from './tuber.bookmark.list.actions'
import StateData from 'src/controllers/StateData'
import Thumbnail from './tuber.bookmark.thumbnail'

const BookmarkListWrapper = styled('div')(({ theme }) => ({
  height: 'calc(100vh - 64px)',
  overflowY: 'auto',
  [theme.breakpoints.up('md')]: {
    width: 500,
  },
  width: '100%',
}))

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
  justifyContent: 'flex-start',
  position: 'relative',
}))

const ClickTitle = styled('a')(() => ({
  textDecoration: 'none',
  fontSize: '1.13rem',
  color: '#1b74e4',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}))

const ClickThumbnail = styled('a')(() => ({
  textDecoration: 'none',
  transition: 'all 0.2s ease-in-out',
}))

const PlatformIcon = styled('img')(() => ({
  width: '1.5rem',
  height: '1.5rem',
  margin: '0.25rem 0.5rem 0 0',
  // position: 'absolute',
  // top: 0,
}))

export default function TuberThumbnailedBookmarkList(props: ITTBList) {
  const { setBookmarkToPlay, playerOpen, setPlayerOpen } = props.props
  const data = new StateData(
    useSelector((state: RootState) => state.data)
  )
  const bookmarks = data.configure({endpoint: 'bookmarks'})
    .collection()
    .get<IBookmark>()

  const handleOnClick = (bookmark: IBookmark) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (playerOpen) {
      setBookmarkToPlay(bookmark)
      setPlayerOpen(true)
    } else {
      const url = bookmark.url || gen_video_url(bookmark)
      window.open(url, '_blank')?.focus()
    }
  }

  return (
    <BookmarkListWrapper>
      <LoadEarlierBookmarksFromServer def={data} />
      <StyledList>
        {bookmarks.map((bookmark, i) => (
          <StyledListItem key={`bookmark[${i}]`} disablePadding>
            { bookmark.thumbnail_url ? ( // If bookmark has a thumbnail, it can be clicked.
              <ClickThumbnail
                href={`#${bookmark.videoid ?? bookmark.slug}`}
                onClick={handleOnClick(bookmark)}
              >
                <Thumbnail i={i} bookmark={bookmark} />
              </ClickThumbnail>
            ): ( // Otherwise, it is not clickable.
              <Thumbnail i={i} bookmark={bookmark} />
            )}
            <Stack sx={{ position: 'relative' }}>
              <Grid container direction='column'>
                <TitleWrapper>
                  <PlatformIcon src={get_platform_icon_src(bookmark.platform)} />
                  <ClickTitle href='#' onClick={handleOnClick(bookmark)}>
                    <ListItemText
                      primary={shorten_text(bookmark.title, false, 27)}
                    />
                  </ClickTitle>
                </TitleWrapper>
              </Grid>
              { bookmark.note ? (
                <Fragment>
                  <NoteGrid container direction='row'>
                    <NoteWrapper>
                      <Note>{ shorten_text(bookmark.note, false, 27) }</Note>
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
    </BookmarkListWrapper>
  )
}
