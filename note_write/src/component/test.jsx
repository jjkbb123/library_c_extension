import React, { Component } from "react";
import moment from 'moment'
import 'moment/dist/locale/ar'
import { Button, DatePicker  } from 'antd'
import png from '../assets/8353.png';

export default class Test extends Component {

  render() {
    return <div>
        <Button type="primary">antd_button</Button>
        <DatePicker/>
        <Button>{moment(Date.now()).format('YYYY MMMM')}</Button>
        <img src={png} alt="" />
      </div>;
  }
}
