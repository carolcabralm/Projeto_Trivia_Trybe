import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { quiz, resetScore } from '../redux/actions/actions';
import fetchQuiz from '../services/fetchQuiz';
import Header from '../components/Header';
import CountDownTimer from '../components/CountDownTimer';
import Questions from '../components/Questions';
import savePlayerRanking from '../helpers/savePlayerRanking';
import {
  ONE_SECOND,
  LAST_QUESTION_INDEX,
} from '../helpers/constants';

class GamePage extends Component {
  state = {
    questions: [],
    countDownTimer: 30,
    currQuizIndex: 0,
  }

  async componentDidMount() {
    const querys = await fetchQuiz();
    const { dispatch } = this.props;

    this.setIntervalId = setInterval(this.startCountDown, ONE_SECOND);

    this.setState({
      questions: querys,
    }, () => {
      const { questions } = this.state;

      dispatch(quiz(questions));
    });
    dispatch(resetScore(0));
  }

  componentWillUnmount() {

    const { dispatch } = this.props;

    savePlayerRanking();
    this.stopCountDown();
    dispatch(quiz([]));
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
    this.stopCountDown();
    const { currQuizIndex } = this.state;

    if (currQuizIndex === LAST_QUESTION_INDEX) {
      const { history } = this.props;
      history.push('/feedback');
    }

    this.setState((prevState) => ({
      ...prevState,
      currQuizIndex: prevState.currQuizIndex + 1,
      countDownTimer: 30,
    }));

    this.setIntervalId = setInterval(this.startCountDown, ONE_SECOND);
  }

  render() {
    const { countDownTimer, currQuizIndex } = this.state;
    return (
      <div className="gamepage">
        <Header />
        <CountDownTimer timer={ countDownTimer } />
        <Questions
          timer={ countDownTimer }
          currQuizIndex={ currQuizIndex }
          stopCountDown={ this.stopCountDown }
          nextQuestionHandler={ this.nextQuestionHandler }
          calculateScore={ this.calculateScore }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsArr: state.reducerQuiz.quiz,
});

GamePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(GamePage);
