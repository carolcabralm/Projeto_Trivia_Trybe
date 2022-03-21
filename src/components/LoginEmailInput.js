import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

class LoginEmailInput extends Component {
  render() {
    const { handleInputChange } = this.props;
    return (
      <div>
        <Form.Label htmlFor="playerEmail" className="email-input-label">
          E-mail
          <Form.Control
            type="email"
            data-testid="input-gravatar-email"
            className="email-input"
            name="playerEmail"
            spellcheck="false"
            onChange={ handleInputChange }
          />
        </Form.Label>
      </div>
    );
  }
}

LoginEmailInput.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
};

export default LoginEmailInput;
