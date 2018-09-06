import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

import Hammer from 'hammerjs';
import { connect } from 'dva';
import { getDict,getDictVal } from './../../constants';

export class ScrappedCardSelect extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible:false,
    }
  }
  NameInfo(name){ 
    if(DataLength(name)>10){
      AlertInfoBase({
        text: name,
      });
    }   
  }
  turnMoney(data){
    return Number(data).formatMoney(2,'','')
  }
  render(){
    return (<div className="todo-card zoomIn specail-zhailei line-height-mini index-right mini-bottom-padding">
              <div className="todo-card-index">1/2</div>
              <div className="todo-card-c">
                <div className="todo-info">
                  <div className="todo-info-i">
                    <div className="todo-info-l" onClick={()=>this.NameInfo('xxxxxxxx')}>
                      <span className="todo-info-label ellipsis" >设备名称</span>
                      <span className="todo-info-val ellipsis">bbbbbbbbb</span>
                    </div>
                    <div className="todo-info-l">
                      <span className="todo-info-label ellipsis">序列号</span>
                      <span className="todo-info-val ellipsis">yyyyyyy</span>
                    </div>
                  </div>
                  <div className="todo-info-i">
                    <div className="todo-info-l">
                      <span className="todo-info-label ellipsis">FA Code</span>
                      <span className="todo-info-val">uuuuuuu</span>
                    </div>
                    <div className="todo-info-l">
                      <span className="todo-info-label ellipsis">FA Code2</span>
                      <span className="todo-info-val">xxxzxczxc</span>
                    </div>
                  </div>
                  <div className="todo-info-i">
                    <div className="todo-info-l">
                      <span className="todo-info-label ellipsis">操作建议</span>
                      <span className="todo-info-val">xxxzxczxc</span>
                    </div>
                    <div className="todo-info-l todo-fitting-num">
                      <span className="todo-info-label ellipsis">维修数量</span>
                      <span className="todo-info-val"><font className="eps-badge">xxxzxczxc</font></span>
                    </div>
                  </div>
                  <div className="todo-info-i">
                    <div className="todo-info-l" onClick={()=>this.NameInfo(devicedata.mark)}>
                      <span className="todo-info-label ellipsis"  >维修描述</span>
                      <span className="todo-info-val ellipsis">xxxzxczxc</span>
                    </div>
                  </div>
                </div>
                <div className="todo-info-btn border-line-h before">
                  <i className="icon-add-device-small-ds"></i>
                  <span>挑选资产</span>
                </div>
              </div>
            </div>)
  }
};

