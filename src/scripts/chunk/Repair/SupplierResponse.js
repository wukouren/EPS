/**
 * 供应商响应-设备//这个里面有什么数据呢
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import UserCard from '../../components/Common/UserCard';
import { DeviceCardResponse } from '../../components/Common/DeviceCard';
import EmptyView from '../../components/Common/EmptyView';
import { MemoDialog } from '../../components/Common/EpsModal';
import LoadMore from './../../components/Common/LoadMore';
import { openChart, getUsers ,orderStatus} from '../../constants';
import { AlertBase, ConfirmBase ,AlertInfoBase} from '../../components/Common/EpsModal';
import request from '../../utils/EpsRequest';

const dateFormat = 'YYYY-MM-DD HH:mm';
let eid=userinfo.employee_id;
console.log(userinfo,'userinfo')
class SupplierResponse extends Component {
	constructor(props) {
		super(props);
		this.openLog = this.openLog.bind(this);
    this.changeRemark = this.changeRemark.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
		this.state = {
			'responsed': false
		}
	}
  NameInfo(name){ 
     AlertInfoBase({
        text: name,
     });
  }

	// 打开log
	openLog(){
		let url = EpsWebRoot+'/#/log/'+this.props.params['orderid'];
    let data = this.props.supplierresponsedevice;
    window.upTabsData('log','cache',data)
    jw.pushWebView(url);
	}

	// 响应订单
	agree(){
		let self = this;
    let data=this.props.supplierresponsedevice;
		let agreeDialog = MemoDialog({
			title:'供应商确认响应？',
			defaultValue: self.agreeMemo ?  self.agreeMemo : '',
      btnVal: '确认',
			placeholder: '请输入备注...', 
      memorequired: false, 
      onBtnClick: (memo,callback)=>{ 
        console.log("agree",data)
        request('/McdEpsApi/joywok/repair/submitCoSupplierResponse',{
          method:'POST',
          body:JSON.stringify({
           param:{
                eid:window.eid,
                record:{
                updateDate:data["updateDate"],
                orderNumber:self.props.params['orderid'],
                orderState: '2',
                rmrk: memo
              }
            }
          })
        }).then(function(resp){
          console.log(resp,"resp")
           if(resp.data.success){
            if(typeof(callback)!='undefined'){
              callback();
            }
             self.agreeMemo = memo;
             self.setState({'responsed': true});
             AlertBase({
              tip: '已成功提交',
              icon: 'icon-save-success',
              onOk: ()=>{
                jw.closeWebView();
              }
            });
           }else{
            callback(true);
           }
        })
      },
      //epsModal中 MemoDialogComponent需要添加   this.props.epsDialogConfig.changeData(values);
      changeData:(value)=>{
        self.changeRemark(value[0]['defaultValue'])
      },
      onClose: (memo)=>{  
      	self.agreeMemo = memo;
				console.log('SupplierResponse agree onClose:',memo)
      },
		});
	}
 changeRemark(value){
  let dispatch=this.props.dispatch;
  dispatch({
    type:'supplierresponsedevice/changeData',
    payload:{
      rmrk:value
    }
  })
 }

	openWebView(data){
		var url = EpsWebRoot+'/#'+data
		jw.pushWebView(url);
	}

	combineContent(){
		const list = this.props.supplierresponsedevice.list;
		
		if(list && list.length>0){
			return (
		    <ul className="eps-list-card-wrap eps-device-list">
					{
						list.map( (item) => (
							<DeviceCardResponse itemdata={item} />
						))
					}
		    </ul>
	  	);	
		}else {
			return (<EmptyView tip="暂无设备"/>)
		}
	}

  //
  openProcessTable(){
    let data = this.props.supplierresponsedevice;
    data['logType'] = 'repair';
    window.upTabsData('log','cache',data)
    var url = EpsWebRoot+'/#approval/'+this.props.params['orderid'];
    jw.pushWebView(url);
  }
	// 组件加载完毕
 componentDidMount(){
    if(JWReady == true){
      jw.setFuncBtns([{type:4}]);
    }else{
      window.EpsEvents.off('jwready:ok').on('jwready:ok',()=>{
        jw.setFuncBtns([{type:4}]);
      })  
    }
    let dispatch = this.props.dispatch;
    let self=this;
    window.onJwNavBtnClick = function(data){
      if(data['type'] == '4'){
        console.log("999")
        let modelData = self.props.supplierresponsedevice;
        openChart(eid,modelData['orderNumber'],'测试')
      }
    }
    request('/McdEpsApi/joywok/repair/getEQOrderInfo',{
      method:'POST',
      body:JSON.stringify({
        param:{
          eid:eid,
          condition:{
            orderNumber:this.props.params.orderid,
          },
          pager:{pageNum:'1',pageSize:'10'}
        }
      })
    }).then(function(resp){
      if(resp['data']['success']==false){
        console.log("false")
      }else{
        NProgress.done();
        let data=resp['data']['body'];
        let creatorinfo={};
        creatorinfo.name=data.createBy;
        // creatorinfo.dateAppointment=data.dateAppointment;
        creatorinfo.time=data.dateAppointment;
        creatorinfo.orderNumber=data.orderNumber;
        creatorinfo.orderState=data.orderState;
        creatorinfo.storeName=data.storeName;
        creatorinfo.remark=data.remark;
        creatorinfo.repairType=data.repairType;
        getUsers(data['createEid'],'num',function(resp){
          let userdata = resp['data'][0];
          dispatch({
            type: 'supplierresponsedevice/changeData',
            payload: {
              avatar:userdata['avatar']
            },
          });
        })
       
        dispatch({
          type:'supplierresponsedevice/changeData',
          payload:_.extend({
            loading:false,
            list:data.pageInfo.list,
            creatorinfo:creatorinfo,
            noMore:data.pageInfo.list.length<10?true:false,
            hide:data.pageInfo.list.length<5?true:false,
          },resp['data']['body'])
        })  
      }
    })
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
      let footer = $('.eps-footer').height() || 0;
      $('.eps-repair-supplier-response').css({height:clientHeight-footer+'px'});
    },0)
  }
  onEndReached(e){
    console.log('111111')
    let dispatch=this.props.dispatch;
    let pageNum=this.props.supplierresponsedevice.pageNum;
    dispatch({
      type:"supplierresponsedevice/changeData",
      payload:{
        noMore:false,
        fix:true,
      }
    })
    dispatch({
      type:"supplierresponsedevice/loadMoreDevice",
      payload:{
        param:{
          eid:eid,
          condition: {
            orderNumber: this.props.params.orderid,
          },
          pager: {
           pageNum: pageNum+1,
           pageSize: '10'
          }
        }
      }
    })
  }
	render(){
    let data=this.props.supplierresponsedevice;
		let content = this.combineContent();
    let LoadMoreHtml='';
    console.log(data,"locationlocationlocationlocationlocationlocation")
    if(data.noMore&&data.hide){
      LoadMoreHtml= <LoadMore onEndReached={this.onEndReached} 
            data={{
              hide:data['hide'],
              fix:data['fix']
            }}
              container='eps-repair-supplier-response' />
    }else if(data.noMore){
      console.log("noMore")
       LoadMoreHtml=<div className="noMore-Data">没有更多了!</div>
    }else{
      console.log('loading')
      LoadMoreHtml= <LoadMore onEndReached={this.onEndReached} 
            data={{
              hide:data['hide'],
              fix:data['fix']
            }}
             container='eps-repair-supplier-response' />
    }
		let btn='';
    if( isUnfinishedOrHistory() ){
      let strOrderSta = data['orderState'] && orderStatus["repair"][data['orderState']]?orderStatus["repair"][data['orderState']]:{'label':''};
      btn= (<div className="todo-info-status" onClick={(e)=>this.openProcessTable()}><i className="icon-time-b"></i><div className="todo-status-c"><span className="todo-status-title">{strOrderSta["label"]}</span><span className="todo-status-tip">{strOrderSta["val"]}</span></div></div>);
    }else{
      btn = (<div className="eps-btn eps-btn-warning-large" onClick={ (e)=>this.agree(e) }><i className="icon-ok-dark"></i>确认响应</div>);
        if(this.state.responsed == true) btn = (<div className="eps-btn eps-btn-warning-large disabled"><i className="icon-ok-dark"></i>已响应</div>);
    }

    if(this.props.supplierresponsedevice.loading){
       return (<div className="todos-loading">
                  <img src="images/loading.gif" />
              </div>)
    }else{
      return (
          <div className="eps-repair-supplier-response-device">
            <div className="eps-repair-supplier-response device">
              <header className="header header-with-memo" ref="header">
                <div className="header-bg-specail">
                  <div className="header-bg"></div>
                  <div className="header-bg-2"></div>
                </div>
                <div className="header-c">
                  <UserCard data={_.extend({},this.props.supplierresponsedevice.creatorinfo,{
                    avatar:this.props.supplierresponsedevice['avatar'],name:data['createBy'],
                    fileCount:data['fileCount'] || 0,
                    uploadPhaseName:data['uploadPhaseName'] || ''
                  })} />
                </div>
              </header>
              <div className="eps-repair-supr-content device">
                { content }
                {LoadMoreHtml}
              </div>
            </div>
            <div className="eps-footer">
              <div className="eps-btn-wrap">
                <div className="log-btn" onClick={ this.openLog }><i className="icon-log"></i><span>流程日志</span></div>
                { btn }
              </div>
            </div>
          </div>
        );
    }
		
	}
}

export default connect(function(state){return state})(SupplierResponse);