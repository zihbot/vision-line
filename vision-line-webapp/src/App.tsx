import React from 'react';
import dataService from './services/data.service';
import Line from './components/Line';
import './App.scss';

type AppProps = {}
type AppState = {currentImage?: number}

class App extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  handleClick() {
    dataService.getFunctions().then(data => {
      console.log('DATA', data);
    }, err => {
      console.log('ERROR', err);
    });
  }

  addImage() {
    dataService.createImage().then(data => {
      console.log('DATA', data);
      this.setState({ currentImage: data.value });
    }, err => {
      console.log('ERROR', err);
    });
  }

  render() {
    return (
      <div className="container page">
        <div className="row">
          <div className="col-12">
            <button className="btn btn-primary" onClick={() => this.addImage()}>Add Image</button>
          </div>
        </div>
        { (this.state.currentImage || this.state.currentImage === 0) 
          && <Line currentImage={this.state.currentImage} /> }
      </div>
    );
  }
}

export default App;
