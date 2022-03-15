import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  state = {
    wellDone: false,
  }

  componentDidMount = () => {
    const { correctAnswers } = this.props;
    const minAssertions = 3;
    if (correctAnswers >= minAssertions) {
      this.setState({ wellDone: true });
    }
  }

  render() {
    const { wellDone } = this.state;
    return (
      <>
        <Header />
        <p data-testid="feedback-text">Feedback</p>
        {
          wellDone
            ? <p data-testid="feedback-text">Well Done!</p>
            : <p data-testid="feedback-text">Could be better...</p>
        }
      </>
    );
  }
}

Feedback.propTypes = {
  correctAnswers: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  correctAnswers: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
