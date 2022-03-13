import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonNext extends Component {
  render() {
    const { clickHandler } = this.props;
    return (
      <button
        name="button-next"
        type="button"
        onClick={ clickHandler }
        data-testid="btn-next"
      >
        Next
      </button>
    );
  }
}

ButtonNext.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default ButtonNext;
