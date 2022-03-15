export const SAVE_LOCAL_STORAGE = async (key, value) => {
  await localStorage.setItem(key, JSON.stringify(value));
};

export const GET_LOCAL_STORAGE = (key) => JSON.parse(localStorage.getItem(key));
