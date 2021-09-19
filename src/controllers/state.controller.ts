
export default abstract class StateController {

  /**
   * Get a copy of the state.
   */
  abstract get json(): any

  /**
   * Chain-access to parent state definition.
   */
  abstract get parent(): any

}
