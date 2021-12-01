
export default abstract class AbstractState {

  /**
   * Get JSON definition.
   *
   * It contains the raw data with which this object was instantiated.
   * It's useful to use if the interface version of the object is expected or
   * a specific value could or should be undefined.
   * Whereas, with the object, values are most likely not undefined.
   */
  abstract get json(): any

  /**
   * Chain-access to parent object.
   */
  abstract get parent(): any

}
