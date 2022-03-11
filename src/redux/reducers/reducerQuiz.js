import { QUIZ } from '../actions/actionTypes';

const INICIAL_STATE = {
  quiz: [],
};

function reducerQuiz(state = INICIAL_STATE, action) {
  switch (action.type) {
  case QUIZ:
    return {
      quiz: action.payload,
    };
  default:
    return state;
  }
}

export default reducerQuiz;
