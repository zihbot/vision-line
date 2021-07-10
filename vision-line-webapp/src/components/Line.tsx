import React from "react";
import LineNodes from "./LineNodes";


type LineProps = {currentImage: number}
type LineState = {imageKey?: number}

class Line extends React.Component<LineProps, LineState> {
  constructor(props: any) {
    super(props);
    this.state = {};
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
          <div className="col-3">
            <LineNodes currentImage={this.props.currentImage} onChange={() => this.setState({imageKey: Date.now()})} />
          </div>
          <div className="col-9">
            <img src={"/image/"+this.props.currentImage+"?key="+this.state.imageKey} alt="Current" width="100%" />
          </div>
        </div>
			</div>
		);
  }
}

export default Line;