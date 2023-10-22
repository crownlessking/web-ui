import devCallbacks from './dev.callbacks'
import prodCallbacks from './prod.callbacks'

export default function tuber_register_callbacks() {
  window.tuberCallbacks = {
    ...prodCallbacks,
    ...devCallbacks
  }
}
