import { QUIZ } from '../actions/actionTypes';

const INICIAL_STATE = {
  quiz: [],
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function searchIndex(actionPayload) {
  for (let i = actionPayload.length - 1; i >= 0; i -= 1) {
    const testing = [
      actionPayload[i]
        .correct_answer, ...actionPayload[i]
        .incorrect_answers,
    ];
    actionPayload[i].randoming = shuffleArray(testing);
  }
  return actionPayload;
}

function reducerQuiz(state = INICIAL_STATE, action) {
  switch (action.type) {
  case QUIZ:
    return {
      quiz: searchIndex(action.payload),
    };
  default:
    return state;
  }
}

export default reducerQuiz;
