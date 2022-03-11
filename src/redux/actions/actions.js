import { LOGIN, TOKEN, QUIZ } from './actionTypes';

export const login = (payload) => ({ type: LOGIN, payload });

export const token = (payload) => ({ type: TOKEN, payload });

export const quiz = (payload) => ({ type: QUIZ, payload });
