// Tuber app types and interfaces gathered in one spot
import IStateLink from '../../interfaces/IStateLink'
import StatePageAppBar from '../../controllers/templates/StatePageAppBar'
import { TWithRequired } from 'src/interfaces'

/**
 * Online video platform.
 * @see https://en.wikipedia.org/wiki/List_of_online_video_platforms
 */
export type TPlatform = '_blank'
  | 'youtube'
  | 'vimeo'
  | 'dailymotion'
  | 'rumble'
  | 'odysee'
  | 'facebook'
  | 'twitch'
  | 'unknown'

/**
 * Type for bookmark.  
 * Contains two versions of the same field. Server uses snake_case, but client
 * uses camelCase.
 */
export interface IBookmark {
  createdAt?: Date
  modifiedAt?: Date
  isPrivate?: boolean
  userid?: string
  author?: string
  videoid: string
  url?: string
  /** Server field */
  embed_url?: string
  embedUrl?: string
  slug?: string
  platform: TPlatform
  /** Server field */
  start_time?: string
  startTime?: string
  /** Server field */
  start_seconds?: number
  startSeconds?: number
  /** Server field */
  end_seconds?: number
  endSeconds?: number
  title: string
  note?: string
  rating?: number
  upvotes?: string
  downvotes?: string
  /** Server field */
  thumbnail_url?: string
  thumbnailUrl?: string
  tags?: string[]
  groupid?: string
  /** Server field */
  html_tag?: string
  htmlTag?: string
  sortOrder?: number
  // [TODO] Add properties what will help in bolding search terms.
}

// Bookmark type from the server
export interface IBookmarkOrigin
  extends Omit<IBookmark, 'userid' | 'groupid' | 'startSeconds' | 'endSeconds' | 'embedUrl'>
{
  embed_url?: string
  user_id?: string
  group_id?: string
  start_seconds?: number
  end_seconds?: number
}

export interface ITuberBookmarksProps {
  playerOpen: boolean
  setBookmarkToPlay: React.Dispatch<React.SetStateAction<IBookmark|undefined>>
  setPlayerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// export type TTuberPlatformMap = {[brand in TPlatform]: (...args: any) => JSX.Element | null }
export type TTuberPlatformMap = {[brand in TPlatform]: JSX.Element | null }

export interface IResearchToolbarProps {
  /** This callback shows and hides the list of bookmarks. */
  togglePlayerCallback: IStateLink['onClick']
  /**
   * This callback function displays an interface which is then used to create
   * a new bookmark.
   */
  bookmarkAddCallback: IStateLink['onClick']
  toggleThumbnailsCallback: IStateLink['onClick']
  /** Parent definition for state links. It is required. */
  def: StatePageAppBar
}

export interface ITuberPlayer {
  isOpen?: boolean
  bookmark?: IBookmark
  toolbarProps: IResearchToolbarProps
}

export interface ITuberProps {
  playerOpen?: boolean
  setBookmarkToPlay?: React.Dispatch<React.SetStateAction<IBookmark|undefined>>
  setPlayerOpen?: React.Dispatch<React.SetStateAction<boolean>>
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  isOpen?: boolean
  bookmark?: IBookmark
  toolbarProps?: IResearchToolbarProps
}

export type TTBListProps = TWithRequired<
  ITuberProps,
  'playerOpen'
  | 'setPlayerOpen'
  | 'setBookmarkToPlay'
>

export type TTTBListProps = TWithRequired<
  ITuberProps,
  'setBookmarkToPlay'
  | 'setPlayerOpen'
>

export type TTPlayerProps = TWithRequired<ITuberProps, 'toolbarProps'>

/** Tuber bookmark list */
export interface ITBList {
  props: TTBListProps
}

/** Tuber thumbnailed bookmark list */
export interface ITTBList {
  props: TTTBListProps
}

export interface TTPlayer {
  props: TTPlayerProps
}

export interface IUrlStatus {
  message: string
  valid: boolean
}

export interface IVideoData {
  id: string
  start: number
  platform: TPlatform
  author: string
  slug: string
  urlCheck: IUrlStatus
  dialogId: string
  thumbnailUrl: string
}

export type TVideoData = Partial<IVideoData>
