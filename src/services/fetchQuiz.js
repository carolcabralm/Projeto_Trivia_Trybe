import { GET_LOCAL_STORAGE, SAVE_LOCAL_STORAGE } from '../helpers/fecthLocalStorage';
import fetchToken from './fetchToken';

const REQUEST_API = 'https://opentdb.com/api.php?amount=5&token=';

const fetchQuiz = async () => {
  let getToken = GET_LOCAL_STORAGE('token');
  let apiResponse = await fetch(`${REQUEST_API}${getToken}`);
  let apiJson = await apiResponse.json();
  if (apiJson.results.length === 0) {
    SAVE_LOCAL_STORAGE('token', await fetchToken());
    getToken = GET_LOCAL_STORAGE('token');
    apiResponse = await fetch(`${REQUEST_API}${getToken}`);
    apiJson = await apiResponse.json();
    return apiJson.results;
  }
  return apiJson.results;
};

export default fetchQuiz;
