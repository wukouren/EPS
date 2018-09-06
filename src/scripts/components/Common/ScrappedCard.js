import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

import Hammer from 'hammerjs';
import { connect } from 'dva';
import { getDict,getDictVal } from './../../constants';

export class ScrappedCardNormal extends Component{
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
    let data = this.props.itemdata;
    let deleteBtn = '';
    if(this.props.deleteBtnShow == true){
      deleteBtn = (<div className="eps-swipe-delete" ref="delBtn" onClick={ (e)=>this.deleteItem(e) }><div className="eps-swipe-wrap"><font>删除</font></div></div>);
    }
    console.log(this.props,'这个里面的数据是什么呢');
    return (
        <div className="eps-device-card-select eps-project-card" ref="cardwrap">
          { deleteBtn }
          <div className="todo-card zoomIn specail-zhailei line-height-mini index-right clear-margin clear-padding" ref="card">
              <div className="">
                <div className="todo-card-index">{this.props.index}</div>
                <div className="todo-card-c">
                  <div className="todo-info">
                    <div className="todo-info-i specail">
                      <div className="todo-info-l" onClick={()=>this.NameInfo(data["deviceName"])}>
                        <span className="todo-info-label ellipsis" >{this.props.scrappOrderType == 'project'?'工程名称':'设备名称'}</span>
                        <span className="todo-info-val ellipsis">{data["deviceName"]}</span>
                      </div>
                    </div>
                    <div className="todo-info-i">
                      <div className="todo-info-l" onClick={()=>this.NameInfo(data["deviceNumber"] || '-')}>
                        <span className="todo-info-label ellipsis" >{this.props.scrappOrderType == 'project'?'工程序列号':'设备序列号'}</span>
                        <span className="todo-info-val ellipsis">{data["deviceNumber"] || '-'}</span>
                      </div>
                      <div className="todo-info-r">
                        <span className="todo-info-label ellipsis">餐厅/仓库编号</span>
                        <span className="todo-info-val ellipsis">{data["usCode"] || '-'}</span>
                      </div>
                    </div>
                    <div className="todo-info-i">
                      <div className="todo-info-l">
                        <span className="todo-info-label ellipsis">资产Category</span>
                        <span className="todo-info-val">{data["assetCategory"] || '-'}</span>
                      </div>
                      <div className="todo-info-r">
                        <span className="todo-info-label ellipsis">资产数量</span>
                        <span className="todo-info-val"><font className="eps-badge">{data["assetQty"] || '-'}</font></span>
                      </div>
                    </div>
                    <div className="todo-info-i">
                      <div className="todo-info-l">
                        <span className="todo-info-label ellipsis">资产编号</span>
                        <span className="todo-info-val">{data["assetNumber"] || '-'}</span>
                      </div>
                      <div className="todo-info-r todo-fitting-num">
                        <span className="todo-info-label ellipsis">资产摘要</span>
                        <span className="todo-info-val">{data["assetDesc"] || '-'}</span>
                      </div>
                    </div>
                    <div className="todo-info-i">
                      <div className="todo-info-l">
                        <span className="todo-info-label ellipsis">资产原值(¥)</span>
                        <span className="todo-info-val">{(data["assetOriginal"]?this.turnMoney(data["assetOriginal"]):'-')}</span>
                      </div>
                      <div className="todo-info-r todo-fitting-num">
                        <span className="todo-info-label ellipsis">累计折旧(¥)</span>
                        <span className="todo-info-val">{(data["assetDep"]?this.turnMoney(data["assetDep"]):'-')}</span>
                      </div>
                    </div>
                    <div className="todo-info-i">
                      <div className="todo-info-l">
                        <span className="todo-info-label ellipsis">折旧率</span>
                        <span className="todo-info-val">{(data["depRate"]?parseInt(data["depRate"]*100)+'%':'-')}</span>
                      </div>
                      <div className="todo-info-r todo-fitting-num">
                        <span className="todo-info-label ellipsis">折旧时间</span>
                        <span className="todo-info-val">{(data['depStartDay']!='0'?data['depStartDay']:'-')}</span>
                      </div>
                    </div>
                    <div className="todo-info-i">
                      <div className="todo-info-l">
                        <span className="todo-info-label ellipsis">报废原值(¥) </span>
                        <span className="todo-info-val">{this.turnMoney(data.scrapOriginal)}</span>
                      </div>
                      <div className="todo-info-r todo-fitting-num">
                        <span className="todo-info-label ellipsis">报废净值(¥)</span>
                        <span className="todo-info-val">{this.turnMoney(data.scrapNbv)}</span>
                      </div>
                    </div>
                    <div className="todo-info-i custom-item">
                      <div className="todo-info-l clear-height" style={{
                        width:"55%"
                      }}>
                      <span className="todo-info-label ellipsis" style={{
                        width:'55%'
                      }}>资产报废百分比</span>
                        {
                          this.props.edit?
                          <span className="todo-info-val has-border" style={{
                            width:'35%'
                          }}>
                            <div className="todo-info-has-after">
                            <input type="text" className="todo-info-input" value={data.scrapProportion} onChange={(e) => this.changeItem(e,'scrapProportion')}/>
                            </div>
                          </span>: 
                          <span className="todo-info-val" style={{
                            width:'35%'
                          }}>{data.scrapProportion || '-'}%</span>
                        }
                      </div>
                      <div className="todo-info-r clear-height">
                        <span className="todo-info-label ellipsis">报废数量</span>
                        {
                          this.props.edit ?
                          <span className="todo-info-val has-border">
                          <input type="text" className="todo-info-input" value={data.scrapQty} onChange={(e) => this.changeItem(e,'scrapQty')}/>
                          </span> : 
                          <span className="todo-info-val">{data.scrapQty || '-'}</span>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )
  }
  deleteItem(){
    if(confirm("是否确认删除该条记录？")){
      $(ReactDOM.findDOMNode(this.refs.card)).animate({left: 0},'100');
      if(typeof(this.props.removeItem) == 'function'){
        this.props.removeItem(this.props.itemdata);
      }
      console.log("点击了确认按钮");
    }
    else{
      $(ReactDOM.findDOMNode(this.refs.card)).animate({left: 0},'100');
      console.log("点击了取消按钮");
    }
  }
  componentDidMount(){
    let height = $(ReactDOM.findDOMNode(this.refs.cardwrap)).height();
    $(ReactDOM.findDOMNode(this.refs.cardwrap)).find('.eps-swipe-wrap').css({
      'margin-top':'0',
      // 'line-height':(height-20)+'px'
    })

    if(this.props.deleteBtnShow != true) return;
    // 显示删除按钮时才绑定hammer事件
    let hammertime = new Hammer(ReactDOM.findDOMNode(this.refs.card));
    let card = $(ReactDOM.findDOMNode(this.refs.card));
    let delBtn = ReactDOM.findDOMNode(this.refs.delBtn);
    let btnWidth = $(delBtn).width();
    let cardLeft;
    let isMinus; // 是否负数  true 负数  false 正数
    let cardStartLeft;
    hammertime.on( "panstart", (e)=>{
      cardStartLeft = card.offset().left;
    })
    // hammertime.on( "pan", (e)=>{
    //  isMinus = Math.abs(e.deltaX)==e.deltaX ? false : true;
    //  cardLeft = (cardStartLeft+e.deltaX) < (-btnWidth) ? (-btnWidth) :  (cardStartLeft+e.deltaX);
    //  cardLeft = cardLeft > 0 ? 0 : cardLeft;
    //  card.css({left:cardLeft});
    //  console.log(e.deltaX,btnWidth);
    // })
    hammertime.on('panleft',(e)=>{
      card.stop().animate({left:-btnWidth+'px'},200);
    })
    hammertime.on('panright',(e)=>{
      card.stop().animate({left:'0px'},200);
    })
  }
  changeItem(e,type){
    // console.log(e.target.value,type,'哈哈哈是的哈稍等哈师大还是');
    this.props.changeItem(e,type)
  }
};


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
  selectHandler(){
    let willbe = !this.props.itemdata.checked;
    typeof(this.props.selectHandler)=='function' ? this.props.selectHandler(this.props.itemdata['id'],{ checked: willbe }) : '';
  }
  render(){
    let data = this.props.itemdata;
    console.log('这个里面有啥',this.props,'bbbbbbbbbbbb')
    return (
        <div className="eps-device-card-select eps-project-card" ref="cardwrap" onClick={(e)=>this.selectHandler(e)}>
          <div className="todo-card zoomIn specail-zhailei line-height-mini index-right mini-bottom-padding mini-top-padding clear-margin clear-padding" ref="card">
            <div className="">
                <div className="todo-card-c">
                  <div className="todo-info">
                    <div className="todo-info-i specail">
                      <div className="todo-info-l" onClick={()=>this.NameInfo(data["usCode"])}>
                        <span className="todo-info-label ellipsis" >餐厅/仓库编号</span>
                        <span className="todo-info-val ellipsis">{data["usCode"]}</span>
                      </div>
                    </div>
                    <div className="todo-info-i">
                      <div className="todo-info-l" onClick={()=>this.NameInfo(data["assetNumber"])}>
                        <span className="todo-info-label ellipsis" >{this.props.scrappOrderType == 'project'?'工程序列号':'设备序列号'}</span>
                        <span className="todo-info-val ellipsis">{data["assetNumber"]}</span>
                      </div>
                      <div className="todo-info-r">
                        <span className="todo-info-label ellipsis">资产Category</span>
                        <span className="todo-info-val ellipsis">{data["assetCategory"]}</span>
                      </div>
                    </div>
                    <div className="todo-info-i">
                      <div className="todo-info-l">
                        <span className="todo-info-label ellipsis">资产编号</span>
                        <span className="todo-info-val">{data["assetNumber"]}</span>
                      </div>
                      <div className="todo-info-r">
                        <span className="todo-info-label ellipsis">资产摘要</span>
                        <span className="todo-info-val">{data["assetDesc"]}</span>
                      </div>
                    </div>
                    <div className="todo-info-i">
                      <div className="todo-info-l">
                        <span className="todo-info-label ellipsis">资产原值(¥)</span>
                        <span className="todo-info-val">{data["assetOriginal"]}</span>
                      </div>
                      <div className="todo-info-r todo-fitting-num">
                        <span className="todo-info-label ellipsis">资产净值(¥)</span>
                        <span className="todo-info-val">{data["assetNbv"]}</span>
                      </div>
                    </div>
                    <div className="todo-info-i">
                      <div className="todo-info-l">
                        <span className="todo-info-label ellipsis">累计折旧(¥)</span>
                        <span className="todo-info-val">{data["assetDep"]}</span>
                      </div>
                      <div className="todo-info-r todo-fitting-num ">
                        <span className="todo-info-label ellipsis">折旧时间</span>
                        <span className="todo-info-val">{(data['depStartDay']!='0'?data['depStartDay']:'-')}</span>
                      </div>
                    </div>
                    <div className="todo-info-i">
                      <div className="todo-info-l">
                        <span className="todo-info-label ellipsis">资产数量</span>
                        <span className="todo-info-val"><font className="eps-badge">{data["assetQty"]}</font></span>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="checked-btn-wrap"><i className={ this.props.itemdata.checked==true ? "icon-check-active" : "icon-check-normal"}></i></div>
        </div>
      )
  }
};


