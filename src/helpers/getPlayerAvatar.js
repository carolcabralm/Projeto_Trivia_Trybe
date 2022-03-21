import md5 from 'crypto-js/md5';

const getPlayerAvatar = (playerEmail) => {
  const hashEmail = md5(playerEmail).toString();
  return `https://www.gravatar.com/avatar/${hashEmail}`;
};

export default getPlayerAvatar;
