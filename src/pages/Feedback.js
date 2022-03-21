import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import getPlayerAvatar from '../helpers/getPlayerAvatar';

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
    const { correctAnswers, finalScore, userEmail, userName } = this.props;
    return (
      <>
        <div className="feedback-header">
          <img
            data-testid="header-profile-picture"
            src={ getPlayerAvatar(userEmail) }
            alt="player avatar"
            className="player-avatar"
          />
          <p data-testid="header-player-name">{ userName }</p>
          <p
            data-testid="header-score"
          >
            score:
            {' '}
            { finalScore }
          </p>
        </div>
        <div className="feedback-container">
          <p
            data-testid="feedback-text"
            className={ wellDone ? 'welldone-msg' : 'could-better-msg' }
          >
            { wellDone
              ? 'Well Done!' : 'Could be better...'}
          </p>
          <p data-testid="feedback-total-score" className="total-score">
            {' '}
            Final Score:
            {' '}
            <span>{ finalScore }</span>
          </p>
          <p data-testid="feedback-total-question" className="total-assertions">
            Número de respostas corretas:
            {' '}
            <span>{ correctAnswers }</span>
          </p>
          <button
            id="playAgain"
            className="play-again-btn"
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handleClickPlayAgain }
          >
            Play again
          </button>
          <button
            id="rankingBtn"
            className="ranking-btn"
            type="button"
            data-testid="btn-ranking"
            onClick={ this.handleClickRanking }
          >
            Ranking
          </button>
        </div>
      </>

    );
  }
}

Feedback.propTypes = {
  correctAnswers: PropTypes.number.isRequired,
  finalScore: PropTypes.number.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  correctAnswers: state.player.assertions,
  finalScore: state.player.score,
  userName: state.player.name,
  userEmail: state.player.email,
});

export default connect(mapStateToProps)(Feedback);
