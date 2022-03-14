import React, { Component } from 'react';

const ONE_SECOND = 1000;

class Timer extends Component {
  state = {
    seconds: 30,
  };

  setInterval(() => {
    this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));  
  }, ONE_SECOND);

  render() {
    const { seconds } = this.state;
    return (
      <h1>{ seconds }</h1>
    );
  }
}

export default Timer;
