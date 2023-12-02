
/** @see https://www.quackit.com/css/css_color_codes.cfm */
export function get_ratio_color (upvotes?: string, downvotes?: string) {
  const up = parseInt(upvotes || '0')
  const down = parseInt(downvotes || '0')
  if (!up && !down) { // no votes
    return 'inherit'
  }
  const good = .1
  const high = .25
  const average = .5
  const low = .75
  const bad = .9
  if (up * good >= down) {
    return 'green'
  }
  if (up * high >= down) {
    return 'seagreen'
  }
  if (up * average >= down) {
    return 'olivedrab'
  }
  if (up * low >= down) {
    return 'olive'
  }
  if (up * bad >= down) {
    return 'darkgoldenrod'
  }
  if (up >= down) {
    return 'darkgoldenrod'
  }
  if (up >= down * bad) {
    return 'darkgoldenrod'
  }
  if (up >= down * low) {
    return 'darksalmon'
  }
  if (up >= down * average) {
    return 'salmon'
  }
  if (up >= down * high) {
    return 'tomato'
  }
  if (up >= down * good) {
    return 'orangered'
  }

  return 'red'
}

/**
 * Get the search query from the URL
 * @returns string
 */
export function get_endpoint_search(param?: string): string {
  const search = decodeURIComponent(window.location.search)
  if (param) {
    return param + search
  }
  return search
}