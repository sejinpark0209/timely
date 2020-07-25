import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
    this.increaseCounter = this.increaseCounter.bind(this);
  }

  increaseCounter() {
    const count = this.state.counter += 1;
    this.setState({ counter: count });
  }

  render() {
    console.log('count:', this.state.counter);
    if(this.state.counter === 5) {
      window.open("https://developer.mozilla.org/en-US/");
    }

    return (
      <div>
        <button onClick={this.increaseCounter} >click</button>
      </div>
    );
  }
}

export default App;