import React from "react";
import dataService from '../services/data.service';
import { LineNodeDef } from "../types/api";


type LineNodesProps = {
  currentImage: number,
  onChange: () => void,
}
type LineNodesState = {
  nodes: LineNodeDef[],
  functions: string[],
  working: boolean,
}

class LineNodes extends React.Component<LineNodesProps, LineNodesState> {
  constructor(props: any) {
    super(props);
    this.state = {nodes: [], functions: [], working: false};
  }

  selectedFunction?: string;

  componentDidMount() {
    dataService.getFunctions().then(data => {
      const fs: string[] = data.value;
      this.setState({ functions: fs });
      if (fs && fs.length>0) this.selectedFunction = fs[0];
    }, err => {
      console.log('ERROR', err);
    });
    this.reload();
  }

  reload() {
    dataService.getLineNodes(this.props.currentImage).then(data => {
      this.setState({ nodes: data.value });
    }, err => {
      console.log('ERROR', err);
    });
  }

  addFunction() {
    if (!this.selectedFunction) {
      console.log('ERROR no selected function');
      return;
    }
    this.setState({ working: true });
    dataService.addNode(this.props.currentImage, this.state.functions.length, {name: this.selectedFunction}).then(data => {
      this.reload();
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
      this.reload();
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
              <button className="btn btn-danger" disabled={this.state.working}
                onClick={() => this.deleteNode(i)} style={{float: "right"}}>Törlés</button>
            </li>)}
        </ul>
        <div className="input-group mt-2">
          <select id="selectedFunction" className="form-select" 
            onChange={e => this.selectedFunction = e.target.value}>
            {this.state.functions.map(func => 
              <option value={func} style={{width: "auto"}}>{func}</option>
            )}
          </select>
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={() => this.addFunction()} 
              disabled={this.state.working} id="addButton">Add</button>
          </div>
        </div>
			</div>
		);
  }
}

export default LineNodes;