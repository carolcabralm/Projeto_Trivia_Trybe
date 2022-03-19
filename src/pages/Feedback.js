import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  state = {
    wellDone: false,
  }

  componentDidMount = () => {
    const { correctAnswers } = this.props;
    const minAssertions = 3;
    if (correctAnswers >= minAssertions) {
      this.setState({ wellDone: true });
    }
  }

  handleClickPlayAgain = () => {
    const { history } = this.props;
    history.push('./');
  }

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('./ranking');
  }

  render() {
    const { wellDone } = this.state;
    const { correctAnswers, finalScore } = this.props;
    return (
      <>
        <Header />
        {
          wellDone
            ? <p data-testid="feedback-text">Well Done!</p>
            : <p data-testid="feedback-text">Could be better...</p>
        }
        Final Score:
        <p data-testid="feedback-total-score">{ finalScore }</p>
        Número de respostas corretas:
        <p data-testid="feedback-total-question">{ correctAnswers }</p>
        <button
          id="playAgain"
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClickPlayAgain }
        >
          Play again
        </button>
        <button
          id="rankingBtn"
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClickRanking }
        >
          Ranking
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  correctAnswers: PropTypes.number.isRequired,
  finalScore: PropTypes.number.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  correctAnswers: state.player.assertions,
  finalScore: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
