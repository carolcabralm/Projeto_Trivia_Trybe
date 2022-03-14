import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { quiz } from '../redux/actions/actions';
import fetchQuiz from '../services/fetchQuiz';
import Header from '../components/Header';
import CountDownTimer from '../components/CountDownTimer';
import Questions from '../components/Questions';

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
      // console.log('depois de setar estado', questions);
      dispatch(quiz(questions));
    });
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

    this.setState((prevState) => ({
      ...prevState,
      questionIndex: prevState.questionIndex + 1,
      countDownTimer: 30,
    }));
    this.setIntervalId = setInterval(this.startCountDown, oneSec);
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
        />
        <CountDownTimer timer={ countDownTimer } />
      </div>
    );
  }
}

GamePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(GamePage);
