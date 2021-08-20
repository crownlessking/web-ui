
export default abstract class StateController {

  /**
   * Get a copy of the state.
   */
  abstract get state(): any

  /**
   * Get a copy of the state that has been patched with some default values
   * if they are missing.
   */
  abstract get patched(): any

  /**
   * Chain-access to parent state definition.
   */
  abstract get parent(): any

}
