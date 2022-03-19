import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ButtonNext from './ButtonNext';
import CountDownTimer from './CountDownTimer';
import './Questions.css';

class Questions extends Component {
  state = {
    buttonNextVisible: false,
  }

  componentDidMount() {
    const NUMBER = 0.5;
    this.randomNumber = Math.random() - NUMBER;
  }

  componentDidUpdate(prevProps) {
    const { questionIndex, timer } = this.props;

    if (questionIndex !== prevProps.questionIndex) {
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

    if (timer === 0) {
      this.getButtons();
    }
  }

  getButtons = () => {
    const wrongAnswerButtons = document.querySelectorAll('#wrong');
    const correctAnswerButton = document.querySelectorAll('#correct');
    const answersButtons = [...wrongAnswerButtons, ...correctAnswerButton];

    answersButtons.forEach((btn) => {
      btn.disabled = true;
    });
  }

  handleColorButton = (event) => {
    const { stopCountDown, calculateScore } = this.props;

    if (event.target.id === 'correct') {
      calculateScore();
    }

    if (event.target.name === 'answer') {
      this.setState({
        buttonNextVisible: true,
      });

      stopCountDown();

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
    const { questionsArr, questionIndex, nextQuestionHandler } = this.props;
    const { buttonNextVisible } = this.state;

    return (
      <div>
        <CountDownTimer />
        { questionsArr.length === 0
          ? 'Loading...' : ([questionsArr[questionIndex]]).map((question, quizIndex) => {
            const answers = [...question.randoming];
            return (
              <div key={ quizIndex }>

                <div>
                  <p data-testid="question-category">{ question.category }</p>
                  <p data-testid="question-text">{ question.question }</p>
                </div>

                <div
                  data-testid="answer-options"
                  id="parentButton"
                  onClick={ this.handleColorButton }
                  onKeyDown={ this.handleColorButton }
                  role="button"
                  tabIndex={ 0 }
                >

                  {answers.map((answer, answerIndex) => {
                    if (answer === question.correct_answer) {
                      return (
                        <button
                          name="answer"
                          key={ answerIndex }
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
                        key={ answerIndex }
                        type="button"
                        data-testid={ `wrong-answer-${answerIndex}` }
                        id="wrong"
                      >
                        {answer}
                      </button>
                    );
                  })}

                </div>

              </div>
            );
          })}
        { buttonNextVisible
          ? <ButtonNext clickHandler={ nextQuestionHandler } /> : ''}
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
  questionIndex: PropTypes.number.isRequired,
  nextQuestionHandler: PropTypes.func.isRequired,
  calculateScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Questions);
