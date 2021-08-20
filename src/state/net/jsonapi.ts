
/**
 * Checks if JSON response from server has errors.
 * 
 * @param json
 *
 * Tags: server, response, errors
 */
export function jsonHasErrors(json: any) {
  return 'errors' in json
}
