const arrayShuffle = (arr) => {
  let randomIndex;

  let temp;

  for (let i = arr.length - 1; i > 0; i -= 1) {
    randomIndex = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
};

export default arrayShuffle;

/*
link de referência https://www.youtube.com/watch?v=myL4xmtAVtw

função arrayShuffle utiliza o algorítimo de permutação aleatória de Fisher-Yates
para retornar um array com seus itens embaralhados
*/
