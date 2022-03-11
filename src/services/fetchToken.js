const REQUEST_API = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = async () => {
  const apiResponse = await fetch(REQUEST_API);
  const apiJson = await apiResponse.json();
  return apiJson.token;
};

export default fetchToken;
