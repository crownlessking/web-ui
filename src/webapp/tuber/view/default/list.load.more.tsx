
import { Button, CircularProgress, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import JsonapiPaginationLinks from 'src/controllers/JsonapiPaginationLinks'
import StateData from 'src/controllers/StateData'
import StateDataPagesRange from 'src/controllers/StateDataPagesRange'
import { AppDispatch, RootState } from 'src/state'
import { get_req_state } from 'src/state/net.actions'
import { APP_IS_FETCHING_BOOKMARKS } from '../../tuber.config'
import { appSetFetchMessage } from 'src/slices/app.slice'
import { FC, useEffect, useState } from 'react'

interface ILoadMoreTextProps {
  def: StateData
  text?: string
  loadingText?: string
}

const Loading = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1),
  fontSize: '1rem',
  fontWeight: 600,
  color: theme.palette.grey[500],
}))

const LoadingText = styled('div')(({ theme }) => ({
  paddingLeft: theme.spacing(1),
}))

function LoadingProgess ({ text }: { text: string}) {
  return (
    <Loading>
      <CircularProgress
        color='secondary'
        size={20}
        thickness={5}
      />
      <LoadingText>{ text }</LoadingText>
    </Loading>
  )
}

/** Fixes a bug where the component would be in the wrong state */
let loadEarlier = false
/** Fixes a bug where the component would be in the wrong state */
let loadMore = false

/**
 * Load more bookmarks from the server
 */
export default function LoadMoreBookmarksFromServer ({
  def,
  text,
  loadingText
}: ILoadMoreTextProps) {
  const dispatch = useDispatch<AppDispatch>()
  const appStatus = useSelector((state: RootState) => state.app.status)
  const pageManager = new StateDataPagesRange(
    useSelector((state: RootState) => state.dataPagesRange)
  )
  const links = new JsonapiPaginationLinks(
    useSelector((state: RootState) => state.topLevelLinks.bookmarks)
  )
  const [ loaded, setLoaded ] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
    })
    return () => clearTimeout(timer)
  })

  const Component: FC = () => {
    pageManager.configure({ endpoint: 'bookmarks' })
    const nextPage = pageManager.lastPage + 1
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.disabled = true
      loadMore = true
      dispatch(appSetFetchMessage(APP_IS_FETCHING_BOOKMARKS))
      dispatch(get_req_state(
        'bookmarks',
        links.getLinkUrl({ pageNumber: nextPage })
      ))
    }
  
    if (appStatus !== APP_IS_FETCHING_BOOKMARKS
      && nextPage <= links.lastPageNumber
    ) {
      loadMore = false
      return (
        <Button
          onClick={handleOnClick}
          size='small'
          fullWidth
          color='inherit'
        >
          { text || 'Load More' }
        </Button>
      )
  
    // If clicked to load more, show the loading progress
    } else if (appStatus === APP_IS_FETCHING_BOOKMARKS && loadMore) {
      return <LoadingProgess text={loadingText || 'Loading...'} />
    
    // If there are no bookmarks, and we are fetching, show the loading
    // progress. This is triggered by the search field.
    } if (appStatus === APP_IS_FETCHING_BOOKMARKS
      && !def.state?.bookmarks?.length
    ) {
      loadMore = false
      return <LoadingProgess text={loadingText || 'Loading...'} />
    } else {
      loadMore = false
      return ( null )
    }
  }
  return loaded ? <Component /> : null
}

/**
 * Load earlier bookmarks from the server
 */
export function LoadEarlierBookmarksFromServer ({
  text,
  loadingText
}: ILoadMoreTextProps) {
  const dispatch = useDispatch<AppDispatch>()
  const appStatus = useSelector((state: RootState) => state.app.status)
  const pageManager = new StateDataPagesRange(
    useSelector((state: RootState) => state.dataPagesRange)
  )
  const links = new JsonapiPaginationLinks(
    useSelector((state: RootState) => state.topLevelLinks.bookmarks)
  )
  const [ loaded, setLoaded ] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
    })
    return () => clearTimeout(timer)
  })

  const Component: FC = () => {
    pageManager.configure({ endpoint: 'bookmarks' })
    const prevPage = pageManager.firstPage - 1
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.disabled = true
      loadEarlier = true
      dispatch(appSetFetchMessage(APP_IS_FETCHING_BOOKMARKS))
      dispatch(get_req_state(
        'bookmarks',
        links.getLinkUrl({ pageNumber: prevPage })
      ))
    }
  
    if (loadEarlier && appStatus === APP_IS_FETCHING_BOOKMARKS) {
      return <LoadingProgess text={loadingText || 'Loading...'} />
    } else if (appStatus !== APP_IS_FETCHING_BOOKMARKS
      && pageManager.firstPage > 1
    ) {
      loadEarlier = false
      return (
        <Button
          onClick={handleOnClick}
          size='small'
          fullWidth
          color='inherit'
        >
          { text || 'Load Earlier' }
        </Button>
      )
    } else {
      loadEarlier = false
      return ( null )
    }
  }

  return loaded ? <Component /> : null
}
