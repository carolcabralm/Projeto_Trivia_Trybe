export const SAVE_LOCAL_STORAGE = async (key, tokenValue) => {
  await localStorage.setItem(key, JSON.stringify(tokenValue));
};

export const GET_LOCAL_STORAGE = (key) => JSON.parse(localStorage.getItem(key));
