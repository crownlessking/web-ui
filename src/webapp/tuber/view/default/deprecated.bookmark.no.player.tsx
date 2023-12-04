import { Fragment } from 'react'
import { styled } from '@mui/material/styles'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ListItem from '@mui/material/ListItem'
import Grid from '@mui/material/Grid'
import { get_platform_icon_src, shorten_text } from '../../_tuber.common.logic'
import { IBookmark } from '../../tuber.interfaces'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import BookmarkActionsToolbar from './list.actions'
import { SHORTENED_NOTE_MAX_LENGTH } from '../../tuber.config'

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

/** @deprecated */
export default function BookmarkNoPlayer (props: IBookmarkProps) {
  const { children: bookmark, index: i, playerOpen } = props
  return (
    <StyledListItem key={`bookmark[${i}]`} disablePadding>
      <Stack sx={{ position: 'relative' }}>
        <Grid container direction='row'>
          <TitleWrapper>
            <PlatformIcon src={get_platform_icon_src(bookmark.platform)} />
            <Title href='#' onClick={props.handleOnClick(bookmark, playerOpen)}>
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
      </Stack>
    </StyledListItem>
  )
}