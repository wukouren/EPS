/**
 * 工程审批 餐厅工程确认
 * type=1,2,3,4
 * //1:餐厅待确认
	//2：DOA审批
	//3：审批未通过，餐厅再次审批 3同1 合并，3不需要了
	//4：餐厅确认订单，评价
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import LoadMore from './../../components/Common/LoadMore';
import UserCard from './../../components/Common/UserCardToProject';
import { ProjectCardMore } from './../../components/Common/ProjectCard';
import MoneyShow from './../../components/Common/MoneyShowProject';
import RejectTip from './../../components/Common/RejectTip';
import EpsDialog from './../../components/Common/EpsDialog';
import { MemoDialog ,EvaluateDialog} from '../../components/Common/EpsModal';
import { AlertBase, ConfirmBase } from '../../components/Common/EpsModal';
import { EpsCosts } from '../../components/Common/EpsCosts';
import { openChart ,orderStatus} from '../../constants';
import Form from "jw-form/dist/mobile";

import request from '../../utils/EpsRequest';
class Process extends Component {
	FormChange(values,schema){
		console.log("values:",values,"FormChange:",schema);
	}
	changeData(data){
	}
	render(){
		let data = this.props.todos;
		let view = this._init_view();
		return (
			<div className="root-container">
				{view}
			</div>
		);
	}
	_init_view(){
		let self = this;
		let view = '';
		let data = this.props.process;
		let formData={};
		let rejectTip ='';
		let btn = ''

		console.log('Marlin', this.props);
		if(data['loading']['loading']){
			btn = <div className="todo-info-status"><div className="eps-btn eps-btn-default-small">加载中…</div></div>
		}else{
			// if(data['type']=='100'){
			if( isUnfinishedOrHistory() ){
				let strOrderSta = data['orderState'] && orderStatus["repair"][data['orderState']]?orderStatus["repair"][data['orderState']]:{'label':''};
				btn = <div className="todo-info-status" onClick={(e)=>this.openProcessTable()}><i className="icon-time-b"></i><div className="todo-status-c"><span className="todo-status-title">{strOrderSta["label"]}</span><span className="todo-status-tip">{strOrderSta["val"]}</span></div></div>;
			}else{

				if(this.props.location.query.type=='1'){
					btn = <div className="eps-btn-wrap">
						<div className="eps-btn eps-btn-cancel-small there-btn" onClick={(e)=>this.cancel(e)}>取消</div>
						<div className="eps-btn eps-btn-default-small there-btn" onClick={(e)=>this.reject(e)}>拒绝</div>
						<div className="eps-btn eps-btn-warning-large there-btn" onClick={(e)=>this.agree(e)}>确认</div>
					</div>
				}else{
					btn = <div className="eps-btn-wrap">
						<div className="eps-btn eps-btn-default-small" onClick={(e)=>this.reject(e)}>拒绝</div>
						<div className="eps-btn eps-btn-warning-large" onClick={(e)=>this.agree(e)}>确认</div>
					</div>
				}

				
			}
		}

		if(data['type']=='1'){
			// rejectTip = <RejectTip data={data['epsTip']} close={(e)=>this.closeTip(e)}></RejectTip>
		}
		// type= 1:餐厅待确认 2：DOA审批 3：审批未通过，餐厅再次审批(3和1合并，3作废) 4：餐厅确认订单，评价
		let EpsDialogComponent = <div className="appraisal-form">
			<Form ref='form' formData={formData} onChange={(values,schema)=>this.FormChange(values,schema)}/>
		</div>;
		
		let showScrapTip = 0;
		if(data['partList'] && data['partList'].length!=0){
			_.each(data['partList'],function(i){
				if(Number(i['totalMaintenanceCost'])>=3000){
					showScrapTip = showScrapTip+1
				}
			})	
		}
		if(data['deviceList'] && data['deviceList'].length!=0){
			_.each(data['deviceList'],function(i){
				if(Number(i['totalMaintenanceCost'])>=3000){
					showScrapTip = showScrapTip+1
				}
			})	
		}
		console.log(data,showScrapTip,'这个里面拿到的数据是什么呢');
		this.showScrapTip = showScrapTip
		view = <div className="root-container-w">
			<header className="header" ref="header">
				<div className="header-bg-specail">
					<div className="header-bg"></div>
					<div className="header-bg-2"></div>
				</div>
				<div className="header-c">
					<UserCard data={_.extend(data,{
							name:data['createBy'],
							avatar:data['avatar'],
							time:data['dateAppointment'],
							fileCount:data['fileCount'] || 0,
							uploadPhaseName:data['uploadPhaseName'] || '',
							scrapPageInfo:data['storeScrapList'],
							partList:data['partList'],
							deviceList:data['deviceList'],
							storeNumber:data['storeNumber'],
							scrappType:'repair',
							scrappOrderType:'project',
							showScrapTip:showScrapTip,
							addScrap:(window.isUnfinishedOrHistory()==false && (this.props.location.query.type=='1' || this.props.location.query.type=='4')?true:false)
						})}></UserCard>
				</div>
			</header>
			<sesstion className="main">
				<div className="main-c">
					{
						data['list'] && data['list'].length!=0?<ProjectCardMore itemdata={_.extend(data['list'][0],{
								name:data['list'][0]["deviceName"]
							})} showAllData={true} openView={(e)=>self.openItemView('/repairing/project-info',data['list'][0])}></ProjectCardMore>:''
					}
					<LoadMore container='main-c' data={data['loading']} onEndReached={(e)=>{this.onEndReached(e)} }/>
				</div>
			</sesstion>
			{
				data['incidentalList'] && data['incidentalList'].length!=0?<MoneyShow infoList={data["list"]} showFeeDetail={(e)=>this.showFeeDetail(e)} data={_.extend({},data['incidentalList'])}></MoneyShow>:''
			}
			{rejectTip}
			<footer className="footer">
				<div className="log-btn" onClick={(e)=>this.openView('/log')}>
					<i className="icon-log"></i>
					<span>流程日志</span>
				</div>
				{btn}
			</footer>
		</div>;
		return view;
	}
	showFeeDetail(data){
		// console.log(data,'zzzzzzzzzzzzzz');
		// 
		// 
		// 
		let datas = this.props.process;
		let html ;
		let title;
		if(data == '1'){
			title = '材料费'
			html = <div>
					<div className="eps-popup-list-h3 materials-fee-h">
            <span>工程名称</span>
            <span>费用 (¥) </span>
          </div>
          <div className="eps-popup-list-item materials-fee">
          	{
          		_.map(datas['incidentalList'],function(i){
          			return <div>
					              <span className="ellipsis">{i["deviceName"]}</span>
					              <span>{i['materialCost']+'('+i['materialCostTax']+')'}</span>
					            </div>
          		})
          	}
          </div>
          <div className="eps-popup-list-foot">
            <div className="eps-popup-list-foot-total">
              <label>总价</label>
              <i className="icon-money"></i>
              <span>153.72</span>
            </div>
          </div>
         </div>
		}
		
		console.log(datas,'zzzzzdsadas');
		// return 
		EpsCosts({title:'采购材料费',body:html});
	}
	// 组件加载完毕
	onEndReached(){}
	openItemView(data){
		let datas = this.props.process;
		let time = datas['updateDate'].split('.')[0];
		let updateDate = encodeURIComponent(time);
		var url = EpsWebRoot+'/#'+data+'/'+this.props.params['orderid']+'?updateDate='+updateDate;
		datas['logType'] = 'repair';
		window.upTabsData('log','cache',datas);
		jw.pushWebView(url);
	}
	openView(data){
		var url = EpsWebRoot+'/#'+data+'/'+this.props.params['orderid']
		let datas = this.props.process;
		datas['logType'] = 'repair';
		window.upTabsData('log','cache',datas);
		jw.pushWebView(url);
	}
	closeTip(){
		let dispatch = this.props.dispatch;
		let data = this.props.process;
		let epsTip = _.extend(data['epsTip'],{
			show:false
		});
		dispatch({
			type:'process/changeData',
			data:{
				epsTip:epsTip
			}
		})
	}
	closeDialog(){
		let dispatch = this.props.dispatch;
		let data = this.props.process;
		let epsDialog = _.extend(data['epsDialog'],{
			show:false
		});
		dispatch({
			type:'process/changeData',
			data:{
				epsDialog:epsDialog
			}
		})
	}
	cancel(){
		let orderid = this.props.params.orderid.split("&")[0];
		let modelData = this.props.process;
		let self = this;
		let rejectDialog = MemoDialog({
			title:'是否取消该订单?',
			defaultValue: self.cancelMemo ?  self.cancelMemo : '',
			btnIconClass:'icon-reject',
      btnVal: '取消',
			placeholder: '取消订单必须输入备注...', 
      memorequired: true,
			changeData:function(){},
      onBtnClick: (memo,callback)=>{  
      	let datas = {
	    		param:{
	    			eid:window.eid,
	    			record:{
	    				updateDate:modelData["updateDate"],
	    				orderNumber:orderid,
	    				orderDate:modelData['orderDate'],
	    				orderState: modelData['orderState'],
	    				refuseRemarks: memo
	    			}
	    		}
			  }
			  // self.upData(datas,callback)
			  request('/McdEpsApi/joywok/repair/cancelEquipmentRepairPo',{
		    	method:'POST',
		    	body:JSON.stringify(datas)
		    }).then(function(resp){
		    	if(resp['data']['success']==false){
		    		if(typeof(callback)!='undefined'){
		          callback(true);
		        }
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
      	self.cancelMemo = memo;
				// console.log('approve reject onClose:')
      },
		});
	}
	// 拒绝订单
	reject(){
		let orderid = this.props.params.orderid.split("&")[0];
		let modelData = this.props.process;
		let orderState = '';
		if(modelData['type'] == '1'){
			orderState = '4'
		}
		if(modelData['type'] == '2'){
			orderState = '5'	
		}
		if(modelData['type'] == '4'){
			orderState = '7'	
		}
		if(modelData['type'] == '3'){
			orderState = '8'	
		}
		let self = this;
		let rejectDialog = MemoDialog({
			title:'是否拒绝该订单?',
			defaultValue: self.rejectMemo ?  self.rejectMemo : '',
			btnIconClass:'icon-reject',
      btnVal: '拒绝',
			placeholder: '拒绝必须输入备注...', 
      memorequired: true,
			changeData:function(){},
      onBtnClick: (memo,callback)=>{  
      	let datas = {
	    		param:{
	    			eid:window.eid,
	    			record:{
	    				updateDate:modelData["updateDate"],
	    				orderNumber:orderid,
	    				confirmFlag:false,
	    				orderState: orderState,
	    				refuseRemarks: memo
	    			}
	    		}
			  }
			  self.upData(datas,callback)
      },
      onClose: (memo)=>{  
      	self.rejectMemo = memo;
				console.log('approve reject onClose:')
      },
		});
	}
	agree(){
		let orderid = this.props.params.orderid.split("&")[0];
		let modelData = this.props.process;
		let orderState = '';
		let self = this;
		if(modelData['type'] != '4'){
			if(modelData['type'] == '1'){
				let storeScrapList = self.props.process['storeScrapList'];
				if(this.showScrapTip!=0 && storeScrapList.length==0){
					AlertBase({
						tip: '请挑选资产！！',
						icon: 'icon-save-error',
						onOk: ()=>{}
					});
					return 
				}
				orderState = '4'
			}
			if(modelData['type'] == '2'){
				orderState = '5'	
			}
			if(modelData['type'] == '3'){
				orderState = '8'	
			}
			let epsDialog = MemoDialog({
				title:'请输入备注?',
				defaultValue: self.agreeMemo ?  self.agreeMemo : '',
				btnIconClass:'icon-check',
	      btnVal: '确认',
				placeholder: '请输入备注...',
				changeData:function(){},
	      memorequired:false, 
	      onBtnClick: (memo,callback)=>{  
	      	let datas = {
		    		param:{
		    			eid:window.eid,
		    			record:{
		    				updateDate:modelData["updateDate"],
		    				orderNumber:orderid,
		    				confirmFlag:'Approve',
		    				orderState: orderState,
		    				refuseRemarks: memo || '',
		    				storeScrapList:modelData['storeScrapList']||[]
		    			}
		    		}
				  }
				  self.upData(datas,callback)
	      },
	      onClose: (memo)=>{  
	      	self.rejectMemo = memo;
					console.log('approve reject onClose:')
	      },
			});
		}else{
			orderState = '7';
			// console.log(window.EvaluateCache,'window.EvaluateCache');
			// 
			let storeScrapList = self.props.process['storeScrapList'];
			if(this.showScrapTip!=0 && storeScrapList.length==0){
				AlertBase({
					tip: '请挑选资产！！',
					icon: 'icon-save-error',
					onOk: ()=>{}
				});
				return 
			}
			EvaluateDialog({
				title:'请输入评价',
				btnIconClass:'icon-check',
	      btnVal: '确认',
	      memorequired:false, 
	      formData:{
	      	schema:_.map(window.Evaluate,function(val,key){
		      	return {
		      		name: key, element:'Rate',
							label:val,
							defaultValue:(typeof(window.EvaluateCache)!='undefined'?window.EvaluateCache[key]:0),
							attr:{
								empty:<i className="icon-star"></i>,
								full:<i className="icon-star-active"></i>
							},
							// rules:[{
							// 	validator:function(rule, value, callback){
							// 		if(value==0){
							// 			callback('请选择'+val+'评价！')	
							// 		}
							// 	  callback();
							// 	}
							// }]
							rules:[]
						}
					}).concat({
						name:'operateMarks',element:'Textarea',
						defaultValue:(typeof(window.EvaluateCache)!='undefined'?window.EvaluateCache['operateMarks']:''),
						attr:{
							className:'appraisal-form-feedback',
							placeholder:'请输入备注...'
						},
						rules:[]
					}),
					buttons:false,
					changeData:this.changeData.bind(this)
	      },
	      rules:function(data){
	      	for(var i in window.Evaluate){
	      		if(data[i]==0){
	      			AlertBase({
								tip: '请输入'+window.Evaluate[i]+'的评价!',
								icon: 'icon-save-error',
								onOk: ()=>{}
							});
							return false;
	      		}
	      	}
	      	let hasOne = false;
	      	_.each(window.Evaluate,function(i,key){
	      		if(data[key]<=2){
	      			hasOne = true
	      		}
	      	})
	      	if(hasOne && data['operateMarks'].length==0){
	      		AlertBase({
							tip: '由于评星较低，请输入备注！！',
							icon: 'icon-save-error',
							onOk: ()=>{}
						});
	      		return false
	      	}
	      	return true
	      },
	      onBtnClick:(data,callback)=>{
	      	data['confirmRepairRmrk'] = data['operateMarks'];
					delete data['operateMarks'];
	      	request('/McdEpsApi/joywok/repair/submitCOStoreEvaluate',{
			    	method:'POST',
			    	body:JSON.stringify({
			    		param:{
				    		eid:window.eid,
				    		record:_.extend({
									confirmFlag:'Approve',
				    			orderNumber:orderid,
				    			updateDate:modelData['updateDate'],
				    			orderState:orderState,
		    					storeScrapList:modelData['storeScrapList']||[]
				    		},data)
			    		}
			    	})
			    }).then(function(resp){
			    	console.log(JSON.stringify({
			    		eid:window.eid,
			    		record:_.extend({
								confirmFlag:'Approve',
			    			orderNumber:orderid,
			    			updateDate:modelData['updateDate'],
			    			orderState:orderState
			    		},data)
			    	}),resp['data'],'反悔了什么呢');
			    	// return 
			    	if(resp['data']['success']==false){
			    		if(typeof(callback)!='undefined'){
			          callback(true);
			        }
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
	      	self.rejectMemo = memo;
					console.log('approve reject onClose:')
	      },
			});
		}
	}
	upData(data){
		let url = '';
		let modelData = this.props.process;
		if(modelData['type'] == '1'){
			url = '/McdEpsApi/joywok/repair/submitCOSupplierEvaluate'
		}
		if(modelData['type'] == '2'){
			url = '/McdEpsApi/joywok/repair/submitCOSupplierEvaluate';
			// url = '/McdEpsApi/joywok/repair/submitCOSupplierEvaluateAdjust'
		}
		if(modelData['type'] == '4'){
			url = '/McdEpsApi/joywok/repair/submitCOStoreEvaluate'
		}

		if(modelData['type'] == '3'){
			url = '/McdEpsApi/joywok/repair/submitCOSupplierEvaluateAdjust'
		}

		// /McdEpsApi/joywok/repair/submitCOSupplierEvaluateAdjust
		console.log(JSON.stringify(data),'提交的数据',JSON.stringify(window.userinfo),'当前角色',JSON.stringify(modelData),'当前订单信息');

		request(url,{
    	method:'POST',
    	body:JSON.stringify(data)
    }).then(function(resp){
    	if(resp['data']['success']==false){
    		if(typeof(callback)!='undefined'){
          callback(true);
        }
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
	}
	componentDidMount(){
		let self = this;
		let dispatch = this.props.dispatch;
		let modelData = this.props.process;
		let orderid = this.props.params.orderid.split("&")[0];
		this.setHeight();
		dispatch({ type: 'process/fetch', payload:orderid,dispatch:dispatch});
		if(JWReady == true){
			jw.setFuncBtns([{type:4}]);
		}else{
			window.EpsEvents.off('jwready:ok').on('jwready:ok',()=>{
				jw.setFuncBtns([{type:4}]);
			})	
		}	
		if(modelData['type']=='4'){
			request('/McdEpsApi/joywok/common/getEvaluate',{
				method: 'POST',
		    body:JSON.stringify({
		    	param:{
		    		eid:window.eid,
		    		condition: {
				      orderNumber: orderid
				    }
			    }
		    })
			}).then(function(resp){
				window.Evaluate = resp['data']['body'];
				console.log(window.Evaluate,'zzzzzzzz');
			})
		}
		PubSub.subscribe('add:scrapped',function(evt,data){
			dispatch({ type: 'process/changeData', payload:{
				storeScrapList:_.map(data,function(i){return i})
			}});
		});
		window.onJwNavBtnClick = function(data){
			if(data['type'] == '4'){
				let modelData = self.props.process;
				openChart(modelData['storeMan'],modelData['orderNumber'],'测试')
			}
		}
		// console.log(modelData,'modelData');
		/*let title = '餐厅确认订单&评价';
		if( isUnfinishedOrHistory() ){
			title = '在途订单';
		}else{
			if(modelData['type'] == '1'){
				title = '餐厅确认工程维修';
			}else if(modelData['type'] == '2'){
				title = 'DOA审批';
			}else if(modelData['type'] == '3'){
				title = '调整后审批';
			}else if(modelData['type'] == '4'){
				title = '调整与评估';
			}
		}
		jw.setTitle({title:title});*/
  }
  openProcessTable(){
  	let data = this.props.process;
		data['logType'] = 'repair';
		window.upTabsData('log','cache',data)
		var url = EpsWebRoot+'/#approval/'+this.props.params['orderid'];
		jw.pushWebView(url);
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
			let top = $('.div-sticky').height() || 0;
			let upload = $('.upload-file').height()||0;
			let footer = $('.eps-footer').height() || 0;
			console.log(clientHeight,header,top,footer,upload);
			$('.eps-empty-tip-arrow').css({height:clientHeight-header-top-footer-upload-30+'px'});
			$('.eps-device-list').css({height:clientHeight-header-top-footer-upload-30+'px'});
		},0)
	}
}
function mapStateToProps(state) {
	let type=state.routing.locationBeforeTransitions.query.type,
		sta=state.routing.locationBeforeTransitions.query.sta;

	/*let hash = window.location.hash.split('?')[1].split('&');
	let nowHash = {};
	_.each(hash,(i)=>{
		let split = i.split('=');
		nowHash[split[0]] = split[1];
	})*/
	console.log('Marlin mapStateToProps', state);
	let nowData = state;
	nowData['process']['type'] = type;
	/*if(nowHash['type']){
		nowData['process']['type'] = nowHash['type']
	}else{
		nowData['process']['type'] = '1'
	}*/
	let title;
	if( isUnfinishedOrHistory() ){
		title = sta=='1'?'在途订单':'历史订单';
	}else{
		switch(parseInt(nowData['process']['type'])){
			case 1:
				title = "餐厅确认工程维修";
				break;
			case 2:
				title = "DOA审批";
				break;
			case 3:
				title = "调整后审批";
				break;
			case 4:
				title = "调整与评估";
				break;
			default:
				title = '';
				break;
		}
	}
	if(JWReady == true){
		jw.setTitle({title:title});
	}else{
		window.EpsEvents.off('jwready:ok').on('jwready:ok',()=>{
			jw.setTitle({title:title});
		})	
	}
	//1:餐厅待确认
	//2：DOA审批
	//3：审批未通过，餐厅再次审批
	//4：餐厅确认订单，评价
	return nowData
}
export default connect(mapStateToProps)(Process);