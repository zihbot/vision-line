import React from "react";
import LineNodes from "./LineNodes";


type LineProps = {currentImage: number}
type LineState = {imageKey?: number, imageLoaded: boolean}

class Line extends React.Component<LineProps, LineState> {
  constructor(props: any) {
    super(props);
    this.state = {imageLoaded: false};
  }

  onNodesChange() {
    this.setState({imageKey: Date.now(), imageLoaded: false})
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
              <p>Loading...</p>}
            <img src={"/image/"+this.props.currentImage+"?key="+this.state.imageKey} 
                onLoad={() => this.setState({imageLoaded: true})} 
                style={this.state.imageLoaded ? {} : {display: 'none'}}
                alt="Current" width="100%" />
          </div>
        </div>
			</div>
		);
  }
}

export default Line;