import Grid from '@mui/material/Grid'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import { IBookmark } from '../../tuber.interfaces'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { get_platform_icon_src, shorten_text } from '../../_tuber.common.logic'
import { FC, Fragment, useEffect, useState } from 'react'
import { SHORTENED_NOTE_MAX_LENGTH } from '../../tuber.config'
import BookmarkActionsToolbar from './list.actions'
import Thumbnail from './thumbnail'

interface IBookmarkProps {
  children: IBookmark
  handleOnClick: (
    bookmark: IBookmark,
    playerOpen?: boolean
  ) => (e: React.MouseEvent) => void
  handleExpandDetailIconOnClick: (annotation:IBookmark, i:number)
    => (e: React.MouseEvent)
    => void
  index: number
  playerOpen?: boolean
}

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

const ExpandNoteIcon = styled(PlayArrowIcon)(() => ({
  width: '1.5rem',
  height: '1.5rem',
}))

export default function BookmarkNoPlayer (props: IBookmarkProps) {
  const { children: bookmark, index: i, playerOpen } = props

  // lazy render
  const [ loaded, setLoaded ] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
    })
    return () => clearTimeout(timer)
  })

  const BookmarkCard: FC = () => (
    <StyledListItem key={`bookmark[${i}]`} disablePadding>
      <Thumbnail i={i} bookmark={bookmark} />
      <StackGrid container direction='column'>
        <Grid container direction='row'>
          <TitleWrapper>
            <PlatformIcon src={get_platform_icon_src(bookmark.platform)} />
            <Title href='#' onClick={props.handleOnClick(bookmark, playerOpen)}>
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
                    onClick={props.handleExpandDetailIconOnClick(bookmark, i)}
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
  )

  // lazy render
  return loaded ? <BookmarkCard /> : null
}