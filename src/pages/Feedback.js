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
    const { correctAnswers, finalScore } = this.props;
    return (
      <>
        <Header />
        <p data-testid="feedback-text">Feedback</p>
        {
          wellDone
            ? <p data-testid="feedback-text">Well Done!</p>
            : <p data-testid="feedback-text">Could be better...</p>
        }
        Placar Final:
        <p data-testid="feedback-total-score">{ finalScore }</p>
        Número de respostas corretas:
        <p data-testid="feedback-total-question">{ correctAnswers }</p>
      </>
    );
  }
}

Feedback.propTypes = {
  correctAnswers: PropTypes.number.isRequired,
  finalScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  correctAnswers: state.player.assertions,
  finalScore: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
