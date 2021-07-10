import React from 'react';
import { DataService } from './services/data.service';
import Line from './components/Line';

type AppProps = {}
type AppState = {currentImage?: number}

class App extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  handleClick() {
    DataService.getFunctions().then(data => {
      console.log('DATA', data);
    }, err => {
      console.log('ERROR', err);
    });
  }

  addImage() {
    DataService.createImage().then(data => {
      console.log('DATA', data);
      this.setState({ currentImage: data.value });
    }, err => {
      console.log('ERROR', err);
    });
  }

  render() {
    return (
      <div className="">
        <button onClick={() => this.addImage()}>Add Image</button>
        { this.state.currentImage && <Line currentImage={this.state.currentImage} /> }
      </div>
    );
  }
}

export default App;
