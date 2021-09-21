
export default abstract class StateController {

  /**
   * Get JSON definition.
   */
  abstract get json(): any

  /**
   * Chain-access to parent object.
   */
  abstract get parent(): any

}
