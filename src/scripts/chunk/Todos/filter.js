/**
 * 搜索订单页面
 */
 
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import TodosType from './../../components/Common/TodosType';
import { List, InputItem, Picker, DatePicker } from 'jw-components-mobile';

const eid = userinfo.employee_id;

class Filter extends Component {
  // 组件加载完毕
  componentDidMount(){
    let self = this;
    NProgress.done();
    if(isAndroid()){
      $( window ).resize(function() {
        self.setHeight();
      });
    }
    self.setHeight();
  }
  getFlowTypes(){
    return [
      {labe:'请选择',value:'-1'},
      {label:"设备维修",value:"11"},
      {label:"工程维修",value:"12"},
      {label:"IT设备维修",value:"13"},
      {label:"设备年度保养计划",value:"21"},
      {label:"设备月度保养计划",value:"22"},
      {label:"设备保养订单",value:"23"},
      {label:"工程年度保养计划",value:"24"},
      {label:"工程月度保养计划",value:"25"},
      {label:"工程保养订单",value:"26"},
      {label:"非项目设备采购需求",value:"31"},
      {label:"非项目工程采购需求",value:"35"},
      {label:"非项目IT采购需求",value:"36"},
      {label:"非项目设备采购",value:"32"},
      {label:"非项目工程采购",value:"33"},
      {label:"非项目IT采购",value:"34"},
      {label:"项目采购需求",value:"41"},
      {label:"项目型供应商采购订单",value:"42"},
      {label:"项目型采购订单",value:"43"},
      {label:"新店/改造设备/工程订单",value:"51"},
      {label:"新店/改造IT供应商订单",value:"54"},
      {label:"新店/改造IT餐厅订单",value:"55"},
      {label:"新店/改造IT采购需求",value:"53"},
      {label:"新店/改造IT采购订单",value:"56"},
      {label:"新店/改造GC采购",value:"61"},
      {label:"主数据",value:"71"}
    ];
  }
  // 获取当前过滤器
  componentWillMount(){
    // console.log("Marlin componentWillMount: Default prop time!"); return {};
    let dispatch=this.props.dispatch;
    PubSub.subscribe('todos:responseFilterCondition',function(evt,todos){
      dispatch({
        type:'todos/changeData',
        payload:{
          filter: todos.filter
        }
      })
    });
    window.upTabsData('todos:getFilterCondition','publish',{});
  }
  render(){
    let todosFilter = this.props.todos.filter,
        flowTypes = this.getFlowTypes();
    // console.log('Marlin x1',todosFilter,flowTypes)
    return (<div className="root-container-w root-container-filter-w">
      <sesstion className="main main-filter">
        <div className="filter-c">
          <div className="filter-item">
            <i className="icon-search"></i>
            <InputItem className="jw-inline" placeholder="请输入餐厅编号或订单编号" value={todosFilter.number} onChange={(e)=>this.onNumberChange(e)}></InputItem>
          </div>
          <div className="filter-item">
            <Picker data={flowTypes} cols={1} value={todosFilter.flowtype} onChange={v => this.onFlowChange(v)}>
              <List.Item arrow="horizontal">流程类型</List.Item>
            </Picker>
          </div>
          <div className="">
            <label>创建时间</label>
          </div>
          <div className="filter-date-c">
            <DatePicker mode="date" value={_.isNull(todosFilter.startDate)?'':moment(todosFilter.startDate)} onChange={(e)=>this.onDateChange(e,'startDate')}>
              <List.Item></List.Item>
            </DatePicker>
            <span>-</span>
            <DatePicker mode="date" value={_.isNull(todosFilter.endDate)?'':moment(todosFilter.endDate)} onChange={(e)=>this.onDateChange(e,'endDate')}>
              <List.Item></List.Item>
            </DatePicker>
          </div>
          <div className="">
            <label>订单金额(¥)</label>
          </div>
          <div className="filter-date-c filter-money-c">
            <div>
              <InputItem className="jw-inline" type="number" placeholder="请输入" value={todosFilter.moneyFrom} 
                onChange={(e)=>this.onMoneyChange(e, 'moneyFrom')}
                onBlur={(e)=>this.onMoneyBlur(e, 'moneyFrom')}></InputItem>
            </div>
            <span>-</span>
            <div>
              <InputItem className="jw-inline" type="number" placeholder="请输入" value={todosFilter.moneyTo} 
                onChange={(e)=>this.onMoneyChange(e, 'moneyTo')}
                onBlur={(e)=>this.onMoneyBlur(e, 'moneyTo')}></InputItem>
            </div>
          </div>
        </div>
      </sesstion>
      <div className="eps-footer">
        <div className="eps-btn-wrap">
          <div className="eps-btn eps-btn-default-small" onClick={(e)=>this.cancelFilter(e)}>取消全部选择</div>
          <div className="eps-btn eps-btn-warning-large" onClick={(e)=>this.startFilter(e)}>确认</div>
        </div>
      </div>
    </div>)
  }
  setHeight(){
    let self = this;
    setTimeout(function(){
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      let filterHeight = $('.filter-c').height() || 0;
      $('.root-container-w').css({height:clientHeight+'px'});
    },0)
  }
  onMoneyChange(e, type){
    const str = e.trim()
    let dispatch = this.props.dispatch,
      todosFilter = this.props.todos.filter;
    todosFilter[type] = str;
    dispatch({
      type:'todos/changeData',
      payload:{
        filter:todosFilter,
        fetchAction:false
      }
    })
  }
  onMoneyBlur(e, type){
    const str = e.trim()
    let dispatch = this.props.dispatch,
      todosFilter = this.props.todos.filter;
    todosFilter[type] = str;
    if(type=='moneyFrom' && (todosFilter['moneyTo'] != '' && parseInt(todosFilter['moneyTo']) < parseInt(todosFilter['moneyFrom']))){
      todosFilter['moneyTo'] = parseInt(todosFilter['moneyFrom'])+1;
    }else if(type == 'moneyTo' && (todosFilter['moneyFrom'] != '' && parseInt(todosFilter['moneyTo']) < parseInt(todosFilter['moneyFrom']))){
      todosFilter['moneyFrom'] = parseInt(todosFilter['moneyTo'])-1;
    }
    dispatch({
      type:'todos/changeData',
      payload:{
        filter:todosFilter,
        fetchAction:false
      }
    })
  }
  onNumberChange(e){
    const str = e.trim()
    let dispatch = this.props.dispatch,
      todosFilter = this.props.todos.filter;
    todosFilter['number'] = str;
    dispatch({
      type:'todos/changeData',
      payload:{
        filter:todosFilter,
        fetchAction:false
      }
    })
  }
  onFlowChange(data){
    let dispatch = this.props.dispatch,
      flowTypes = this.getFlowTypes(),
      todosFilter = this.props.todos.filter;
    todosFilter['flowtype'] = data;
    dispatch({
      type:'todos/changeData',
      payload:{
        filter:todosFilter,
        fetchAction:false
      }
    })
  }
  onDateChange(date, type){
    let dispatch = this.props.dispatch,
      todosFilter = this.props.todos.filter;
    todosFilter[type] = moment(date).format('YYYY-MM-DD');

    if(type=='startDate' && (todosFilter['endDate'] != null && todosFilter['endDate'] < todosFilter['startDate'])){
      todosFilter['endDate'] = todosFilter['startDate'];
    }else if(type == 'endDate' && (todosFilter['startDate'] != null && todosFilter['endDate'] < todosFilter['startDate'])){
      todosFilter['startDate'] = todosFilter['endDate'];
    }
    dispatch({
      type:'todos/changeData',
      payload:{
        filter:todosFilter,
        fetchAction:false
      }
    })
  }
  cancelFilter(){
    let dispatch = this.props.dispatch,
      todosFilter = {
        number:'',
        flowtype:['-1'],
        startDate:null,
        endDate:null,
        moneyFrom:'',
        moneyTo:'',
      };
    // console.log('cancelFilter',todosFilter)
    window.upTabsData('todos:filter','publish',todosFilter);
    jw.closeWebView();
  }
  startFilter(){
    let dispatch = this.props.dispatch,
      todosFilter = this.props.todos.filter;
    // console.log('startFilter',todosFilter)
    window.upTabsData('todos:filter','publish',todosFilter);
    jw.closeWebView();
  }
}

function mapStateToProps(state) {
  // console.log('state:',state)
  return state
}
export default connect(mapStateToProps)(Filter);