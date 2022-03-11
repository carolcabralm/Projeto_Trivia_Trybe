import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Quiz extends Component {
  handleQuestions = (number) => {
    const { questions } = this.props;
    if (questions.length) {
      // console.log('retorno do handleQuestions', ([questions[number]]));
      return ([questions[number]]);
    }
  }

  showQuestions = (querys) => {
    const MAGIC_NUMBER = 0.5;
    const { incorrect_answers: incorrect, correct_answer: correct } = querys[0];
    // console.log(answers);
    const answers = [...incorrect, correct];
    console.log(answers);
    return answers.map((answer, index) => {
      if (index === [...incorrect, correct].length - 1) {
        return (
          <button
            key={ index }
            data-testid="correct-answer"
            type="button"
          >
            {answer}
          </button>
        );
      }
      return (
        <button
          key={ index }
          type="button"
          data-testid={ `wrong-answer-${index}` }
        >
          {answer}
        </button>
      );
    }).sort(() => Math.random() - MAGIC_NUMBER);
  }

  render() {
    return (
      <div>
        {this.handleQuestions(0) && this.handleQuestions(0).map((ele) => (
          <div key={ ele.category }>
            <p data-testid="question-category">{ ele.category }</p>
            <p data-testid="question-text">{ ele.question }</p>
          </div>
        ))}
        <div data-testid="answer-options">
          {this.handleQuestions(0) && this.showQuestions(this.handleQuestions(0))}
        </div>
      </div>
    );
  }
}

Quiz.propTypes = {
  questions: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.reducerQuiz.quiz,
});

export default connect(mapStateToProps)(Quiz);
