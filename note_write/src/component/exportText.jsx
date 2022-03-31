import React, { Component } from "react";
import { Button } from "antd";

export default class ExportText extends Component {
  ExportText = () => {
    const noteWriteText = localStorage.getItem("note");
    const a = document.createElement("a");
    a.href = `data:text/plain;charset=utf-8,${encodeURIComponent(
      noteWriteText
    )}`;
    a.download = "note.txt";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  render() {
    return <Button onClick={this.ExportText}>ExportText</Button>;
  }
}
