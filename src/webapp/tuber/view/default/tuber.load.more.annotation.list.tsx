
import { CircularProgress, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import JsonapiPaginationLinks from 'src/controllers/JsonapiPaginationLinks'
import StateData from 'src/controllers/StateData'
import StateDataPagesRange from 'src/controllers/StateDataPagesRange'
import { APP_IS_FETCHING } from 'src/slices/app.slice'
import { AppDispatch, RootState } from 'src/state'
import { get_req_state } from 'src/state/net.actions'

interface ILoadMoreTextProps {
  def: StateData
  text?: string
  loadingText?: string
}

const LoadMoreText = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1),
  fontSize: '1rem',
  fontWeight: 600,
  color: theme.palette.grey[500],
  '&:hover': {
    cursor: 'pointer',
    color: theme.palette.grey[700],
  }
}))

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
 * Load more annotations from the server
 */
export default function LoadMoreAnnotationsFromServer ({
  def,
  text,
  loadingText
}: ILoadMoreTextProps) {
  const dispatch = useDispatch<AppDispatch>()
  const appStatus = useSelector((state: RootState) => state.app.status)
  const pageManager = new StateDataPagesRange(
    useSelector((state: RootState) => state.dataLoadedPages)
  )
  const links = new JsonapiPaginationLinks(
    useSelector((state: RootState) => state.topLevelLinks.annotations)
  )

  pageManager.configure({ endpoint: 'annotations' })
  const nextPage = pageManager.lastPage + 1
  const handleOnClick = () => {
    loadMore = true
    // dispatch({ type: 'app/appDisableSpinner' })
    dispatch(get_req_state(
      'annotations',
      links.getLinkUrl({ pageNumber: nextPage })
    ))
  }

  if (appStatus !== APP_IS_FETCHING && nextPage <= links.lastPageNumber) {
    loadMore = false
    return (
      <LoadMoreText onClick={handleOnClick}>
        { text || 'Load More' }
      </LoadMoreText>
    )

  // If clicked to load more, show the loading progress
  } else if (appStatus === APP_IS_FETCHING && loadMore) {
    return <LoadingProgess text={loadingText || 'Loading...'} />
  
  // If there are no annotations, and we are fetching, show the loading progress.
  // This is triggered by the search field.
  } if (appStatus === APP_IS_FETCHING && !def.state?.annotations?.length) {
    loadMore = false
    return <LoadingProgess text={loadingText || 'Loading...'} />
  } else {
    loadMore = false
    return ( null )
  }
}

/**
 * Load earlier annotations from the server
 */
export function LoadEarlierAnnotationsFromServer ({
  text,
  loadingText
}: ILoadMoreTextProps) {
  const dispatch = useDispatch<AppDispatch>()
  const appStatus = useSelector((state: RootState) => state.app.status)
  const pageManager = new StateDataPagesRange(
    useSelector((state: RootState) => state.dataLoadedPages)
  )
  const links = new JsonapiPaginationLinks(
    useSelector((state: RootState) => state.topLevelLinks.annotations)
  )

  pageManager.configure({ endpoint: 'annotations' })
  const prevPage = pageManager.firstPage - 1
  const handleOnClick = () => {
    loadEarlier = true
    // dispatch({ type: 'app/appDisableSpinner' })
    dispatch(get_req_state(
      'annotations',
      links.getLinkUrl({ pageNumber: prevPage })
    ))
  }

  if (loadEarlier && appStatus === APP_IS_FETCHING) {
    return <LoadingProgess text={loadingText || 'Loading...'} />
  } else if (appStatus !== APP_IS_FETCHING && pageManager.firstPage > 1) {
    loadEarlier = false
    return (
      <LoadMoreText onClick={handleOnClick}>
        { text || 'Load Earlier' }
      </LoadMoreText>
    )
  } else {
    loadEarlier = false
    return ( null )
  }
}
