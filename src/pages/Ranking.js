import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GET_LOCAL_STORAGE } from '../helpers/fecthLocalStorage';

class Ranking extends Component {
  handleClickGoHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const ranking = GET_LOCAL_STORAGE('ranking');
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);
    return (
      <div className="ranking-container">
        <button
          id="goHomeBtn"
          className="go-home-btn"
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClickGoHome }
        >
          Go Home
        </button>
        <p data-testid="ranking-title" className="ranking-title">Ranking</p>
        { sortedRanking.map((player, index) => (
          <div className="players" key={ index }>
            <img className="ranking-avatar" src={ player.picture } alt="player avatar" />
            <p className="ranking-pos">
              { index + 1 }
              º
            </p>
            <p
              className={ index === 0 ? 'winner' : '' }
              data-testid={ `player-name-${index}` }
            >
              {player.name}
            </p>

            <p
              className={ index === 0 ? 'winner' : '' }
              data-testid={ `player-score-${index}` }
            >
              {player.score}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Ranking;
