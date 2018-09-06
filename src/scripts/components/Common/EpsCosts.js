/**
 * 费用明细
 */
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, List, Button } from 'jw-components-mobile';
import { connect } from 'dva';
import Popup from 'antd-mobile/lib/popup';
require('antd-mobile/lib/popup/style/index.css');

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let maskProps;
if (isIPhone) {
  maskProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class EpsCostsDlg extends Component{
  state = {
    sel: '',
  };
  onClose = (sel) => {
    this.setState({ sel });
    Popup.hide();
  }
  render(){
    return (<div className="eps-popup-c">
      <div className='eps-popup-header'>
        <div className="eps-dialog-title" onClick={() => this.onClose('cancel')}>
          <div className="eps-dialog-title-c"><h3>{this.props.title}</h3></div>
          <div className="icon-close-b"></div>
        </div>
      </div>
      <div className="eps-popup-list">
        <div className="eps-popup-list-item-c">{this.props.body}</div>
      </div>
    </div>)
  }
};

export const EpsCosts = (props)=>{
  console.log('Marlin EpsCosts',props)
  Popup.show(<EpsCostsDlg { ...props }/>, { animationType: 'slide-up', maskProps, maskClosable: false })
}
