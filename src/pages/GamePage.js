import React, { Component } from 'react';
import fetchQuiz from '../services/fetchQuiz';
import Header from '../components/Header';

class GamePage extends Component {
  state = {
    questions: [],
  }

  componentDidMount = async () => {
    this.setState({
      questions: await fetchQuiz(),
    });
  }

  render() {
    const { questions } = this.state;
    // console.log(questions);
    // const shuffle = answers.sort(() => Math.random() - 0.5 );
    // console.log(shuffle);
    console.log(questions);
    return (
      <div>
        <Header />

        {questions.length && (questions
          .map(({
            category,
            question,
            correct_answer: correct,
            incorrect_answers: incorrect,
          }) => (
            <div key={ category }>
              <p data-testid="question-category">{category}</p>
              <p data-testid="question-text">{question}</p>
              <div data-testid="answer-options">

                {[...incorrect, correct]
                  .map((ele, index) => {
                    if (index === [...incorrect, correct].length - 1) {
                      return (
                        <button
                          type="button"
                          key={ ele }
                          data-testid="correct-answer"
                        >
                          { ele }
                        </button>);
                    }
                    if (index !== [...incorrect, correct][index - 1]) {
                      return (
                        <button
                          type="button"
                          key={ ele }
                          data-testid={ `wrong-answer-${index}` }
                        >
                          { ele }
                        </button>);
                    }
                  }).sort(() => Math.random() - 0.5)}
                }
              </div>
            </div>
          )))}

      </div>
    );
  }
}

export default GamePage;
