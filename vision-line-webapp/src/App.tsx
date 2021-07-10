import React from 'react';
import { DataService } from './services/data.service';

class App extends React.Component {
  handleClick() {
    DataService.getFunctions().then(data => {
      console.log('DATA', data);
    }, err => {
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
