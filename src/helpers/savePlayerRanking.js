import store from '../redux/store/store';
import { GET_LOCAL_STORAGE, SAVE_LOCAL_STORAGE } from './fecthLocalStorage';
import getPlayerAvatar from './getPlayerAvatar';

const savePlayerRanking = () => {
  const { name, score, gravatarEmail } = store.getState().player;
  const picture = getPlayerAvatar(gravatarEmail);
  const playerRankingInfo = {
    name,
    score,
    picture,
  };

  const playersRanking = GET_LOCAL_STORAGE('ranking');

  if (playersRanking === null) {
    SAVE_LOCAL_STORAGE('ranking', [playerRankingInfo]);
  } else {
    const newRanking = [...playersRanking, playerRankingInfo];
    SAVE_LOCAL_STORAGE('ranking', newRanking);
  }
};

export default savePlayerRanking;
