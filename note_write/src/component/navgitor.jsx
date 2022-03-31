import React, { Component, createRef } from "react";
import "./index.less";
import { BarsOutlined } from "@ant-design/icons";

export default class App extends Component {
  state = {
    navgitorPageX: 0,
  };

  navgitorRef = createRef();

  componentDidMount() {
    this.navgitorRef?.current
      ? (this.navgitorRef.current.onwheel = this.scrollNavgitorList)
      : null;
  }

  scrollCurrentNavPageCoordinate = (queryContentValue) => {
    const { appRef } = this.props;
    const h3DomList = document.querySelectorAll('h3');
    let index = 0;
    let scrollHeight = 0;
    let isSameParentDomArr = [];
    const arr = [];
    const currentContentDomNote = [...h3DomList].find(item => { index++ ;return item.innerText === queryContentValue; });
    [...h3DomList].slice(0, index)?.forEach(item => {
      if(isSameParentDomArr.find(citem => item.parentNode === citem.parentNode)) {
        isSameParentDomArr.push(item)
      } else {
        isSameParentDomArr = [];
        isSameParentDomArr.push(item)
        arr.push(isSameParentDomArr)
      }
    })
    arr.forEach((item, i) => {
      i++;
      if(i === arr.length) {
        if(item.length > 1) {
          item.forEach(citem => scrollHeight += citem.offsetTop)
        }
      }
      else scrollHeight += item[0].parentNode.offsetHeight
    })
    appRef.current.scrollTo(0, scrollHeight)
  }

  scrollNavgitorList = (e) => {
    e.preventDefault();
    let { navgitorPageX } = this.state;
    const { deltaY } = e;
    const navgitorRefOffsetWidth = this.navgitorRef?.current?.offsetWidth;
    const navgitorRefParentOffsetWidth =
      this.navgitorRef?.current?.offsetParent?.offsetWidth;
    const diffrenceOffsetWidth =
      navgitorRefOffsetWidth - navgitorRefParentOffsetWidth;
    this.setState(
      {
        navgitorPageX: navgitorPageX < 0 ? 0 : (navgitorPageX += deltaY / 10),
      },
      () => {
        if (navgitorPageX * 3 > diffrenceOffsetWidth) {
          this.setState({
            navgitorPageX: diffrenceOffsetWidth / 3,
          });
        }
      }
    );
  };

  render() {
    const { navigatorVisble, noteNavigatorList } = this.props;
    const { navgitorPageX } = this.state;
    return (
      <>
        <div
          style={{
            position: "sticky",
            bottom: 0,
            zIndex: 1,
            width: "100%",
            height: 55,
            overflow: "hidden",
          }}
        >
          <div style={{
              transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s",
              transform: `translate(-${!navigatorVisble ? 368 : 0}px, 0)`,
              background: '#fff'
          }}>
          <div
            style={{
              display: "flex",
              overflowX: "scroll",
              lineHeight: "55px",
              width: "fit-content",
              transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s",
              transform: `translate(-${navgitorPageX * 3}px, 0)`,
            }}
            ref={this.navgitorRef}
          >
            {noteNavigatorList.map((item) => {
              return (
                <a
                  key={item}
                  style={{
                    display: "block",
                    whiteSpace: "nowrap",
                    margin: "0 6px",
                  }}
                  onClick={() => this.scrollCurrentNavPageCoordinate(item)}
                >
                  {item}
                </a>
              );
            })}
          </div>
          </div>
        </div>
        <span
          style={{
            position: "fixed",
              transition: "all 0.2s cubic-bezier(0, 0.58, 0.05, 1.15)",
              right: navigatorVisble ? -30 : 0,
            bottom: 0,
            zIndex: 1,
            fontSize: 25,
          }}
        >
          <BarsOutlined />
        </span>
      </>
    );
  }
}
