/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import ButtonNext from './ButtonNext';
import CountDownTimer from './CountDownTimer';
import Answers from './Answers';
import getButtons from '../helpers/getButtons';
import Loading from './Loading';
import { SELECT_N_DISABLE, RESET_N_ENABLE } from '../helpers/constants';
import calculateScore from '../helpers/calculateScore';

class Questions extends Component {
  state = {
    buttonNextVisible: false,
  }

  componentDidUpdate(prevProps) {
    const { currQuizIndex, timer } = this.props;

    if (currQuizIndex !== prevProps.currQuizIndex) {
      this.answersButtonActions(RESET_N_ENABLE);

      this.setState({ buttonNextVisible: false });
    }

    if (timer === 0 && prevProps.timer === 1) {
      this.answersButtonActions(SELECT_N_DISABLE);

      this.setState((prevState) => ({ buttonNextVisible: !prevState.buttonNextVisible }));
    }
  }

  handleAnswerClick = (event) => {
    const { stopCountDown, timer, currQuizIndex, questionsArr } = this.props;

    if (event.target.id === 'correct') {
      calculateScore(timer, questionsArr[currQuizIndex]);
    }

    if (event.target.name === 'answer') {
      stopCountDown();

      this.setState({ buttonNextVisible: true });

      this.answersButtonActions(SELECT_N_DISABLE);
    }
  }

  answersButtonActions = (actionString) => {
    const answersButtons = getButtons('#wrong', '#correct');

    if (actionString === 'select & disable') {
      answersButtons.forEach((btn) => {
        btn.disabled = true;
        if (btn.id === 'correct') {
          btn.className = 'correct';
        } else {
          btn.className = 'wrong';
        }
      });
    }

    if (actionString === 'reset & enable') {
      answersButtons.forEach((btn) => {
        btn.className = 'answer-btn';
        btn.disabled = false;
      });
    }
  }

  render() {
    const { questionsArr, currQuizIndex, nextQuestionHandler } = this.props;
    const { buttonNextVisible } = this.state;

    return (
      <div>
        <CountDownTimer />
        { questionsArr.length === 0
          ? <Loading /> : ([questionsArr[currQuizIndex]])
            .map((question, questionIndex) => {
              const cleanCategory = sanitizeHtml(question.category);
              const cleanQuestion = sanitizeHtml(question.question);
              return (
                <div className="quiz-container" key={ questionIndex }>

                  <div className="quiz-title">
                    <p
                      className="quiz-category"
                      data-testid="question-category"
                    >
                      { cleanCategory}
                    </p>
                    <p
                      className="question"
                      data-testid="question-text"
                    >
                      { cleanQuestion }

                    </p>
                    { buttonNextVisible ? <ButtonNext
                      clickHandler={ nextQuestionHandler }
                    /> : ''}
                  </div>
                  <Answers
                    handleAnswerClick={ this.handleAnswerClick }
                    correctAnswer={ question.correct_answer }
                    shuffledAnswers={ question.randoming }
                  />
                </div>
              );
            })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsArr: state.reducerQuiz.quiz,
});

Questions.propTypes = {
  questionsArr: PropTypes.instanceOf(Array).isRequired,
  stopCountDown: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  currQuizIndex: PropTypes.number.isRequired,
  nextQuestionHandler: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Questions);
