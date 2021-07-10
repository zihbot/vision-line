import React from "react";
import dataService from '../services/data.service';
import { LineNodeDef, FunctionDef } from '../types/api';


type LineNodesProps = {
  currentImage: number,
  onChange: () => void,
}
type LineNodesState = {
  nodes: LineNodeDef[],
  functions: FunctionDef[],
  working: boolean,
  selectedFunction?: FunctionDef,
}

class LineNodes extends React.Component<LineNodesProps, LineNodesState> {
  constructor(props: any) {
    super(props);
    this.state = {nodes: [], functions: [], working: false};
  }
  inputs: {[id: string]: string} = {}

  componentDidMount() {
    dataService.getFunctions().then(data => {
      const fs: FunctionDef[] = data.value;
      this.setState({ functions: fs, selectedFunction: fs && fs.length>0 ? fs[0] : undefined });
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
    if (!this.state.selectedFunction) {
      console.log('ERROR no selected function');
      return;
    }
    this.setState({ working: true });
    const inputs: {[k: string]: any} = {};
    this.state.selectedFunction.inputs.forEach(input => {
      const name = Object.keys(input)[0];
      inputs[name] = this.inputs[name] ?? '';
    });
    dataService.addNode(this.props.currentImage, this.state.functions.length, 
        {name: this.state.selectedFunction.name, inputs: inputs}).then(data => {
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
        <h3>Módosítók</h3>
        <ul className="list-group">
          {this.state.nodes.map((node, i) => 
            <li key={i} className="list-group-item">
              <span>{node.name}</span>
              <button className="btn btn-danger" disabled={this.state.working}
                onClick={() => this.deleteNode(i)} style={{float: "right"}}>Törlés</button>
            </li>)}
        </ul>
        <hr />
        <h3>Új hozzáadása</h3>
        <div className="input-group mt-2">
          <select id="selectedFunction" className="form-select" 
            onChange={e => this.setState({selectedFunction: this.state.functions[parseInt(e.target.value)]})}>
            {this.state.functions.map((func, i) => 
              <option value={i} style={{width: "auto"}}>{func.name}</option>
            )}
          </select>
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={() => this.addFunction()} 
              disabled={this.state.working} id="addButton">Add</button>
          </div>
        </div>
        {(this.state.selectedFunction?.inputs?.length ?? 0) > 0 && <form>
          { this.state.selectedFunction?.inputs.map(input => {
            const name = Object.keys(input)[0];
            return <div className="form-group row mt-2">
              <label htmlFor={name} className="col-form-label col-sm-4">{name}</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" id={name}
                  onChange={e => this.inputs[name] = e.target.value} />
              </div>
            </div>
          })}
        </form>}
			</div>
		);
  }
}

export default LineNodes;