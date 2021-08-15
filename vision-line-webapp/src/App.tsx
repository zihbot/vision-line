import React from 'react';
import dataService from './services/data.service';
import Line from './components/Line';
import './App.scss';
import ImageSelector from './components/ImageSelector';
import { Container } from '@material-ui/core';
import { Header } from './components/Header';
import { NodesContainer } from './components/nodes/NodesContainer';

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

  render() {
    return (
      <>
        <Container>
          <Header />
          <NodesContainer />
        </Container>
        <div className="container page">
          <ImageSelector onImageSelect={i => this.setState({ currentImage: i })} />
          { (this.state.currentImage || this.state.currentImage === 0) 
            && <Line currentImage={this.state.currentImage} /> }
        </div>
      </>
    );
  }
}

export default App;
