import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  handleClickGoHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        <button
          id="goHomeBtn"
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClickGoHome }
        >
          Go Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Ranking;
