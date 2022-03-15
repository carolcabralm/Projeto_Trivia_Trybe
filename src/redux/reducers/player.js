import { LOGIN, ADD_SCORE } from '../actions/actionTypes';

const INICIAL_STATE = {
  playerEmail: '',
  playerName: '',
  score: 0,
};

function player(state = INICIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      playerName: action.payload.playerName,
      playerEmail: action.payload.playerEmail,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
}

export default player;
