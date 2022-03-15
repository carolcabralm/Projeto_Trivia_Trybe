import { LOGIN, ADD_SCORE, RESET_SCORE } from '../actions/actionTypes';

const INICIAL_STATE = {
  gravatarEmail: '',
  name: '',
  score: 0,
  assertions: 0,
};

function player(state = INICIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.payload.playerName,
      gravatarEmail: action.payload.playerEmail,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  case RESET_SCORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
}

export default player;
