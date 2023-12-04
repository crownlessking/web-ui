import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import { useSelector } from 'react-redux'
import StateData from 'src/controllers/StateData'
import { RootState } from 'src/state'
import { gen_video_url, shorten_text } from '../../_tuber.common.logic'
import { IBookmark, ITTBList } from '../../tuber.interfaces'
import LoadMoreBookmarksFromServer, {
  LoadEarlierBookmarksFromServer
} from './list.load.more'
import Bookmark from './bookmark.no.player'

const StyledList = styled(List)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
}))

const expandNote: boolean[] = []

export default function TuberBookmarkSearchWithThumbnails (props: ITTBList) {
  const { setBookmarkToPlay, playerOpen, setPlayerOpen } = props.props
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
          <Bookmark
            key={`lazy.bookmark.${i}`}
            handleOnClick={handleOnClick}
            handleExpandDetailIconOnClick={handleExpandDetailIconOnClick}
            index={i}
            playerOpen={playerOpen}
          >
            { bookmark }
          </Bookmark>
        ))}
      </StyledList>
      <LoadMoreBookmarksFromServer def={data} />
    </Container>
  )
}
