import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import reducerQuiz from './reducerQuiz';
import reducerScore from './reducerScore';

const rootReducer = combineReducers({ player, token, reducerQuiz, reducerScore });

export default rootReducer;
