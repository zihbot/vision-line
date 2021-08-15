import React from 'react';
import dataService from './services/data.service';
import './App.scss';
import { Container, Grid } from '@material-ui/core';
import { Header } from './components/Header';
import { NodesContainer } from './components/nodes/NodesContainer';
import { ImageDisplay } from './components/ImageDisplay';

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
          <Grid container spacing={3}>
            <Grid item xs={6}><NodesContainer /></Grid>
            <Grid item xs={6}><ImageDisplay /></Grid>
          </Grid>
        </Container>
      </>
    );
    /*    
      <div className="container page">
        <ImageSelector onImageSelect={i => this.setState({ currentImage: i })} />
        { (this.state.currentImage || this.state.currentImage === 0) 
          && <Line currentImage={this.state.currentImage} /> }
      </div>
    */
  }
}

export default App;