export class ScrappedCardSearchCheck extends Component{
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
    let data = this.props.itemdata;
    let str_operate = data['operate']?getDictVal('fittingOperation',data['operate']):' - ';
    let name = '',number = '',facode = '',subcategory = '',num = '',mark = '';
    console.log(this.props,'这个数据有什么呢');
    if(this.props.scrappType == 'repair'){
      if(this.props.scrappOrderType == 'device'){
        name  = data['deviceName'];
        number = data['deviceNumber']
        facode = data['faCategory'];
        subcategory = data['subCategory'];
        num = ''
        mark = data['mark'];
      }else if(this.props.scrappOrderType == 'it'){
        name  = data['itDeviceName'];
        number = data['itDeviceNumber']
        facode = data['faCategory'];
        subcategory = data['subCategory'];
        num = data['maintenanceNum'];
        mark = data['maintenanceRemarks']
      }else{
        name  = data['deviceName'];
        number = data['deviceNumber']
        facode = data['faCategory'];
        subcategory = data['subCategory'];
        num = '';
        mark = data['mark']
      }
    }else{
      name  = data['deviceName'];
      number = data['deviceNumber']
      facode = data['faCode'];
      subcategory = data['faCode2'];
      num = data['buySum']
      mark = data['mark'];
    }
    return (<div className="todo-card zoomIn specail-zhailei line-height-mini index-right mini-bottom-padding"  onClick={(e)=>this.props.choseScrappedDevice(e)}>
              <div className="todo-card-index">{this.props.index}</div>
              <div className="todo-card-c">
                <div className="todo-info">
                  <div className="todo-info-i">
                    <div className="todo-info-l">
                      <span className="todo-info-label ellipsis" >{this.props.scrappOrderType == 'project'?'工程名称':'设备名称'}</span>
                      <span className="todo-info-val ellipsis">{name || '-'}</span>
                    </div>
                    <div className={"todo-info-r "+(this.props.scrappOrderType == 'project')?'hide':''}>
                      <span className="todo-info-label ellipsis">序列号</span>
                      <span className="todo-info-val ellipsis">{number || '-'}</span>
                    </div>
                  </div>
                  <div className="todo-info-i">
                    <div className="todo-info-l">
                      <span className="todo-info-label ellipsis">FA Code</span>
                      <span className="todo-info-val">{facode || '-'}</span>
                    </div>
                    <div className="todo-info-r">
                      <span className="todo-info-label ellipsis">FA Code2</span>
                      <span className="todo-info-val">{subcategory || '-'}</span>
                    </div>
                  </div>
                  <div className="todo-info-i">
                    <div className="todo-info-l">
                      <span className="todo-info-label ellipsis">操作建议</span>
                      <span className="todo-info-val">{str_operate}</span>
                    </div>
                    <div className="todo-info-r todo-fitting-num hide">
                      <span className="todo-info-label ellipsis">维修数量</span>
                      <span className="todo-info-val"><font className="eps-badge">{num}</font></span>
                    </div>
                  </div>
                  <div className={"todo-info-i "+(mark?'':'hide')}>
                    <div className="todo-info-l">
                      <span className="todo-info-label ellipsis">维修描述</span>
                      <span className="todo-info-val ellipsis">{mark || '-'}</span>
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
  componentDidMount(){
    let self = this;
    let dispatch = this.props.dispatch;
    NProgress.done();
    this.setHeight();
  }
  componentDidUpdate(){
    let self = this;
    this.setHeight()
  }
  setHeight(){
    let self = this;
    setTimeout(function(){
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      let header = $('.header').height() ||0;
      let footer = $(".footer").height()||0
      $('.main-c').css({height:clientHeight-header-footer+'px'});
    },0)
  }
};

