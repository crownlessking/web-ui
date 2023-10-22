import AbstractState from './AbstractState'
import { ILoadedPagesRange, IStateDataPagesRange } from './interfaces/IState'
import State from './State'

interface IConfigure {
  maxLoadedPages?: number
  endpoint?: string
  pageSize?: number
}

const EMPTY_PAGES_RANGE: ILoadedPagesRange = {
  first: '1',
  last: '1',
}

export default class StateDataPagesRange extends AbstractState {
  private pagesRangeState: IStateDataPagesRange
  private parentDef?: State
  private maxLoadedPages?: number
  private endpoint?: string
  private pageSize?: number
  private pageToBeDropped?: string
  private newPageRange?: ILoadedPagesRange

  constructor(pagesRangeState: IStateDataPagesRange, parent?: State) {
    super()
    this.pagesRangeState = pagesRangeState || {}
    this.parentDef = parent
  }

  get state(): any { return this.pagesRangeState }
  get parent(): any { return this.parentDef || new State() }
  get props(): any { return this.die('Method not implemented.', {}) }
  get theme(): any { return this.die('Method not implemented.', {}) }

  /** Instance needs to be given specific information to function properly. */
  configure(opts: IConfigure): this {
    const { maxLoadedPages, endpoint, pageSize } = opts
    this.maxLoadedPages = maxLoadedPages
    this.endpoint = endpoint
    this.pageSize = pageSize
    return this
  }

  private getPageSize(): number {
    if (!this.pageSize) {
      return this.die('StateDataPagesRange: pageSize not set.', 0)
    }
    return this.pageSize
  }

  public getMaxLoadedPages(): number {
    if (!this.maxLoadedPages) {
      return this.die('StateDataPagesRange: maxLoadedPages not set.', 0)
    }
    return this.maxLoadedPages
  }

  /** Get the page to be dropped as a number */
  private getPageToBeDropped(): number | false {
    if (this.pageToBeDropped) {
      return parseInt(this.pageToBeDropped) - 1
    }
    return false
  }

  private getPageRange(): ILoadedPagesRange {
    if (!this.endpoint) {
      return this.die(
        'StateDataPagesRange: endpoint not set.',
        EMPTY_PAGES_RANGE
      )
    }
    if (!this.pagesRangeState[this.endpoint]) {
      return this.notice(
        'StateDataPagesRange: endpoint not found.',
        EMPTY_PAGES_RANGE
      )
    }
    return this.pagesRangeState[this.endpoint] || EMPTY_PAGES_RANGE
  }

  private getLoadedPageTotal(): number | false {
    const { first, last } = this.getPageRange()
    return parseInt(last) - parseInt(first) + 1
  }

  get firstPage(): number {
    return parseInt(this.getPageRange().first)
  }

  get lastPage(): number {
    return parseInt(this.getPageRange().last)
  }

  /**
   * Enforce the "max loaded pages" limit by dropping a newer page or older page
   * if that limit is reached, based on the page number.
   * If the page number is not sequential, then set that page as both the first
   * and last page.
   */
  pageToBeLoaded(page: number): this {
    const { first, last } = this.getPageRange()
    const firstPage = parseInt(first)
    const lastPage = parseInt(last)

    // If no page range was found
    if (lastPage + firstPage === 0) {
      this.newPageRange = {
        first: '1',
        last: page.toString(),
      }
      return this
    }

    // If the page is within the pages range, then return false.
    // This means that the page is already loaded.
    if (page >= firstPage && page <= lastPage) {
      return this
    }

    // If the page number is not sequential, then set that page as both the
    // first and last page.
    if (page > (lastPage + 1) || page < (firstPage - 1)) {
      this.newPageRange = {
        first: page.toString(),
        last: page.toString(),
      }
      this.pageToBeDropped = 'all'
      return this
    }

    // If the page number is sequential, then check if the limit is reached.
    // If the limit is reached, then drop the earliest or latest page.
    const maxLoadedPages = this.getMaxLoadedPages()
    if (lastPage - firstPage >= maxLoadedPages) {
      if (page === lastPage + 1) {
        this.newPageRange = {
          first: (firstPage + 1).toString(),
          last: page.toString(),
        }
        this.pageToBeDropped = firstPage.toString()
      } else if (page === firstPage - 1) {
        this.newPageRange = {
          first: page.toString(),
          last: (lastPage - 1).toString(),
        }
        this.pageToBeDropped = lastPage.toString()
      }
      return this
    }

    // If the limit is not reached, then add the page to the pages range.
    if (page === lastPage + 1) {
      this.newPageRange = {
        first: firstPage.toString(),
        last: page.toString(),
      }
    } else if (page === firstPage - 1) {
      this.newPageRange = {
        first: page.toString(),
        last: lastPage.toString(),
      }
    }
    return this
  }

  /** Returns the new page range. */
  getNewPageRange(): ILoadedPagesRange | false {
    if (this.newPageRange) {
      return this.newPageRange
    }
    return this.notice(
      `StateDataPagesRange: 'newPageRange' is undefined.
       Run 'pageToBeLoaded()' first.
      `,
      false
    )
  }

  /** Check if page is within range */
  isPageInRange(page: number): boolean {
    const { first, last } = this.getPageRange()
    const firstPage = parseInt(first)
    const lastPage = parseInt(last)
    return firstPage !== lastPage && page >= firstPage && page <= lastPage
  }
}
