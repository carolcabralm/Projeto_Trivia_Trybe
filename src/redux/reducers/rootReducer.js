import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import reducerQuiz from './reducerQuiz';

const rootReducer = combineReducers({ player, token, reducerQuiz });

export default rootReducer;
