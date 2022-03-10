import { TOKEN } from '../actions/actionTypes';

const INICIAL_STATE = '';

const token = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return action.payload;
  default:
    return state;
  }
};

export default token;
