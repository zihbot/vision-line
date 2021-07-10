import React from "react";


type LineProps = {currentImage: number}
type LineState = {}

class Line extends React.Component<LineProps, LineState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
		return (
			<div>
				{this.props.currentImage}
        <img src={"/image/"+this.props.currentImage} width="200px"/>
			</div>
		);
  }
}

export default Line;