import { LOGIN } from '../actions/actionTypes';

const INICIAL_STATE = {
  playerEmail: '',
  playerName: '',
};

function reducers(state = INICIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return action.payload;
  default:
    return state;
  }
}

export default reducers;
