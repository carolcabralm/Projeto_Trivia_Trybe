import store from '../redux/store/store';
import { addScore } from '../redux/actions/actions';
import {
  HARD_DIFFICULTY,
  MEDIUM_DIFFICULTY,
  EASY_DIFFICULTY,
  SCORE_MULTIPLIER,
} from './constants';

const calculateScore = (countDownTimer, currQuiz) => {
  const { difficulty } = currQuiz;

  let currQuestionDifficulty = 0;

  if (difficulty === 'hard') {
    currQuestionDifficulty = HARD_DIFFICULTY;
  } else if (difficulty === 'medium') {
    currQuestionDifficulty = MEDIUM_DIFFICULTY;
  } else {
    currQuestionDifficulty = EASY_DIFFICULTY;
  }

  const score = SCORE_MULTIPLIER + (countDownTimer * currQuestionDifficulty);

  store.dispatch(addScore(score));
};

export default calculateScore;
