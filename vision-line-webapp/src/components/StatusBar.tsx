import { connect } from "react-redux";
import React from 'react';

class StatusBar extends React.Component<{id: string, setId: ()=>void}, {}> {
  componentDidMount() {
    this.props.setId();
  }

  render() {
    return <p>{this.props.id}</p>
  }
}

export default connect((state: any) => {return {id: state.image.id}}, 
  dispatch => {return {setId: () => dispatch({type: 'image/setId', id: -2})}})(StatusBar);