// Tuber app types and interfaces gathered in one spot
import IStateLink from '../../controllers/interfaces/IStateLink'
import StatePageAppBar from '../../controllers/templates/StatePageAppBar'

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

/** Type for bookmark */
export interface IBookmark {
  createdAt?: Date
  modifiedAt?: Date
  isPrivate?: boolean
  userid?: string
  author?: string
  videoid: string
  url?: string
  embedUrl?: string
  embed_url?: string
  slug?: string
  platform: TPlatform
  startSeconds?: number
  start_seconds?: number
  endSeconds?: number
  end_seconds?: number
  title: string
  note?: string
  rating?: number
  upvotes?: string
  downvotes?: string
  thumbnail?: string
  tags?: string[]
  groupid?: string
  htmlTag?: string
  html_tag?: string
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

export interface ITuberProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  bookmark: IBookmark
}

export interface ITuberBookmarksProps {
  playerOpen: boolean
  setBookmarkToPlay: React.Dispatch<React.SetStateAction<IBookmark|undefined>>
  setPlayerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ITuberPlatform {
  platform: TPlatform
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
  /** Parent definition for state links. It is required. */
  def: StatePageAppBar
}
