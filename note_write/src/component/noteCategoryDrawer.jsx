import React, { Component } from "react";
import { Drawer, Select } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import { storageGet, storageSet } from "utils/storage";

const { Option } = Select;
export default class NoteCategoryDrawer extends Component {
  state = {
    selectValue: "",
    currentSelectKey: ''
  };

  componentDidMount() {
    this.setSelectInitValue();
  }

  setSelectInitValue = () => {
    const note = JSON.parse(storageGet('note') || "[]");
    this.setState({
      selectValue: note.find(item => !!item.visible)?.title,
    });
  };

  selectNoteCategory = (title) => {
    this.props.selectCategory(title);
    this.setState({
      selectValue: title,
    });
  };

  enterCurrentSelectKey = (currentSelectKey) => {
    this.setState({
      currentSelectKey
    })
  }

  deleteSelectCategory = (e, key) => {
    e.stopPropagation();
    const note = JSON.parse(storageGet('note') || "[]");
    note.forEach(item => item.title == key ? item.visible = !item.visible : null)
    storageSet('note', JSON.stringify(note))
    this.props.selectCategory(note.find(item => item.visible)?.title);
    this.setSelectInitValue()
  }

  render() {
    // 
    const { visible } = this.props;
    const { selectValue, currentSelectKey } = this.state;
    const note = JSON.parse(localStorage.getItem("note") || "[]");
    return (
      <Drawer
        title="选择文章篇目"
        visible={visible}
        onClose={this.props.openNoteCategoryDrawer}
        destroyOnClose
      >
        <Select
          onChange={this.selectNoteCategory}
          style={{ width: "100%" }}
          value={selectValue}
        >
          {note?.map((item) => (
            item.visible && <Option value={item.title} key={item.title}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={() => this.enterCurrentSelectKey(item.title)}
                onMouseLeave={() => this.setState({ currentSelectKey: '' })}
              >
                <span>{item.title}</span>
                {currentSelectKey === item.title && <span onClick={(e) => this.deleteSelectCategory(e, item.title)} ><CloseOutlined /></span>}
              </div>
            </Option>
          ))}
        </Select>
      </Drawer>
    );
  }
}
