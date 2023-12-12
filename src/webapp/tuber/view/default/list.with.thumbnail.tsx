import List from '@mui/material/List'
import { styled } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { RootState } from 'src/state'
import { gen_video_url } from '../../_tuber.common.logic'
import LoadMoreBookmarksFromServer, {
  LoadEarlierBookmarksFromServer
} from './list.load.more'
import { IBookmark, ITTBList } from '../../tuber.interfaces'
import StateData from 'src/controllers/StateData'
import BookmarkWithThumbnail from './bookmark.with.thumbnail'

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
          <BookmarkWithThumbnail
            handleOnClick={handleOnClick}
            index={i}
            key={bookmark.id ?? `bookmark-${i}`}
          >
            { bookmark }
          </BookmarkWithThumbnail>
        ))}
      </StyledList>
      <LoadMoreBookmarksFromServer def={data} />
    </BookmarkListWrapper>
  )
}
