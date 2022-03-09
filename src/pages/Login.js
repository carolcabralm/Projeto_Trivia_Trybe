import React, { Component } from 'react';
import validateLogin from '../helpers/validateLogin';
import logo from '../trivia.png';

class Login extends Component {
  state = {
    playerName: '',
    playerEmail: '',
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
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
          >
            Play
          </button>
        </form>
      </>
    );
  }
}

export default Login;
