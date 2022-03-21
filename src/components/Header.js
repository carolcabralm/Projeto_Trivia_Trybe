import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getPlayerAvatar from '../helpers/getPlayerAvatar';

class Header extends React.Component {
  render() {
    const { userName, userEmail, points } = this.props;
    return (
      <div className="gamepage-header">
        <img
          data-testid="header-profile-picture"
          src={ getPlayerAvatar(userEmail) }
          alt="player avatar"
          className="player-avatar"
        />
        <p data-testid="header-player-name">{ userName }</p>
        <p
          data-testid="header-score"
        >
          score:
          {' '}
          { points }
        </p>
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
