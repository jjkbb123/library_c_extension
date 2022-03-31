import React, { Component } from "react";
import { Button } from "antd";

export default class NoteCategory extends Component {

  render() {
    return <Button onClick={this.props.openNoteCategoryDrawer}>NoteCategory</Button> 
  }
}
