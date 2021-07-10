import React from "react";
import dataService from '../services/data.service';
import { LineNodeDef } from "../types/api";


type LineNodesProps = {
  currentImage: number,
  onChange: () => void,
}
type LineNodesState = {
  nodes: LineNodeDef[],
  working: boolean,
}

class LineNodes extends React.Component<LineNodesProps, LineNodesState> {
  constructor(props: any) {
    super(props);
    this.state = {nodes: [], working: false};
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
    this.setState({ working: true });
    dataService.addNode(this.props.currentImage, 0, {name: 'greyscale'}).then(data => {
      this.load();
      this.props.onChange();
      this.setState({ working: false });
    }, err => {
      this.setState({ working: false });
      console.log('ERROR', err);
    });
  }

  deleteNode(position: number) {
    this.setState({ working: true });
    dataService.deleteNode(this.props.currentImage, position).then(data => {
      this.load();
      this.props.onChange();
      this.setState({ working: false });
    }, err => {
      this.setState({ working: false });
      console.log('ERROR', err);
    });
  }

  render() {
		return (
			<div>
        {this.props.currentImage}
        <ul className="list-group">
          {this.state.nodes.map((node, i) => 
            <li key={i} className="list-group-item">
              <span>{node.name}</span>
              <button className="btn btn-danger"
                disabled={this.state.working}
                onClick={() => this.deleteNode(i)}
                style={{float: "right"}}>Törlés</button>
            </li>)}
        </ul>
        <button className="btn btn-primary" 
          onClick={() => this.addGreyscale()}
          disabled={this.state.working}>Add Greyscale</button>
			</div>
		);
  }
}

export default LineNodes;