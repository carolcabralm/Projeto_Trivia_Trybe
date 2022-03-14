import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CountDownTimer extends Component {
  render() {
    const { timer } = this.props;
    return (
      <div>
        { timer }
      </div>
    );
  }
}

CountDownTimer.propTypes = {
  timer: PropTypes.number,
};

CountDownTimer.defaultProps = {
  timer: 30,
};

export default CountDownTimer;
