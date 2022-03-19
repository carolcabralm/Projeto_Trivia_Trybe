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
      <div>
        <button
          id="goHomeBtn"
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClickGoHome }
        >
          Go Home
        </button>
        <p data-testid="ranking-title">Ranking</p>
        { sortedRanking.map((player, index) => (
          <div key={ index }>
            <img src={ player.picture } alt="player avatar" />
            <p
              data-testid={ `player-name-${index}` }
            >
              {player.name}
            </p>

            <p
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
