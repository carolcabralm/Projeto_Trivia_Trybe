import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  requestAvatar = () => {
    const { userEmail } = this.props;
    const hashEmail = md5(userEmail).toString();
    return `https://www.gravatar.com/avatar/${hashEmail}`;
  }

  render() {
    const { userName } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ this.requestAvatar() }
          alt="player avatar"
        />
        <p data-testid="header-player-name">{ userName }</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.reducerLogin.playerName,
  userEmail: state.reducerLogin.playerEmail,
});

export default connect(mapStateToProps)(Header);
