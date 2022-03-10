import { LOGIN } from '../actions/actionTypes';

const INICIAL_STATE = {
  playerEmail: '',
  playerName: '',
};

function reducerLogin(state = INICIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return action.payload;
  default:
    return state;
  }
}

export default reducerLogin;
