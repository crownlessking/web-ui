
/**
 * Get page name.
 *
 * @param name 
 */
export function getPageName(name: string) {
  return name + 'Page'
}

/**
 * Parses the definition `string` found in `pageState.content`
 *
 * @param content
 *
 * @deprecated
 */
export function parsePageContent(content: string | undefined) {
  if (content) {
    const options = content.replace(/\s+/g,'').split(':')
    if (options.length >= 3) {
      return {
        type: options[0],
        name: options[1],
        endpoint: options[2],
        args: options[3] || ''
      }
    }
    throw new Error('Invalid `page` content definition')
  }
  throw new Error('`def` is undefined.')
}
