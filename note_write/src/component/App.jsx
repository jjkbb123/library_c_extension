import React, { Component } from "react";
import './index.less';
import {  Row, Col, Modal, Button } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

export default class App extends Component {
  state = {
    keyCode: [],
    noteVisble: false,
    editorState: BraftEditor.createEditorState(null),
    note: [],
    currentKey: 0
  }

  writeNoteRef = React.createRef();
  
  componentDidMount() {
    this.hundleDocumentAddEventListener();
    this.renderNote();
  }

  ExportText = () => {
    const noteWriteText = localStorage.getItem('note');
    const a = document.createElement('a')
    a.href = `data:text/plain;charset=utf-8,${encodeURIComponent(noteWriteText)}`
    a.download = "note.txt";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // utils
  renderNote = () => {
    const note = JSON.parse(localStorage.getItem('note') || '[]');
    this.setState({
      note
    })
  }

  deleteCurrntNoteContent = (key) => {
    const note = JSON.parse(localStorage.getItem('note') || '[]');
    const filterNote = note.filter(item => item.key !== key)
    localStorage.setItem('note', JSON.stringify(filterNote));
    this.setState({
      note: filterNote
    })
  }

  hundleDocumentAddEventListener = () => {
    document.body.addEventListener('keyup', this.writeNote)
    document.body.addEventListener('keydown', this.writeNote)
  }

  submitContent = () => {
    const { noteVisble } = this.state;
    const htmlContent = this.state.editorState.toHTML();
    const note = JSON.parse(localStorage.getItem('note') || '[]');
    note.push({
      noteContent: htmlContent,
      key: Date.now(),
    });
    this.setState({ note })
    localStorage.setItem('note', JSON.stringify(note));
    this.setState({
      noteVisble: !noteVisble,
    })
  }

  hundleModal = (type) => {
    const { noteVisble } = this.state;
    this.setState({
      noteVisble: !noteVisble,
    })
    if(noteVisble && type === 'ok') {
      this.submitContent();
    }
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  writeNote = (e) => {
    const { key, type } = e;
    const { keyCode } = this.state;
    keyCode.push(key)
    if(type === 'keydown') {
      if(/alt/i.test(keyCode[0]) && /w/i.test(keyCode[1])) {
        this.setState({
          noteVisble: true
        })
      }
    } else {
      this.setState({
        keyCode: []
      })
    }
  }

  render() {
    const { noteVisble, editorState, note, currentKey } = this.state;
    return (
      <div className="app">
        <div style={{ position: 'fixed', width: 'inherit', marginLeft: -16, textAlign: 'center' }}>
          <Button onClick={this.ExportText}>ExportText</Button>
        </div>
        <Modal
          visible={noteVisble}
          onOk={() => this.hundleModal('ok')}
          onCancel={this.hundleModal}
        >
          <BraftEditor
              value={editorState}
              onChange={this.handleEditorChange}
              onSave={this.submitContent}
              ref={ref => this.writeNoteRef = ref}
          />
        </Modal>
        <div style={{ marginTop: 70 }}>
          {
            note.map(item => (
              <div
                onMouseEnter={() => this.setState({ currentKey: item.key })}
                onMouseLeave={() => this.setState({ currentKey: 0 })}
                key={item.key}
              >
                <Row>
                  <Col span={20}>
                    <div dangerouslySetInnerHTML={{ __html: item?.noteContent }} style={{ wordBreak: 'break-all' }}></div>
                  </Col>
                  <Col span={4}>
                    {currentKey === item.key ? <Button danger onClick={() => this.deleteCurrntNoteContent(item.key)}>删除</Button> : ''}
                  </Col>
                </Row>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
