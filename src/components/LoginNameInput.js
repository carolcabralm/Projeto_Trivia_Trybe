import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

class LoginNameInput extends Component {
  render() {
    const { handleInputChange } = this.props;
    return (
      <div>
        <Form.Label htmlFor="playerName" className="name-input-label">
          Name
          <Form.Control
            type="text"
            data-testid="input-player-name"
            className="name-input"
            name="playerName"
            spellcheck="false"
            onChange={ handleInputChange }
          />
        </Form.Label>
      </div>
    );
  }
}

LoginNameInput.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
};

export default LoginNameInput;
