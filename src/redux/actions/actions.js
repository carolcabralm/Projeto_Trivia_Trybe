import { LOGIN, TOKEN, QUIZ, ADD_SCORE } from './actionTypes';

export const login = (payload) => ({ type: LOGIN, payload });

export const token = (payload) => ({ type: TOKEN, payload });

export const quiz = (payload) => ({ type: QUIZ, payload });

export const addScore = (payload) => ({ type: ADD_SCORE, payload });
