/**
 * 设备审批 餐厅设备确认
 * type=1,2,3,4
 * //1:餐厅待确认
	//2：DOA审批
	//3：审批未通过，餐厅再次审批  3同1 合并，3不需要了
	//4：餐厅确认订单，评价
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import request from '../../utils/EpsRequest';

import LoadMore from './../../components/Common/LoadMore';

import UserCard from './../../components/Common/UserCard';
import TodoCard from './../../components/Common/TodoCard';
import MoneyShow from './../../components/Common/MoneyShow';
import RejectTip from './../../components/Common/RejectTip';
import EpsDialog from './../../components/Common/EpsDialog';
import { MemoDialog ,EvaluateDialog} from '../../components/Common/EpsModal';
import { AlertBase, ConfirmBase } from '../../components/Common/EpsModal';
import { openChart } from '../../constants';

import {Button} from 'jw-components-mobile';
import Form from "jw-form/dist/mobile";
import { getDict,getUsers,orderStatus} from '../../constants';

const eid=userinfo.employee_id;

 let FeeRate = getDict('taxlist');
  // console.log("FeeRate:",FeeRate,"equipmentOperation:",equipmentOperation)
class Process extends Component {

	constructor(props) {
		super(props);
		this.state = {
			operationed: false
		}
		this.openWebView= this.openWebView.bind(this);
		this.EvaluateRefuse = this.EvaluateRefuse.bind(this);
	}
	FormChange(values,schema){
		console.log("values:",values,"FormChange:",schema);
	}
	changeData(data){
	}
	render(){
		if(this.props.processdevice.loading){
			return (<div className="todos-loading">
							<img src="images/loading.gif" />
							<span>加载中</span>
						</div>)
		}else{
			let view = this._init_view();
			return (<div className="root-container device">
				{view}
			</div>
		);
		}
	}
	_init_view(){
		let view = '';
		let data = this.props.processdevice;
		let formData={};
		let rejectTip =''
		console.log('Marlin',data);
		if(this.props.location.query.type!='4'){
			formData={
				className:'clear-padding',
				schema:[
					{
						name:'feedback',element:'Textarea',
						defaultValue:(data['form'] && data['form']['feedback'] ? data['form']['feedback'] :  ''),
						attr:{
							placeholder:(data['epsDialog']['type']=="agree"?'请输入备注':'拒绝必须输入备注...'),
							autoHeight:true,
							count:200,
						},
						events:{
							onChange(){
								let height = $('.eps-dialog-w').height();
								$('.eps-dialog-w').css({
									marginTop:-(height/2)+'px'
								})
							}
						},
						rules:[]
					}
				],
				buttons:false,
				changeData:this.changeData.bind(this)
			}
			if(this.props.location.query.type=='3'){
				rejectTip = <RejectTip data={data['epsTip']} close={(e)=>this.closeTip(e)}></RejectTip>
			}
		}else{
		}
		let EpsDialogComponent = <div className="appraisal-form">
			<Form ref='form' formData={formData} onChange={(values,schema)=>this.FormChange(values,schema)}/>
		</div>;
		let showScrapTip = 0;
		
		let allPartMoney = {
		}
		if(data['partList'] && data['partList'].length!=0){
			_.each(data['partList'],function(i){
				if(i['totalMaintenanceCost']>=3000 || i['partIsFa'] == 'Y' ){
					showScrapTip = showScrapTip+1
				}
				if(allPartMoney[i['deviceName']+'*'+i['deviceNumber']]){
					allPartMoney[i['deviceName']+'*'+i['deviceNumber']] = allPartMoney[i['deviceName']+'*'+i['deviceNumber']] +i['totalMaintenanceCost'];
				}else{
					allPartMoney[i['deviceName']+'*'+i['deviceNumber']] = i['totalMaintenanceCost'];
				}
				// allPartMoney = allPartMoney + i['totalMaintenanceCost'];
			})
		}
		console.log(data["deviceList"],'这个里面有啥呢');
		_.each(allPartMoney,function(i,key){
			let keys = key.split('*');
			console.log(keys,'keyssadasd')
			if(i>=9000){
				var datas = _.findWhere(data['deviceList'],{deviceName:keys[0],deviceNumber:keys[1]});
				console.log('xcasdasdasdasdasdasda',datas);
				datas['totalMaintenanceCost'] = i;
			}
		})

		console.log(data['partList'],data["deviceList"],'partList',allPartMoney)
		if(data['deviceList'] && data['deviceList'].length!=0){
			_.each(data['deviceList'],function(i){
				if(i['totalMaintenanceCost']>=9000){
					showScrapTip = showScrapTip+1
				}
			})	
		}
		this.showScrapTip = showScrapTip;
		console.log('这个里面的数据有啥',data,'2123123123123123123123')
		console.log(this.showScrapTip,'这个值是多少呢');
		view = <div className="root-container-w">
			<header className="header header-with-memo" ref="header">
				<div className="header-bg"></div>
				<div className="header-bg-2"></div>
				<div className="header-c">
					<UserCard data={_.extend({},this.props.processdevice.creatorinfo,{
						avatar:this.props.processdevice['avatar'],
						fileCount:this.props.processdevice['fileCount'] || 0,
						uploadPhaseName:this.props.processdevice['uploadPhaseName'] || '',
						scrapPageInfo:(data['storeScrapList']),
						partList:data['partList'],
						deviceList:data['deviceList'],
						storeNumber:data['storeNumber'],
						scrappType:'repair',
						scrappOrderType:'device',
						showScrapTip:showScrapTip,
						addScrap:(window.isUnfinishedOrHistory()==false && (this.props.location.query.type=='1' || this.props.location.query.type=='4')?true:false)
					})} />
				</div>
			</header>
			<sesstion className="main">
				<div className="main-c device-c">
					<div >
						<TodoCard showAllData={true} openView={this.openWebView} devicedata={this.props.processdevice.itemDevice} deviceDetailInfo={false} ></TodoCard>
					</div>
				</div>
			</sesstion>
			<MoneyShow allData={this.props.processdevice}  />
			<footer className="footer">
				<div className="log-btn" onClick={(e)=>this.openLog()}>
					<i className="icon-log"></i>
					<span>流程日志</span>
				</div>
				{
					this.footerRender(data)
				}
			</footer>
		</div>;
		return view
	}
	// 组件加载完毕
	footerRender(data){
		if( isUnfinishedOrHistory() ){
			let strOrderSta = data['orderState'] && orderStatus["repair"][data['orderState']]?orderStatus["repair"][data['orderState']]:{'label':''};
			return <div className="todo-info-status" onClick={(e)=>this.openProcessTable()}><i className="icon-time-b"></i><div className="todo-status-c"><span className="todo-status-title">{strOrderSta["label"]}</span><span className="todo-status-tip">{strOrderSta["val"]}</span></div></div>;
			/*return <div className="eps-btn-wrap">
				<div className="eps-btn eps-btn-status-large" onClick={(e)=>this.openProcessTable()}><i className="icon-check"></i><span>{strOrderSta["label"]}</span></div>
			</div>;*/
		}

    switch(this.props.location.query.type){
			/*case '100':
			return <div className="eps-btn-wrap">
					<Button className="eps-btn eps-btn-default-large status" disabled >{infostate?infostate:''}</Button>
				</div>;
		  break;*/
		  case '1':
		  	if(this.state.operationed){
					return <div className="eps-btn-wrap">
						<div className="eps-btn eps-btn-cancel-small there-btn" onClick={(e)=>this.cancel(e)}>取消</div>
						<div className={this.state.operationed?"eps-btn eps-btn-default-small  diabled  there-btn":"eps-btn eps-btn-default-small"} >拒绝</div>
						<div className={this.state.operationed?"eps-btn eps-btn-warning-large disabled  there-btn":"eps-btn eps-btn-warning-large"}>确认</div>
					</div>
				}else{
						return <div className="eps-btn-wrap">
						<div className="eps-btn eps-btn-cancel-small there-btn" onClick={(e)=>this.cancel(e)}>取消</div>
						<div className={this.state.operationed?"eps-btn eps-btn-default-small diabled  there-btn":"eps-btn eps-btn-default-small there-btn"} onClick={(e)=>this.reject(e,this.props.location.query.type)}>拒绝</div>
						<div className={this.state.operationed?"eps-btn eps-btn-warning-large disabled  there-btn":"eps-btn eps-btn-warning-large there-btn"} onClick={(e)=>this.agree(e,this.props.location.query.type)}>确认</div>
					</div>
				}
				break;
		  case '4':
      if(this.state.operationed){
				return <div className="eps-btn-wrap">
					<div className={this.state.operationed?"eps-btn eps-btn-default-small  diabled":"eps-btn eps-btn-default-small"} >拒绝</div>
					<div className={this.state.operationed?"eps-btn eps-btn-warning-large disabled":"eps-btn eps-btn-warning-large"}>确认</div>
				</div>
			}else{
				return <div className="eps-btn-wrap">
					
					<div className={this.state.operationed?"eps-btn eps-btn-default-small diabled":"eps-btn eps-btn-default-small"} onClick={(e)=>this.EvaluateRefuse()}>拒绝</div>
					<div className={this.state.operationed?"eps-btn eps-btn-warning-large disabled ":"eps-btn eps-btn-warning-large"} onClick={(e)=>this.EvaluateAgree(e,this.props.location.query.type)}>确认</div>
				</div>
			}
			break;
		 default :
		 	if(this.state.operationed){
				return <div className="eps-btn-wrap">
					<div className={this.state.operationed?"eps-btn eps-btn-default-small  diabled":"eps-btn eps-btn-default-small"} >拒绝</div>
					<div className={this.state.operationed?"eps-btn eps-btn-warning-large disabled":"eps-btn eps-btn-warning-large"}>确认</div>
				</div>
			}else{
					return <div className="eps-btn-wrap">
					<div className={this.state.operationed?"eps-btn eps-btn-default-small diabled":"eps-btn eps-btn-default-small"} onClick={(e)=>this.reject(e,this.props.location.query.type)}>拒绝</div>
					<div className={this.state.operationed?"eps-btn eps-btn-warning-large disabled":"eps-btn eps-btn-warning-large"} onClick={(e)=>this.agree(e,this.props.location.query.type)}>确认</div>
				</div>
			}
			break;
		}
	}
	onEndReached(){}
	openWebView(data){
		let datas = this.props.processdevice;
		let time = datas['updateDate'].split('.')[0];
		let updateDate = encodeURIComponent(time);
		var url = EpsWebRoot+'/#'+data+this.props.params.orderid+'?updateDate='+updateDate;
		jw.pushWebView(url);
	}
	openProcessTable(){
		let data = this.props.processdevice;
		data['logType'] = 'repair';
		window.upTabsData('log','cache',data)
		var url = EpsWebRoot+'/#approval/'+this.props.params['orderid'];
		jw.pushWebView(url);
	}
	closeTip(){
		let dispatch = this.props.dispatch;
		let data = this.props.processdevice;
		let epsTip = _.extend(data['epsTip'],{
			show:false
		});
		dispatch({
			type:'processdevice/changeData',
			data:{
				epsTip:epsTip
			}
		})
	}
	closeDialog(){
		console.log('closeDialog')
		let dispatch = this.props.dispatch;
		let data = this.props.processdevice;
		let epsDialog = _.extend(data['epsDialog'],{
			show:false
		});
		dispatch({
			type:'processdevice/changeData',
			data:{
				epsDialog:epsDialog
			}
		})
	}
	 //确认提交订单
	approveSubmit(e,type,value,callback){
 		if(type=='1'||type=='2'||type=='3'){
			let self=this;
			console.log(type,"确认提交订单",this.props.processdevice)
			request('/McdEpsApi/joywok/repair/submitOrderInfo',{
	      method:'POST',
	      body:JSON.stringify({
	        param:{
	          eid: eid,
	          record: {
	              updateDate: self.props.processdevice.updateDate,
	              orderNumber:self.props.processdevice.orderNumber,
	              orderState: self.props.processdevice.orderState,
	              confirmFlag:'Approve',
	              refuseRemarks: value,
	              orderMoney:self.props.processdevice.orderMoney+'',
	              storeScrapList:self.props.processdevice['storeScrapList']||[]
	          }
	        }
	      })
	    }).then(function(resp){
	       if(resp.data.success){
	       	self.setState({'operationed': true});
	       	AlertBase({
						tip: '已成功提交',
						icon: 'icon-save-success',
						onOk: ()=>{
							jw.closeWebView()
						}
					});
	       }else{
	        	if(typeof(callback)!='undefined'){
		          callback(true);
		        }
	       }

	    })
		}else if(type=='4'){
				
		}
	}
	cancel(){
		let orderid = this.props.params.orderid.split("&")[0];
		let modelData = this.props.processdevice;
		let self = this;
		// let orderDate = modelData['creatorinfo']['time'];
		// console.log(modelData,'123123123123',orderDate);
		// return 
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
	    				orderDate:modelData["orderDate"],
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
	reject(e,type){
		// $('.eps-dialog').hide();
		console.log('closeDialog')

		let self = this;
		let rejectDialog = MemoDialog({
			title:'是否拒绝该订单?',
			defaultValue: self.rejectMemo ?  self.rejectMemo : '',
			btnIconClass:'icon-reject',
      btnVal: '拒绝',
			placeholder: '拒绝必须输入备注...', 
      memorequired: true, 
      onBtnClick: (memo,callback)=>{ 
      	self.rejectsubmit(e,type,memo,callback);
      },
      changeData:(value)=>{
        self.changeRefuseRemark(value[0]['defaultValue'])
      },
      onClose: (memo)=>{  
      	self.rejectMemo = memo;
				console.log('approve reject onClose:')
      },
		});
	}
	//订单备注修改
	changeRefuseRemark(value){
	  let dispatch=this.props.dispatch;
	  dispatch({
	    type:'processdevice/changeData',
	    payload:{
	      refuseRemarks:value,
	      confirmFlag:'Refuse',
	    }
	  })
 	}


 //拒绝订单提交
	rejectsubmit(e,type,memo,callback){
			let self=this;
			request('/McdEpsApi/joywok/repair/submitOrderInfo',{
	      method:'POST',
	      body:JSON.stringify({
	        param:{
	          eid: eid,
	          record: {
	              updateDate:self.props.processdevice.updateDate ,
	              orderNumber:self.props.processdevice.orderNumber,
	              orderState: self.props.processdevice.orderState,
	              confirmFlag:'Refuse',
	              refuseRemarks: memo,
	          }
	        }
	      })
	    }).then(function(resp){
	       if(resp.data.success){
	       	// self.rejectMemo = memo;
	       	self.setState({'operationed': true});
	       	AlertBase({
						tip: '已成功提交',
						icon: 'icon-save-success',
						onOk: ()=>{
							jw.closeWebView()
						}
					});
	       }else{
		       	if(typeof(callback)!='undefined'){
	          callback(true);
	        }
	       	 self.rejectMemo = memo;
	         console.log("fail")
	       }
	    })
   
	}

	//餐厅确认 、doa 审批 确认
	agree(e,type){
		let self=this;
		let storeScrapList = self.props.processdevice['storeScrapList'];
		if(this.showScrapTip!=0 && storeScrapList.length==0){
			AlertBase({
				tip: '请挑选资产！！',
				icon: 'icon-save-error',
				onOk: ()=>{}
			});
			return 
		}
		let dispatch = this.props.dispatch;
		let data = this.props.processdevice;
		let orderid=this.props.params.orderid;
		let orderState=data.orderState;
		let epsDialog = MemoDialog({
			title:'确认通过?',
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
	    				updateDate:data["updateDate"],
	    				orderNumber:orderid,
	    				confirmFlag:true,
	    				orderState: orderState,
	    				refuseRemarks: memo || '',
	    				storeScrapList:self.props.processdevice['storeScrapList']||[]
	    			}
	    		}
			  }
			  self.approveSubmit(e,type,memo,callback)
      },
      onClose: (memo)=>{  
      	self.rejectMemo = memo;
				console.log('approve reject onClose:')
      },
		});
	}
	//拒绝评价
	EvaluateRefuse(){
		let orderid=this.props.params.orderid;
		console.log(this.props,"拒绝评价");
		let self=this;
		let processData=this.props.processdevice;
		let epsDialog = MemoDialog({
			title:'是否拒绝该订单？',
			defaultValue: self.agreeMemo ?  self.agreeMemo : '',
			btnIconClass:'icon-reject',
	    btnVal: '拒绝',
			placeholder: '拒绝必须输入备注...',
			changeData:function(){},
	    memorequired: true, 
	    onBtnClick: (memo,callback)=>{ 
	      setTimeout(function(){
	      	let saving = AlertBase({
						tip: '正在提交',
						icon: 'icon-saving',
						okBtn: {
							text: '提交中...'
						},
						onOk: ()=>{
							console.log('onOk')
						}
					});
					request('/McdEpsApi/joywok/repair/submitStoreEvaluate',{
			    	method:'POST',
			    	body:JSON.stringify({
			    		param:{
			    			eid:eid,
				    		record:{
									confirmFlag:'Refuse',
				    			orderNumber:orderid,
				    			updateDate:self.props.processdevice.updateDate,
				    			orderState:'7',
				    			confirmRepairRmrk:memo,
				    		}
			    		}
			    	})
			    }).then(function(resp){
			    	if(resp['data']['success']==false){
			    		if(typeof(callback)!='undefined'){
			          callback(true);
			        }
			    	}else{
			    		saving.close();
			    		AlertBase({
								tip: '已成功提交',
								icon: 'icon-save-success',
								onOk: ()=>{
									jw.closeWebView();
								}
							});
			    	}
			    })
	      },500) 
	    },
	    onClose: (memo)=>{  
	    	self.rejectMemo = memo;
				console.log('approve reject onClose:')
	    },
		});
	}

	// 餐厅确认 评分页面
	EvaluateAgree(data){
		let self=this;
		let storeScrapList = self.props.processdevice['storeScrapList'];
		if(this.showScrapTip!=0 && storeScrapList.length==0){
			AlertBase({
				tip: '请挑选资产！！',
				icon: 'icon-save-error',
				onOk: ()=>{}
			});
			return 
		}
		console.log(data,"餐厅评分")
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
					rules:[]
				}
			}).concat({
				name:'confirmRepairRmrk',element:'Textarea',
				defaultValue:(typeof(window.EvaluateCache)!='undefined'?window.EvaluateCache['confirmRepairRmrk']:''),
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
      if(hasOne && data['confirmRepairRmrk'].length==0){
        AlertBase({
          tip: '由于评星较低，请输入备注！！',
          icon: 'icon-save-error',
          onOk: ()=>{}
        });
        return false
      }
    // 	if(data['confirmRepairRmrk'].length==0){
    // 		AlertBase({
				// 	tip: '请输入备注!',
				// 	icon: 'icon-save-error',
				// 	onOk: ()=>{}
				// });
				// return false;
    // 	}
    	return true
    },
	  onBtnClick:(data,callback)=>{
	  	console.log(data,"data");
	  	let orderid=self.props.params.orderid;
	  	let updateDate=self.props.processdevice['updateDate'];
	  	setTimeout(function(){
	  		 let saving = AlertBase({
						tip: '正在提交评价',
						icon: 'icon-saving',
						okBtn: {
							text: '提交中...'
						},
						onOk: ()=>{
							console.log('onOk')
						}
				});
		  	request('/McdEpsApi/joywok/repair/submitStoreEvaluate',{
		    	method:'POST',
		    	body:JSON.stringify({
		    		param:{
		    				eid:eid,
				    		record:_.extend({
									confirmFlag:'Approve',
				    			orderNumber:orderid,
				    			updateDate:updateDate,
				    			orderState:'7',
				    			storeScrapList:self.props.processdevice['storeScrapList']||[]
				    		},data)
		    		}			
		    	})
		    }).then(function(resp){
		    	if(resp['data']['success']==false){
		    		if(typeof(callback)!='undefined'){
		          callback(true);
		        }
		    	}else{
		    		saving.close();
		    		AlertBase({
							tip: '已成功提交',
							icon: 'icon-save-success',
							onOk: ()=>{
								jw.closeWebView();
							}
						});
		    	}
		    })
	  	},500)

	   },
	   onClose: (memo)=>{  
	    	self.rejectMemo = memo;
				console.log('approve reject onClose:')
	   },
		});
	}

	//查看流程日志
	openLog(){
		let url = EpsWebRoot+'/#/log/'+this.props.params['orderid'];
		let data = this.props.processdevice;
		console.log(data,"log:data")
		data['logType'] ='repair';
		window.upTabsData('log','cache',data)
    jw.pushWebView(url);
	}
	componentDidMount(){
		let self = this;
		jw.setFuncBtns([{type:4}]);
		this.setHeight();
		let dispatch = this.props.dispatch;
		setTimeout(function(){
			let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			let header = $('.header').height() || 0;
			let footer = $('.footer').height() || 0;
			let money = $('.money-show').height() || 0;
			$('.main-c').css({height:clientHeight-header-money-footer+'px'});
			request('/McdEpsApi/joywok/repair/getEquipmentList',{
	      method:'POST',
	      body:JSON.stringify({
	        param:{
	        	eid: eid,
	          condition:{
	            orderNumber:self.props.params.orderid,
	            orderState:self.props.processdevice.orderState,
	          },
	          pager:{pageNum:'1',}
	        }
	      })
	    }).then(function(resp){
	      if(resp['data']['success']==false){
	      }else{
	        NProgress.done();
	        let data=resp['data']['body'];
	        console.log(data,'1231231231231231231');
	        let creatorinfo={};
	        creatorinfo.name=data.createBy;
	        creatorinfo.remark=data.maintenanceRemarks;
	        creatorinfo.time=data.dateAppointment;
	        creatorinfo.orderNumber=data.orderNumber;
	        creatorinfo.orderState=data.orderState;
	        creatorinfo.storeName=data.storeName;
	        creatorinfo.repairType=data.repairType;
	        let DeviceInfo =self.DevicePartList(data);
	        let FeeList=self.FeeList(data);
	        console.log(FeeList,"FeeList")
	        console.log(DeviceInfo.PurchaseMoney,"DeviceInfo.PurchaseMoney")
	        let orderMoney=DeviceInfo.PurchaseMoney+FeeList['carCost']+FeeList['hotelCost']+FeeList['otherCost']+FeeList['installationFee'];
	        // console.log('这个钱是多少啊a',orderMoney,DeviceInfo.PurchaseMoney,FeeList['carCost'],FeeList['hotelCost'],FeeList['otherCost'],FeeList['installationFee'],DeviceInfo.PurchaseMoney+FeeList['carCost']+FeeList['hotelCost']+FeeList['otherCost']+FeeList['installationFee'])
	        let allkeys=_.keys(DeviceInfo.deviceList,"deviceList")
	        let partList = [],deviceList = [];
	        _.each(data['pageInfo']['list'],function(i){
	        	if(i['partName']){
	        		partList.push(i)
	        	}else{
	        		deviceList.push(i)
	        	}
	        })

	        let storeScrapList = [];
		      _.each(data['scrapPageInfo']['list'],function(i){
		      	console.log(i,'这个里面有啥');
		        if(_.findWhere(data["pageInfo"]["list"],{deviceName:i['deviceName']})){
		          storeScrapList.push(i)
		        }
		      })

		      // console.log(storeScrapList,'zzzzzzzzzzzz');
	        dispatch({
	          type:'processdevice/changeData',
	          data:_.extend({
	          	loading:false,
	            itemDevice:DeviceInfo.deviceList[allkeys[0]],//设备列表中的第一条数据
	            creatorinfo:creatorinfo,//
	            costList:data.costList,//杂费列表
	            incidentalList:data.incidentalList,
	            PurchaseMoney:self.turnMoney(DeviceInfo.PurchaseMoney)+DeviceInfo.PurchaseRate,
	            FeeList:FeeList,
	            DevicePartList:DeviceInfo.deviceList,
	            orderMoney:orderMoney,
	            orderState:data.orderState,
	            partList:partList,
	            deviceList:deviceList,
	            storeScrapList:storeScrapList
	          },resp['data']['body'])
	        })

	        getUsers(data['createEid'],'num',function(resp){
	        	let userdata = resp['data'][0];
	        	dispatch({
		          type:'processdevice/changeData',
		          data:{
		          	avatar:userdata['avatar']
		          }
		        })
	        })
	      }
	    })
		},0)
		if(self.props.processdevice.type=='4'){
			request('/McdEpsApi/joywok/common/getEvaluate',{
				method: 'POST',
		    body:JSON.stringify({
		    	param:{
		    		eid:eid,
		    		condition: {
				      orderNumber:self.props.params.orderid,
				    }
			    }
		    })
			}).then(function(resp){
				window.Evaluate = resp['data']['body'];
			})
		}
		window.onJwNavBtnClick = function(data){
			if(data['type'] == '4'){
				let modelData = self.props.processdevice;
				openChart(eid,modelData['orderNumber'],'测试')
			}
		}
		PubSub.subscribe('add:scrapped',function(evt,data){
			dispatch({ type: 'processdevice/changeData', data:{
				storeScrapList:_.map(data,function(i){return i})
			}});
		});
		NProgress.done();
		let data = this.props.processdevice;
		
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
			// let top = $('.div-sticky').height() || 0;
			// let upload = $('.upload-file').height()||0;
			// 
			let footer = $('.eps-footer').height() || 0;
			console.log(clientHeight,header,top,footer,upload);
			// $('.eps-empty-tip-arrow').css({height:clientHeight-header-top-footer-upload-30+'px'});
			$('.root-container.device').css({height:clientHeight+'px'});
		},0)
	}
	//
	turnMoney(data){
		return Number(data).formatMoney(2,'','')
	}
	//重组设备配件列表
	DevicePartList(data){
		let devicepartlist=data.pageInfo.list;
		let deviceList={};
		console.log(devicepartlist,"devicepartlist")
		_.each(devicepartlist,function(item){
			console.log(item,"item")
			if(item&&(!item.partName)){
				let deviceObj=_.extend({},item);
				deviceObj.partList=[];
				deviceList[item.deviceNumber]=deviceObj;
			}
		})
		let PurchaseMoney=0;
		let partList=_.filter(data.pageInfo.list,function(item){
			return item.partName
		})
		console.log(partList,"partList")
		let PurchaseRate = ' (-)';
		let rate='';
		if(partList.length>0){
			 // PurchaseRate=partList[0]['rate'];
			 console.log(partList,PurchaseRate,"PurchaseRatezzzzzzzzzz")
			 partList = _.filter(partList,function(i){
			 		if(i['operate'] == '2'){
				 		PurchaseRate=(PurchaseRate==' (-)')?PurchaseRate:' ('+PurchaseRate+')';
						PurchaseMoney=i.totalMaintenanceCost+PurchaseMoney-0;
						deviceList[i.deviceNumber]['partList'].push(i)	
				 	}
			   return i['operate']=='2'
			 })
			 _.each(partList,function(item,index){
				if(index == 0){
					rate=partList[0]['rate'];
					PurchaseRate=' ('+partList[0]['rate']+')';
				}else{
					if(item.rate==rate){
						// PurchaseRate=item.rate;
					}else{
						PurchaseRate=' (-)';
					}	
				}
			})
		}else{
			PurchaseRate='(-)';
		}
		console.log(PurchaseRate,"PurchaseRate")
		 return {deviceList:deviceList,PurchaseMoney:(Math.floor(PurchaseMoney* 100) / 100),PurchaseRate:PurchaseRate};
	}
	 // 费用列表
	FeeList(data){
		let self = this;
		let carCost=0;
		let hotelCost=0;
		let otherCost=0;
		let installationFee=0;
		let otherCostTax='';
		let hotelCostTax='';
		let carCostTax='';
		let installationFeeRate='';
		console.log(data,"data")
		_.map(data.incidentalList,function(item,index){
			let ItemData = _.findWhere(data['pageInfo']['list'],{deviceNumber:item['deviceNumber']})||{}
			console.log(item,"ItemData")
			if(item.otherCostTax&&item.otherCost){
     		otherCostTax=item.otherCostTax;
     		if(index<1){
     		 	otherCostTax=item.otherCostTax;
     		 }else{
     		 	if(otherCostTax==item.otherCostTax){
     		 		otherCostTax=item.otherCostTax;
     		 	}else{
     		 		otherCostTax='-';
     		 	}
     		 }
     	}else{
     		otherCostTax='-';
     	}
     	if(item.hotelCostTax&&item.hotelCostTax!='0'){
     		 if(index<1){
     		 	hotelCostTax=item.hotelCostTax;
     		 }else{
     		 	if(hotelCostTax==item.hotelCostTax){
     		 		hotelCostTax=item.hotelCostTax;
     		 	}else{
     		 		hotelCostTax='-';
     		 	}
     		 }
     	}else{
     		hotelCostTax='-';
     	}
     	if(item.carCostTax&&item.carCostTax!='0'){
     		if(index<1){
     		 	carCostTax=item.carCostTax;
     		 }else{
     		 	if(carCostTax==item.carCostTax){
     		 		carCostTax=item.carCostTax;
     		 	}else{
     		 		carCostTax='-';
     		 	}
     		 }
     	}else{
     		carCostTax='-';
     	}
     	if(item.installationFeeRate&&item.installationFee!='0'){
     		if(index<1){
     		 	installationFeeRate=item.installationFeeRate;
     		 }else{
     		 	if(installationFeeRate==item.installationFeeRate){
     		 		installationFeeRate=item.installationFeeRate;
     		 	}else{
     		 		installationFeeRate='-';
     		 	}
     		 }
     	}else{
     		installationFeeRate='-';
     	}
     	carCost=item.carCost+carCost;
     	hotelCost=item.hotelCost+hotelCost;
     	otherCost=item.otherCost+otherCost;
     	installationFee=item.installationFee+installationFee;
		})
		return {
			 carCost:carCost,
			 hotelCost:hotelCost,
			 otherCost:otherCost,
			 installationFee:installationFee,
			 otherCostTax:otherCostTax,
			 carCostTax:carCostTax,
			 hotelCostTax:hotelCostTax,
			 installationFeeRate:installationFeeRate,
		}
	}
}
function mapStateToProps(state) {

	let type=state.routing.locationBeforeTransitions.query.type,
		sta=state.routing.locationBeforeTransitions.query.sta;
	state.processdevice.type=type;
	let title='';
	if( isUnfinishedOrHistory() ){
		title = sta=='1'?'在途订单':'历史订单';
	}else{
		//1:餐厅待确认
		//2：DOA审批
		//3：审批未通过，餐厅再次审批
		//4：餐厅确认订单，评价	let title;
		//100：详情	let title;
		switch(type){
			case '1':
			 title = "评估确认";
			break;
			case '2':
			 title = "DOA审批";
			break;
			case '3':
			 title = "调整后审批";
			break;
			case '4':
			 title = "调整与评估";
			break;
			case '100':
		  	title = "订单详情";
			break;
			default:
				title = '';
			break;
		}
	}
  
	jw.setTitle({title:title});
	
	return state
}
export default connect(mapStateToProps)(Process);