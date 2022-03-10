import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import validateLogin from '../helpers/validateLogin';
import logo from '../trivia.png';
import { SAVE_LOCAL_STORAGE, GET_LOCAL_STORAGE } from '../helpers/fecthLocalStorage';
import fetchToken from '../services/fetchToken';
import { token, login } from '../redux/actions/actions';

class Login extends Component {
  state = {
    playerName: '',
    playerEmail: '',
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    dispatch(login(this.state));
    SAVE_LOCAL_STORAGE('token', await fetchToken());
    const tokenSTRING = GET_LOCAL_STORAGE('token');
    this.setState({ playerToken: tokenSTRING });
    const { playerToken } = this.state;
    dispatch(token(playerToken));
    history.push('/gamepage');
  };

  handleSettingsClick = () => {
    const { history } = this.props;
    history.push('./settings');
  }

  render() {
    const { playerName, playerEmail } = this.state;
    return (
      <>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form>
          <label htmlFor="playerName">
            Name
            <input
              type="text"
              data-testid="input-player-name"
              name="playerName"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="playerEmail">
            E-mail
            <input
              type="email"
              data-testid="input-gravatar-email"
              name="playerEmail"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ !validateLogin(playerEmail, playerName) }
            onClick={ this.handleSubmit }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleSettingsClick }
          >
            Configurações
          </button>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf.isRequired,
  dispatch: PropTypes.objectOf.isRequired,
};

export default connect()(Login);
