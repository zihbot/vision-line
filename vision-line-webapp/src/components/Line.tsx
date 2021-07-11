import React from "react";
import LineNodes from "./LineNodes";
import dataService from '../services/data.service';

type LineProps = {currentImage: number}
type LineState = {imageSrc?: string, imageLoaded: boolean, imageError: boolean}

class Line extends React.Component<LineProps, LineState> {
  constructor(props: any) {
    super(props);
    this.state = {imageLoaded: false, imageError: false};
  }

  componentDidMount() {
    this.setImageSrc(Date.now());
  }

  onNodesChange() {
    this.setState({imageLoaded: false, imageError: false});
    this.setImageSrc(Date.now());
  }

  onImageError() {
    this.setState({imageLoaded: true, imageError: true});
  }

  setImageSrc(time: number) {
    this.setState({imageSrc: dataService.getImageRoute() + this.props.currentImage + "?key=" + this.state.imageSrc});
  }

  render() {
		return (
			<div>
        <div className="row">
          <div className="col">
				    Image number: {this.props.currentImage}
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <LineNodes currentImage={this.props.currentImage} onChange={() => this.onNodesChange()} />
          </div>
          <div className="col-8">
            {!this.state.imageLoaded &&
              <div className="alert alert-secondary">Loading...</div>}
            {this.state.imageError &&
              <div className="alert alert-danger">Error in pipeline</div>}
            {!this.state.imageError && 
              <img src={this.state.imageSrc} 
                onLoad={() => this.setState({imageLoaded: true})} 
                onError={() => this.onImageError()}
                style={this.state.imageLoaded ? {} : {display: 'none'}}
                alt="Current" width="100%" />}
          </div>
        </div>
			</div>
		);
  }
}

export default Line;