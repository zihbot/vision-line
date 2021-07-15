import React from "react";
import dataService from '../services/data.service';

type ImageSelectorProps = {
  onImageSelect: (selectedImage: number) => void,
}
type ImageSelectorState = {
  lines: number[],
  current?: number,
}

class ImageSelector extends React.Component<ImageSelectorProps, ImageSelectorState> {
  constructor(props: any) {
    super(props);
    this.state = {lines: []};
  }

  componentDidMount() {
    this.loadImages();
  }

  addImage() {
    dataService.createImage().then(data => {
      this.selectImage(parseInt(data.value));
    }, err => {
      console.log('ERROR', err);
    });
  }

  selectImage(n: number) {
    this.props.onImageSelect(n);
    this.setState({current: n});
    this.loadImages();
  }

  loadImages() {
    dataService.getAllLines().then(data => {
      this.setState({lines: data.value});
    }, err => {
      console.log('ERROR', err);
    });
  }

  render() {
    return <div className="row">
      <div className="col-2">
        <button className="btn btn-primary" onClick={() => this.addImage()}>Új kép</button>
      </div>
      <div className="col-10">
        <ul className="pagination">
          {this.state.lines.reverse().map((val, i) => {
            const n = this.state.lines.length - i;
            return <li key={n} className={["page-item", this.state.current===n-1 ? "active" : ""].join(" ")} >
              <div className="page-link" onClick={()=>this.selectImage(n-1)}>
              {n}
              {this.state.current !== n-1 && <span> ({val})</span>}
            </div></li>
          })}
        </ul>
      </div>
    </div>
  }
}

export default ImageSelector;