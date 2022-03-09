const minLenghtName = 3;
const validEmail = /\S+@\S+\.\S+/;

const validateLogin = (playerEmail, playerName) => (
  validEmail.test(playerEmail) && playerName.length >= minLenghtName
);

export default validateLogin;
