import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { FC } from 'react'
import StateLink from 'src/controllers/StateLink'
import StateJsxLink from 'src/mui/link'
import { dev_fix_missing_thumbnails } from '../../callbacks/dev.get.video.thumbnail'
import { IBookmark } from '../../tuber.interfaces'

interface IThumbnailProps {
  i: number
  bookmark: IBookmark
}

const ThumbnailGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.grey[800],
  borderRadius: '0.5rem',
  overflow: 'hidden',
  border: '1px solid #e0e0e0',
  marginRight: theme.spacing(2),
  width: 148,
  height: 83,
  backgroundSize: 'cover',
}))

const BookmarkThumbnail: FC<IThumbnailProps> = ({ i, bookmark }) => {
  return (
    <ThumbnailGrid
      sx={{ 
        backgroundImage: `url('${bookmark.thumbnail_url}')`
      }}
    >
      {!bookmark.thumbnail_url ? (
        <StateJsxLink def={new StateLink({
          'type': 'icon',
          'onClick': dev_fix_missing_thumbnails(i),
          'props': {
            'size': 'small',
            'sx': { 'color': 'grey.500' }
          },
          'has': { 'icon': 'build_outline' },
        })} />
      ) : ( null )}
    </ThumbnailGrid>
  )
}

export default BookmarkThumbnail