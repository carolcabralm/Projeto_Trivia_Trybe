const getButtons = (wrongBtnId, correctBtnId) => {
  const wrongAnswerButtons = document.querySelectorAll(wrongBtnId);
  const correctAnswerButton = document.querySelectorAll(correctBtnId);
  const answersButtons = [...wrongAnswerButtons, ...correctAnswerButton];
  return answersButtons;
};

export default getButtons;
