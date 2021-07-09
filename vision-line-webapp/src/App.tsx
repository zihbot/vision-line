import React from 'react';

class App extends React.Component {
  handleClick() {
    fetch('/function').then(data => data.json().then( data => {
      console.log('DATA', data);
    })).catch(err => {
      console.log('ERROR', err);
    });
  }

  render() {
    return (
      <div className="">
          <p>
            Hello World!
          </p>
          <button onClick={() => this.handleClick()}>Gomb</button>
      </div>
    );
  }
}

export default App;
