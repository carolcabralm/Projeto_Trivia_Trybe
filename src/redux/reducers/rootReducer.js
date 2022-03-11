import { combineReducers } from 'redux';
import reducerLogin from './reducerLogin';
import token from './token';
import reducerQuiz from './reducerQuiz';

const rootReducer = combineReducers({ reducerLogin, token, reducerQuiz });

export default rootReducer;
