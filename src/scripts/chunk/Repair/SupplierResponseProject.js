/**
 * 供应商响应-工程
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import UserCard from '../../components/Common/UserCard';
import { ProjectCardListShow } from '../../components/Common/ProjectCard';
import EmptyView from '../../components/Common/EmptyView';
import { MemoDialog } from '../../components/Common/EpsModal';
import request from '../../utils/EpsRequest';
import { orderStatus ,openChart,getUsers} from '../../constants';
import { AlertBase} from '../../components/Common/EpsModal';


import LoadMore from './../../components/Common/LoadMore';
class SupplierResponseProject extends Component {
	constructor(props) {
		super(props);
		this.openLog = this.openLog.bind(this);
	}
	render(){
		let content = this.combineContent();
		let btn ;
		let data = this.props.supplierresponse;
    // console.log('Marlin', data)
		if(data['loading']['loading']){
			btn = <div className="todo-info-status"><div className="eps-btn eps-btn-default-small">加载中…</div></div>
		}else{
      if( isUnfinishedOrHistory() ){
        btn = (<div className="todo-info-status" onClick={(e)=>this.openProcessTable()}><i className="icon-time-b"></i><div className="todo-status-c"><span className="todo-status-title">{orderStatus['repair'][data['orderState']]["label"]}</span><span className="todo-status-tip">{orderStatus['repair'][data['orderState']]["val"]}</span></div></div>);
      }else{
        btn =(<div className="todo-info-status"><div className="eps-btn eps-btn-warning-large" onClick={ (e)=>this.agree(e) }><i className="icon-ok-dark"></i>确认响应</div></div>);  
      }
			/*if(data['orderState'] == '2'){
				btn =(<div className="todo-info-status"><div className="eps-btn eps-btn-warning-large" onClick={ (e)=>this.agree(e) }><i className="icon-ok-dark"></i>确认响应</div></div>);	
			}else{
				btn = (<div className="todo-info-status" onClick={(e)=>this.openProcessTable()}><i className="icon-time-b"></i><div className="todo-status-c"><span className="todo-status-title">{orderStatus['repair'][data['orderState']]["label"]}</span><span className="todo-status-tip">{orderStatus['repair'][data['orderState']]["val"]}</span></div></div>);
			}*/
		}
		// console.log(data['avatar'],'这个里面的avatar是什么呀');
		return (
			<div className="eps-repair-supplier-response">
				<header className="header header-with-memo" ref="header">
					<div className="header-bg"></div>
					<div className="header-bg-2"></div>
					<div className="header-c">
						<UserCard data={_.extend(data,{
							name:data['createBy'],
							avatar:data['avatar'],
							time:data['dateAppointment'],
							fileCount:data['fileCount'] || 0,
							uploadPhaseName:data['uploadPhaseName'] || ''
						})}></UserCard>
					</div>
				</header>
				{content}
				<LoadMore container='main-c' data={data['loading']}/>
				<footer className="footer">
					<div className="log-btn" onClick={this.openLog}>
						<i className="icon-log"></i>
						<span>流程日志</span>
					</div>
					{btn}
				</footer>
			</div>
		);
	}
	// 组件加载完毕
  componentDidMount(){
  	let self = this;
  	let dispatch = this.props.dispatch
  	let orderid = this.props.params.orderid.split("&")[0];
    request('/McdEpsApi/joywok/repair/getCOOrderInfo',{
    	method:'POST',
    	body:JSON.stringify({
    		param:{
    			condition:{
    				orderNumber:orderid
    			},
    			pager:{pageNum:'1',pageSize:'100'}
    		}
		  })
    }).then(function(resp){
    	if(resp['data']['success']==false){
    	}else{
    		NProgress.done();
    		let data = _.map(resp['data']['body']['orderList'],function(i){
    			i['projectName'] = i['deviceName'];
    			i['categoryCode'] = i['faCategory'];
    			i['subCategoryCode'] = i['subCategory'];
    			return i
    		});
    		dispatch({
    			type:'supplierresponse/changeData',
					payload:_.extend({
						loading:{
							loading:false,
							hide:true,
							fix:true
						},
						list:data
					},resp['data']['body'])
	    	})	
	    	getUsers(resp['data']['body']['storeMan'],'num',function(resp){
        	let userdata = resp['data'][0];
        	dispatch({
	          type:'supplierresponse/changeData',
	          payload:{
	          	avatar:userdata['avatar']
	          }
	        })
        })
    	}
    })
    this.setHeight();
    window.onJwNavBtnClick = function(data){
			if(data['type'] == '4'){
				let modelData = self.props.supplierresponse;
				openChart(modelData['storeMan'],modelData['orderNumber'],'供应商评估')
			}
		}
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
			let footer = $('.footer').height() || 0;
			console.log(header,footer);
			$('.eps-device-list').css({height:clientHeight-header-footer+'px'});
		},0)
	}
	// 打开log
	openLog(){
		let url = EpsWebRoot+'/#/log/'+this.props.params['orderid'];
		let data = this.props.supplierresponse;
		window.upTabsData('log','cache',data)
    jw.pushWebView(url);
	}
	combineContent(){
		let data = this.props.supplierresponse;
		const list = this.props.supplierresponse["list"];
		if(list && list.length>0){
			return (
		    <div className="eps-repair-supr-content"><ul className="eps-list-card-wrap eps-device-list">
					{
						_.map(list,(item) => {
							return <ProjectCardListShow itemdata={item} />
						})
					}
		    </ul></div>
	  	);	
		}else{
			return (<EmptyView tip="暂无设备"/>)
		}	
	}
	// 响应订单
	agree(){
		let self = this;
		let data = this.props.supplierresponse;
		let agreeDialog = MemoDialog({
			title:'请输入备注',
			defaultValue: self.agreeMemo ?  self.agreeMemo : '',
      btnVal: '确认',
			placeholder: '请输入备注...', 
      memorequired: false, 
      onBtnClick: (memo,callback)=>{  
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
		    	if(resp['data']['success']==false){
		    		if(typeof(callback)!='undefined'){callback(true);}
		    	}else{
		    		AlertBase({
							tip: '已成功提交',
							icon: 'icon-save-success',
							onOk: ()=>{
								jw.closeWebView()
							}
						});
		    	}
		    })
      },
      onClose: (memo)=>{  
      	self.agreeMemo = memo;
				console.log('SupplierResponse agree onClose:',memo);
      },
		});
	}
	openProcessTable(){
		let data = this.props.supplierresponse;
		let orderid = this.props.params.orderid.split("&")[0];
		data['logType'] = 'repair';
		window.upTabsData('log','cache',data)
		var url = EpsWebRoot+'/#approval/'+orderid;
		jw.pushWebView(url);
	}
}

function mapStateToProps(state){
  let title='';
  let orderState;
  let sta=state.routing.locationBeforeTransitions.query.sta;
  if( isUnfinishedOrHistory() ){
    title = sta=='1'?'在途订单':'历史订单';
  }else{
    title = '供应商响应';
  }
  jw.setTitle({ title: title });
  return state;
}

export default connect( mapStateToProps )(SupplierResponseProject);
// export default connect(function(state){return state; })(SupplierResponseProject);