import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import './Quiz.css';
import ButtonNext from './ButtonNext';

class Quiz extends Component {
  state = {
    buttonNextVisible: false,
    questionIndex: 0,
  }

  componentDidUpdate(_prevProps, prevState) {
    const { questionIndex } = this.state;

    if (questionIndex !== prevState.questionIndex) {
      this.setState({
        buttonNextVisible: false,
      });

      const options = [...document.querySelector('#parentButton').children];
      options.forEach((ele) => {
        if (ele.id === 'correct') {
          ele.className = '';
        } else {
          ele.className = '';
        }
      });
    }
  }

  nextQuestionHandler = () => {
    this.setState((prevState) => ({
      ...prevState,
      questionIndex: prevState.questionIndex + 1,
    }));
  }

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
    const answers = [...incorrect, correct];
    // console.log(answers);
    return answers.map((answer, index) => {
      if (index === [...incorrect, correct].length - 1) {
        return (
          <button
            name="answer"
            key={ index }
            data-testid="correct-answer"
            type="button"
            id="correct"
          >
            {answer}
          </button>
        );
      }
      return (
        <button
          name="answer"
          key={ index }
          type="button"
          data-testid={ `wrong-answer-${index}` }
          id="wrong"
        >
          {answer}
        </button>
      );
    }).sort(() => Math.random() - MAGIC_NUMBER);
  }

  handleButtonClick = (event) => {
    if (event.target.name === 'answer') {
      this.setState({
        buttonNextVisible: true,
      });

      const options = [...document.querySelector('#parentButton').children];
      options.forEach((ele) => {
        if (ele.id === 'correct') {
          ele.className = 'correct';
        } else {
          ele.className = 'wrong';
        }
      });
    }
  }

  render() {
    const { buttonNextVisible, questionIndex } = this.state;
    return (
      <div>
        {this.handleQuestions(questionIndex)
          && this.handleQuestions(questionIndex).map((ele) => (
            <div key={ ele.category }>
              <p data-testid="question-category">{ ele.category }</p>
              <p data-testid="question-text">{ ele.question }</p>
            </div>
          ))}

        <div
          data-testid="answer-options"
          id="parentButton"
          onClick={ this.handleButtonClick }
          onKeyDown={ this.handleButtonClick }
          role="button"
          tabIndex={ 0 }
        >
          {this.handleQuestions(questionIndex)
            && this.showQuestions(this.handleQuestions(questionIndex))}
        </div>

        { buttonNextVisible
          ? <ButtonNext clickHandler={ this.nextQuestionHandler } /> : ''}

      </div>
    );
  }
}

Quiz.propTypes = {
  questions: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.reducerQuiz.quiz,
});

export default connect(mapStateToProps)(Quiz);
