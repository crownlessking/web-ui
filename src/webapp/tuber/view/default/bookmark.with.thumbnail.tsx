
import Grid from '@mui/material/Grid'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { IBookmark } from '../../tuber.interfaces'
import { get_platform_icon_src, shorten_text } from '../../_tuber.common.logic'
import BookmarkActionsToolbar from './list.actions'
import Thumbnail from './thumbnail'

interface IBookmarkProps {
  children: IBookmark
  handleOnClick: (bookmark: IBookmark) => (e: React.MouseEvent) => void
  index: number
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
  justifyContent: 'flex-start',
  position: 'relative',
}))

const ClickTitle = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  fontSize: '1.13rem',
  color: theme.palette.primary.main,
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

export default function BookmarkWithThumbnail (props: IBookmarkProps) {
  const { children: bookmark, index: i } = props

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
      { bookmark.thumbnail_url ? ( // If bookmark has a thumbnail, it can be clicked.
        <ClickThumbnail
          href={`#${bookmark.videoid ?? bookmark.slug}`}
          onClick={props.handleOnClick(bookmark)}
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
            <ClickTitle href='#' onClick={props.handleOnClick(bookmark)}>
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
  )

  // lazy render
  return loaded ? <BookmarkCard /> : null
}