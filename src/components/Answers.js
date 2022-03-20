/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import Loading from './Loading';

class Answers extends Component {
  render() {
    const { correctAnswer, shuffledAnswers, handleAnswerClick } = this.props;
    const answers = [...shuffledAnswers];

    return (
      <div
        className="answers-container"
        data-testid="answer-options"
        id="parentButton"
        onClick={ handleAnswerClick }
        onKeyDown={ handleAnswerClick }
        role="button"
        tabIndex={ 0 }

      >
        { answers.length === 0 ? <Loading /> : answers.map((answer, answerIndex) => {
          const cleanAnswer = sanitizeHtml(answer);
          if (answer === correctAnswer) {
            return (
              <button
                name="answer"
                className="answer-btn"
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
              className="answer-btn"
              key={ answerIndex }
              type="button"
              data-testid={ `wrong-answer-${answerIndex}` }
              id="wrong"
            >
              {cleanAnswer}
            </button>
          );
        }) }
      </div>
    );
  }
}

Answers.propTypes = {
  correctAnswer: PropTypes.string.isRequired,
  shuffledAnswers: PropTypes.instanceOf(Array).isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
};

export default Answers;
