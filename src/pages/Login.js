import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Image, Container, Row, Col } from 'react-bootstrap';
import logo from '../trivia.png';
import { SAVE_LOCAL_STORAGE, GET_LOCAL_STORAGE } from '../helpers/fecthLocalStorage';
import fetchToken from '../services/fetchToken';
import { token, login } from '../redux/actions/actions';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginForm from '../components/LoginForm';

class Login extends Component {
  state = {
    playerName: '',
    playerEmail: '',
  }

  handleInputChange = ({ target: { name, value } }) => {
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
      <Container className="form-container">
        <Row>
          <Col>
            <LoginForm
              handleInputChange={ this.handleInputChange }
              handleSettingsClick={ this.handleSettingsClick }
              handleSubmit={ this.handleSubmit }
              playerName={ playerName }
              playerEmail={ playerEmail }
            />
          </Col>
          <Col>
            <Image
              fluid
              className="trivia-logo"
              src={ logo }
              alt="logo"
            />
          </Col>
        </Row>

      </Container>
    );
  }
}

Login.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
