import React from "react";


type LineNodesProps = {currentImage: number}
type LineNodesState = {}

class LineNodes extends React.Component<LineNodesProps, LineNodesState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
		return (
			<div>
        {this.props.currentImage}
			</div>
		);
  }
}

export default LineNodes;