import { NET_STATE_PATCH, STATE_RESET } from '../constants';

export const net_patch_state = (stateFragment: any) => ({
  type: NET_STATE_PATCH,
  payload: stateFragment
});

export const state_reset = () => ({
  type: STATE_RESET
});
