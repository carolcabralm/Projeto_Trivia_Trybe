import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { quiz, addScore } from '../redux/actions/actions';
import fetchQuiz from '../services/fetchQuiz';
import Header from '../components/Header';
import CountDownTimer from '../components/CountDownTimer';
import Questions from '../components/Questions';
import { SAVE_LOCAL_STORAGE } from '../helpers/fecthLocalStorage';

class GamePage extends Component {
  state = {
    questions: [],
    countDownTimer: 30,
    questionIndex: 0,
  }

  async componentDidMount() {
    const oneSec = 1000;
    const querys = await fetchQuiz();
    const { dispatch } = this.props;

    this.setIntervalId = setInterval(this.startCountDown, oneSec);

    this.setState({
      questions: querys,
    }, () => {
      const { questions } = this.state;

      dispatch(quiz(questions));
    });
  }

  componentDidUpdate(_prevProps, prevState) {
    const { questionIndex } = this.state;
    const { points } = this.props;
    if (prevState.questionIndex !== questionIndex) {
      SAVE_LOCAL_STORAGE('pontos', points);
    }
  }

  startCountDown = () => {
    this.setState((prevState) => ({
      countDownTimer: prevState.countDownTimer !== 0 ? prevState.countDownTimer - 1 : 0,
    }));
  };

  stopCountDown = () => {
    clearInterval(this.setIntervalId);
  }

  nextQuestionHandler = () => {
    const oneSec = 1000;
    clearInterval(this.setIntervalId);
    const numberFour = 4;
    const { questionIndex } = this.state;
    if (questionIndex === numberFour) {
      const { history } = this.props;
      history.push('/feedback');
    }
    this.setState((prevState) => ({
      ...prevState,
      questionIndex: prevState.questionIndex + 1,
      countDownTimer: 30,
    }));
    this.setIntervalId = setInterval(this.startCountDown, oneSec);
  }

  calculateScore = () => {
    const { countDownTimer, questionIndex } = this.state;
    const { questions, dispatch } = this.props;
    const { difficulty } = questions[questionIndex];

    let levelScore = 0;
    const hardNumber = 3;
    const mediumNumber = 2;
    const easyNumber = 1;
    const scoreNumber = 10;

    if (difficulty === 'hard') {
      levelScore = hardNumber;
    } else if (difficulty === 'medium') {
      levelScore = mediumNumber;
    } else {
      levelScore = easyNumber;
    }

    const score = scoreNumber + (countDownTimer * levelScore);

    dispatch(addScore(score));
  }

  render() {
    const { countDownTimer, questionIndex } = this.state;
    return (
      <div>
        <Header />
        <Questions
          timer={ countDownTimer }
          questionIndex={ questionIndex }
          stopCountDown={ this.stopCountDown }
          nextQuestionHandler={ this.nextQuestionHandler }
          calculateScore={ this.calculateScore }
        />
        <CountDownTimer timer={ countDownTimer } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.reducerQuiz.quiz,
  points: state.player.score,
});

GamePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.instanceOf(Array).isRequired,
  points: PropTypes.number.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(GamePage);
