/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
// import shuffledAnswers from '../helpers/arrayShuffle';
import Loading from './Loading';

class Answers extends Component {
  state = {
    shuffledAnswersBtns: [],
  }

  // componentDidMount() {
  //   this.setState({
  //     shuffledAnswersBtns: shuffledAnswers(this.sortAnswers()),
  //   });
  // }

  // componentDidUpdate(prevProps) {
  //   const { currQuizIndex } = this.props;
  //   if (currQuizIndex !== prevProps.currQuizIndex) {
  //     this.setState({
  //       shuffledAnswersBtns: shuffledAnswers(this.sortAnswers()),
  //     });
  //   }
  // }

  sortAnswers = () => {
    const { incorrectAnswers, correctAnswer, shuffledAnswers } = this.props;

    // const answers = [...incorrectAnswers, correctAnswer];
    const answers = [...shuffledAnswers];

    const newAnswers = answers.map((answer, answerIndex) => {
      const cleanAnswer = sanitizeHtml(answer);
      if (answer === correctAnswer) {
        return (
          <button
            name="answer"
            key={ answerIndex }
            data-testid="correct-answer"
            type="button"
            id="correct"
          >
            {cleanAnswer}
          </button>
        );
      }

      return (
        <button
          name="answer"
          key={ answerIndex }
          type="button"
          data-testid={ `wrong-answer-${answerIndex}` }
          id="wrong"
        >
          {cleanAnswer}
        </button>
      );
    });

    return newAnswers;
  }

  render() {
    // const { shuffledAnswersBtns } = this.state;
    return (
      <div>
        { this.sortAnswers().length > 0
          ? this.sortAnswers().map((button) => button) : <Loading /> }
      </div>
    );
  }
}

Answers.propTypes = {
  incorrectAnswers: PropTypes.instanceOf(Array).isRequired,
  correctAnswer: PropTypes.string.isRequired,
  currQuizIndex: PropTypes.number.isRequired,
};

export default Answers;
