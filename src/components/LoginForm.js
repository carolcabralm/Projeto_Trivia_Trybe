import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import LoginNameInput from './LoginNameInput';
import LoginEmailInput from './LoginEmailInput';
import validateLogin from '../helpers/validateLogin';

class LoginForm extends Component {
  render() {
    const {
      handleInputChange,
      handleSettingsClick,
      handleSubmit,
      playerName,
      playerEmail,
    } = this.props;
    return (
      <div>
        <Form className="form">
          <Form.Group>
            <LoginNameInput
              handleInputChange={ handleInputChange }
            />
            <LoginEmailInput
              handleInputChange={ handleInputChange }
            />
            <Button
              variant="success"
              type="submit"
              className="play-btn"
              data-testid="btn-play"
              disabled={ !validateLogin(playerEmail, playerName) }
              onClick={ handleSubmit }
            >
              Play
            </Button>
          </Form.Group>
          <Button
            variant="secondary"
            type="button"
            className="settings-btn"
            data-testid="btn-settings"
            onClick={ handleSettingsClick }
          >
            Configurações
          </Button>
        </Form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSettingsClick: PropTypes.string.isRequired,
  handleSubmit: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
};

export default LoginForm;
