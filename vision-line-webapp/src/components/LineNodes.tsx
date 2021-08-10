import React, { DragEvent } from "react";
import dataService from '../services/data.service';
import { LineNodeDef, FunctionDef } from '../types/api';
import './LineNodes.scss';
import * as dataservice from '../services/data-service';


type LineNodesProps = {
  currentImage: number,
  onChange: () => void,
}
type LineNodesState = {
  nodes: {data: LineNodeDef, order: number, id: number}[]
  functions: FunctionDef[],
  working: boolean,
  selectedFunction?: FunctionDef,
  draggedNodeId?: number,
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

  componentDidUpdate(prevProps: LineNodesProps) {
    if (prevProps.currentImage !== this.props.currentImage) {
      this.reload();
    }
  }

  reload() {
    dataService.getLineNodes(this.props.currentImage).then(data => {
      this.setState({ nodes: data.value.map((n: any, i: number) => ({data: n, order: i, id: i})), draggedNodeId: undefined });
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

  handleDrop(e: DragEvent<HTMLLIElement>) {
    e.preventDefault();
    e.stopPropagation();
    const newOrder = this.state.nodes.map(n => n.id);
    if (newOrder.every((x, i) => x === i)) { this.resetOrder(); return; };
    
    this.setState({ working: true });
    dataService.createImageReorder(this.props.currentImage, newOrder).then(data => {
        this.reload();
        this.props.onChange();
        this.setState({ working: false });
      }, err => {
        this.resetOrder();
        console.log('ERROR', err);
      });
  }

  resetOrder() {
    // Set order to default
    this.setState({nodes: this.state.nodes.map(n => {n.order = n.id; return n;}), working: false, draggedNodeId: undefined });
  }

  handleDragOver(e: DragEvent<HTMLLIElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (!e.currentTarget.id.startsWith("VisionNode_")) return;
    const dropId = parseInt(e.currentTarget.id.split("_")[1]);

    if (dropId === this.state.draggedNodeId) return;
    const dragOrder = this.state.nodes.find(n => n.id === this.state.draggedNodeId)?.order ?? -1;
    const dropOrder = this.state.nodes.find(n => n.id === dropId)?.order ?? -1;

    const newNodes = this.state.nodes.map(node => {
      if (node.id === dropId) node.order = dragOrder;
      if (node.id === this.state.draggedNodeId) node.order = dropOrder;
      return node;
    });
    this.setState({nodes: newNodes});
  }

  render() {
		return (
			<div>
        <h3>Módosítók</h3>
        <ul className="list-group">
          {this.state.nodes.sort((a, b) => a.order - b.order).map((node, i) => 
            <li key={i} className={["list-group-item", this.state.draggedNodeId === node.id ? "dragging" : ""].join(' ')} 
              id={"VisionNode_"+node.id}
              style={{}}
              draggable="true"
              onDragStart={() => this.setState({draggedNodeId: node.id})}
              onDragEnd={e => {if (e.dataTransfer.dropEffect === 'none') this.resetOrder()}}
              onDragOver={e => this.handleDragOver(e)}
              onDrop={e => this.handleDrop(e)}>

              <span>{node.data.name}</span>
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
              <option value={i} key={i} style={{width: "auto"}}>{func.name}</option>
            )}
          </select>
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={() => this.addFunction()} 
              disabled={this.state.working} id="addButton">Hozzáadás</button>
          </div>
        </div>
        {(this.state.selectedFunction?.inputs?.length ?? 0) > 0 && <form>
          { this.state.selectedFunction?.inputs.map(input => {
            const name = Object.keys(input)[0];
            return <div key={name} className="form-group row mt-2">
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