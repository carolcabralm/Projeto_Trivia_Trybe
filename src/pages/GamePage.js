import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { quiz } from '../redux/actions/actions';
import fetchQuiz from '../services/fetchQuiz';
import Header from '../components/Header';
import Quiz from '../components/Quiz';

class GamePage extends Component {
  state = {
    questions: [],
  }

  async componentDidMount() {
    const querys = await fetchQuiz();
    // console.log('QUERYSCOMPONENT', querys);
    const { dispatch } = this.props;
    this.setState({
      questions: querys,
    }, () => {
      const { questions } = this.state;
      // console.log('depois de setar estado', questions);
      dispatch(quiz(questions));
    });
  }

  render() {
    // const { questions } = this.state;
    return (
      <div>
        <Header />
        <Quiz />
      </div>
    );
  }
}

GamePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(GamePage);
