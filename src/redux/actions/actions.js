import { LOGIN, TOKEN } from './actionTypes';

export const login = (payload) => ({ type: LOGIN, payload });

export const token = (payload) => ({ type: TOKEN, payload });
