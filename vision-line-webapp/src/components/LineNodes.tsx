import React from "react";
import dataService from '../services/data.service';
import { LineNodeDef } from "../types/api";


type LineNodesProps = {
  currentImage: number,
  onChange: () => void,
}
type LineNodesState = {nodes: LineNodeDef[]}

class LineNodes extends React.Component<LineNodesProps, LineNodesState> {
  constructor(props: any) {
    super(props);
    this.state = {nodes: []};
  }

  componentDidMount() {
    this.load();
  }

  load() {
    dataService.getLineNodes(this.props.currentImage).then(data => {
      this.setState({ nodes: data.value });
    }, err => {
      console.log('ERROR', err);
    });
  }

  addGreyscale() {
    dataService.addNode(this.props.currentImage, 0, {name: 'greyscale'}).then(data => {
      this.load();
      this.props.onChange();
    }, err => {
      console.log('ERROR', err);
    });
  }

  render() {
		return (
			<div>
        {this.props.currentImage}
        <ul>
          {this.state.nodes.map((node, i) => 
            <li key={i}>{node.name}</li>)}
        </ul>
        <button className="btn btn-primary" onClick={() => this.addGreyscale()}>Add Greyscale</button>
			</div>
		);
  }
}

export default LineNodes;