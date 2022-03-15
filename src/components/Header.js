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
    const { userName, points } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ this.requestAvatar() }
          alt="player avatar"
        />
        <p data-testid="header-player-name">{ userName }</p>
        <p data-testid="header-score">{ points }</p>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.player.name,
  userEmail: state.player.gravatarEmail,
  points: state.player.score,
});

export default connect(mapStateToProps)(Header);
