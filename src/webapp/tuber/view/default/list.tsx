import List from '@mui/material/List'
import { styled } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { RootState } from 'src/state'
import { gen_video_url, shorten_text } from '../../_tuber.common.logic'
import LoadMoreBookmarksFromServer, {
  LoadEarlierBookmarksFromServer
} from './list.load.more'
import { IBookmark, ITBList } from '../../tuber.interfaces'
import StateData from 'src/controllers/StateData'
import Bookmark from './bookmark'

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

const expandNote: boolean[] = []

export default function TuberBookmarkList(props: ITBList) {
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
    <BookmarkListWrapper>
      <LoadEarlierBookmarksFromServer def={data} />
      <StyledList>
        {bookmarks.map((bookmark, i) => (
          <Bookmark
            handleOnClick={handleOnClick}
            handleExpandDetailIconOnClick={handleExpandDetailIconOnClick}
            index={i}
          >
            { bookmark }
          </Bookmark>
        ))}
      </StyledList>
      <LoadMoreBookmarksFromServer def={data} />
    </BookmarkListWrapper>
  )
}
