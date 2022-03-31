import React, { Component } from "react";
import { Drawer, Select } from "antd";

const { Option } = Select;
export default class NoteCategoryDrawer extends Component {
  state = {
    selectValue: "",
  };

  componentDidMount() {
    this.setSelectInitValue();
  }

  setSelectInitValue = () => {
    const note = JSON.parse(localStorage.getItem("note") || "[]");
    this.setState({
      selectValue: note[0].title,
    });
  };

  selectNoteCategory = (title) => {
    this.props.selectCategory(title);
    this.setState({
      selectValue: title,
    });
  };

  render() {
    // 
    const { visible } = this.props;
    const { selectValue } = this.state;
    const note = JSON.parse(localStorage.getItem("note") || "[]");
    return (
      <Drawer
        title="选择文章篇目"
        visible={visible}
        onClose={this.props.openNoteCategoryDrawer}
      >
        <Select
          onChange={this.selectNoteCategory}
          style={{ width: "100%" }}
          value={selectValue}
        >
          {note?.map((item) => (
            <Option value={item.title} key={item.title}>{item.title}</Option>
          ))}
        </Select>
      </Drawer>
    );
  }
}
