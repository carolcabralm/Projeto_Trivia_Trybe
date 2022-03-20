import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CountDownTimer extends Component {
  render() {
    const { timer } = this.props;
    return (
      <div className="timer">
        { timer === undefined ? '' : timer }
      </div>
    );
  }
}

CountDownTimer.propTypes = {
  timer: PropTypes.number.isRequired,
};

export default CountDownTimer;
