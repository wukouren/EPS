/**
 * IT审批 餐厅IT确认
 * type=1,2,3,4
 * //1:餐厅待确认
	//2：DOA审批
	//3：审批未通过，餐厅再次审批 3同1 合并，3不需要了
	//4：餐厅确认订单，评价
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import request from '../../utils/EpsRequest';
import LoadMore from './../../components/Common/LoadMore';
import UserCard from './../../components/Common/UserCardToIt';
import TodoCard from './../../components/Common/TodoCardIt';
import MoneyShow from './../../components/Common/MoneyShowIt';
import RejectTip from './../../components/Common/RejectTip';
import EpsDialog from './../../components/Common/EpsDialog';
import { MemoDialog ,EvaluateDialog} from '../../components/Common/EpsModal';
import { AlertBase, ConfirmBase } from '../../components/Common/EpsModal';
import Form from "jw-form/dist/mobile";
import { openChart, orderStatus, getDictVal } from '../../constants';
import { EpsCosts } from './../../components/Common/EpsCosts';
// import request from '../../utils/EpsRequest';

class Process extends Component {
	constructor(props) {
		super(props);
		this.callJWFuncs = this.callJWFuncs.bind(this);
	}
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
		let view = '';
		let data = this.props.process;
		let formData={};
		let rejectTip ='';
		let orderid = this.props.params.orderid.split("&")[0];
		let btn = '';
		let strOrderSta = data['orderState'] && orderStatus["repair"][data['orderState']]?orderStatus["repair"][data['orderState']]:{'label':''};

		if(data['loading']['loading']){
			btn = <div className="todo-info-status"><div className="eps-btn eps-btn-default-small">加载中…</div></div>
		}else{
			if( isUnfinishedOrHistory() ){
				btn = <div className="todo-info-status" onClick={(e)=>this.openProcessTable()}><i className="icon-time-b"></i><div className="todo-status-c"><span className="todo-status-title">{strOrderSta["label"]}</span><span className="todo-status-tip">{strOrderSta["val"]}</span></div></div>;
			}else{

				if(this.props.location.query.type=='1'){
					btn = <div className="eps-btn-wrap">
						<div className="eps-btn eps-btn-cancel-small there-btn" onClick={(e)=>this.cancel(e)}>取消</div>
						<div className="eps-btn eps-btn-default-small there-btn" onClick={(e)=>this.reject(e,this.props.location.query.type)}>拒绝</div>
						<div className="eps-btn eps-btn-warning-large there-btn" onClick={(e)=>this.agree(e,this.props.location.query.type)}>确认</div>
					</div>
				}else{
					btn = <div className="eps-btn-wrap">
						<div className="eps-btn eps-btn-default-small" onClick={(e)=>this.reject(e,this.props.location.query.type)}>拒绝</div>
						<div className="eps-btn eps-btn-warning-large" onClick={(e)=>this.agree(e,this.props.location.query.type)}>确认</div>
					</div>
				}

				
			}
		}
		// if(data['type']!='4'){
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
			if(data['type']=='3'){
				rejectTip = <RejectTip data={data['epsTip']} close={(e)=>this.closeTip(e)}></RejectTip>
			}
		let EpsDialogComponent = <div className="appraisal-form">
			<Form ref='form' formData={formData} onChange={(values,schema)=>this.FormChange(values,schema)}/>
		</div>;
		if(this.props.process.loading.loading){
			view = (<div className="todos-loading">
							<img src="images/loading.gif" />
							<span>加载中</span>
						</div>);
		}else{
			let datas = this.props.process;
			let time = datas['updateDate'].split('.')[0];
			let updateDate = encodeURIComponent(time);
			
			let showScrapTip = 0;
			let allPartMoney = {
			}
			if(data['partList'] && data['partList'].length!=0){
				_.each(data['partList'],function(i){
					let money = i['purchasingPrice'] * i['maintenanceNum']
					if(money >=3000 || i['isFa']=='Y' || i['isFa']=='y' ){
						showScrapTip = showScrapTip+1
					}
					let typeNumber = _.findWhere(data['pageInfo']['list'],{itDeviceName:i['itDeviceName'],itDeviceNumber:i['itDeviceNumber']})["typeNumber"]
					// console.log(typeNumber,'哈哈哈哈哈哈')
					i['typeNumber'] = typeNumber
					// console.log(_.findWhere(data['pageInfo']['list'],{itDeviceName:i['itDeviceName'],itDeviceNumber:i['itDeviceNumber']})['typeNumber'],'哈哈哈哈哈哈')
					if(allPartMoney[i['itDeviceName']+'/'+i['itDeviceNumber']]){
						allPartMoney[i['itDeviceName']+'/'+i['itDeviceNumber']] = allPartMoney[i['itDeviceName']+'/'+i['itDeviceNumber']] +money;
					}else{
						allPartMoney[i['itDeviceName']+'/'+i['itDeviceNumber']] = money;
					}
				})
			}
			_.each(allPartMoney,function(i,key){
				let keys = key.split('/');
				// console.log(keys,'keyssadasd')
				if(i>=9000){
					var datas = _.findWhere(data['partList'],{itDeviceName:keys[0],itDeviceNumber:keys[1]});
					datas['totalMaintenanceCost'] = i;
				}
			})

			if(data['partList'] && data['partList'].length!=0){
				_.each(data['partList'],function(i){
					if(Number(i['totalMaintenanceCost'])>=9000){
						showScrapTip = showScrapTip+1
					}
				})	
			}
			if(data['deviceList'] && data['deviceList'].length!=0){
				_.each(data['deviceList'],function(i){
					if(Number(i['totalMaintenanceCost'])>=9000){
						showScrapTip = showScrapTip+1
					}
				})	
			}
			// console.log(data,'这个里面有啥数据呢');
			// if(data['deviceList'] && data['deviceList'].length!=0){
			// 	_.each(data['deviceList'],function(i){
			// 		if(i['purchasingPrice']>=9000){
			// 			showScrapTip = showScrapTip+1
			// 		}
			// 	})	
			// }
			console.log(allPartMoney,showScrapTip,data,'dsadasdasdasdasdasdasdas')
			this.showScrapTip = showScrapTip
			view = (<div className="root-container-w my-fix-header">
				<header className="header header-with-memo xheight header-adapt" ref="header">
					<div className="header-bg"></div>
					<div className="header-c">
						<div className="header-bg-2-adapt"></div>
						<UserCard data={_.extend({},this.props.process,{
							remark:this.props.process['supRemarks'],
							avatar:this.props.process['avatar'],
							fileCount:this.props.process['fileCount'] || 0,
							uploadPhaseName:this.props.process['uploadPhaseName'] || '',
							scrapPageInfo:data['storeScrapList'],
							partList:data['partList'],
							deviceList:data['deviceList'],
							storeNumber:data['storeNumber'],
							scrappType:'repair',
							scrappOrderType:'it',
							showScrapTip:showScrapTip,
							addScrap:(window.isUnfinishedOrHistory()==false && (this.props.location.query.type=='1' || this.props.location.query.type=='4')?true:false)
						})}></UserCard>
					</div>
				</header>
				<sesstion className="main">
					<div className="main-c todo-info-it">
						<TodoCard data={this.props.process} openView={(e)=>this.openWebView('/repairing/it-info/'+orderid+'?updateDate='+updateDate)} viewmore={ true }></TodoCard>
						<LoadMore container='main-c' data={data['loading']} onEndReached={(e)=>{this.onEndReached(e)} }/>
					</div>
				</sesstion>
				<MoneyShow 
					data={this.props.process} 
					showFeeDetail={(e)=>{this.showFeeDetail(e)}}></MoneyShow>
				{rejectTip}
				<footer className="footer">
					<div className="log-btn" onClick={(e)=>this.openLog()}>
						<i className="icon-log"></i>
						<span>流程日志</span>
					</div>
					{btn}
				</footer>
			</div>);
		}
		return view
	}
	// type 费用类型 1 其他费用 2 采购费小计
	showFeeDetail(type){
		console.log('showFeeDetail type['+type+']', this.props.process);
		if(type == 1) this.combineOtherFeeDetail();
		else if(type == 2) this.combinePurchaseFeeDetail();
		return;
		EpsCosts({title:'采购材料费',body:<div>
			<div className="eps-popup-list-h3 materials-fee-h">
        <span>工程名称</span>
        <span>费用 (¥) </span>
      </div>
      <div className="eps-popup-list-item materials-fee">
        <div>
          <span className="ellipsis">车道及停车场</span>
          <span>76.86(6%)</span>
        </div>
        <div>
          <span className="ellipsis">车道及停车场-得来速</span>
          <span>76.86(6%)</span>
        </div>
      </div>
      <div className="eps-popup-list-foot">
        <div className="eps-popup-list-foot-total">
          <label>总价</label>
          <i className="icon-money"></i>
          <span>153.72</span>
        </div>
      </div>
     </div>});
	}
	// 拼装采购费
	combinePurchaseFeeDetail(){
		let data = this.props.process,
				devices = data.pageInfo && data.pageInfo.list ? data.pageInfo.list : [],
				Accessories = [],
				cost = (data && data.detailList  && data.detailList.length > 0)?
								data.detailList[0]: {totalMaintenanceCost:'',otherFeesRates:'1',lumpSumPrice:''};
		if(data.costList && data.costList.length>0 && devices.length>0){
			// Accessories
			_.each(devices, function(device){
				device['accessories'] = _.filter(data.costList, function(accessory){
					return device['itDeviceNumber'] == accessory['itDeviceNumber'];
				})
			})
		}
		console.log('devices',devices);//return;
		return;
		// 重新组织设备、配件数组
		EpsCosts({title:'采购材明细',body:<div>
      <div className="eps-popup-list-item">
      	{devices.map((device, i) => (
	      	<div>
	          <div className="eps-popup-list-h3 device-fee-h">
	            <span>设备名称</span>
	            <span>{device.itDeviceName}</span>
	          </div>
	          <div className="accessories-h">
	            <span className="device-name">配件名称</span>
	            <span className="device-price">价格(¥)</span>
	            <span className="device-num">数量</span>
	          </div>
	          <div className="accessories-list">
	            {device['accessories'].map((accessory, i) => (
	              <div className="accessories-item">
	                <span className="device-name">{accessory.partsName}</span>
	                <span className="device-price">{accessory.purchasingPrice.formatMoney(2,'','')}</span>
	                <span className="device-num">{accessory.maintenanceNum}</span>
	              </div>
	            ))}
	          </div>
	        </div>
        ))}
      </div>
      <div className="eps-popup-list-foot">
        <div className="eps-popup-list-foot-total">
          <label>总价</label>
          <i className="icon-money"></i>
          <span>{cost.totalMaintenanceCost.formatMoney(2,'','')}</span>
        </div>
      </div>
    </div>});
	}
	// 拼装其他费用明细弹出框 改变了方式，改到了详细页面
	combineOtherFeeDetail(){
		return;
		let data = this.props.process,
				cost = (data && data.detailList  && data.detailList.length > 0)?
								data.detailList[0]: {totalMaintenanceCost:'',otherFeesRates:'1',lumpSumPrice:''};
		let othercost = (cost.lumpSumPrice-cost.totalMaintenanceCost).formatMoney(2,'',''),
				taxRate = getDictVal('taxlist',(cost.otherFeesRates+''));
		return;
		EpsCosts({title:'其他费用明细',body:<div>
				<div className="eps-popup-list-h3 materials-fee-h">
            <span>费用 (¥)</span>
          </div>
          <div className="eps-popup-list-item materials-fee">
            <div>
              <span>{othercost+'('+taxRate+')'}</span>
            </div>
            <div className="fee-memo">
            	备注信息：{cost.otherCostRemark}
            </div>
          </div>
          <div className="eps-popup-list-foot">
            <div className="eps-popup-list-foot-total">
              <label>总价</label>
              <i className="icon-money"></i>
              <span>{othercost}</span>
            </div>
          </div>
         </div>});
	}
	// 组件加载完毕
	onEndReached(){}
	openWebView(data){
		var url = EpsWebRoot+'/#'+data
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
	    				orderDate:(modelData['orderDate'] || '2017-12-02 18:00:00'),
	    				orderState: modelData['orderState'],
	    				refuseRemarks: memo
	    			}
	    		}
			  }
			  // self.upData(datas,callback)
			  request('/McdEpsApi/joywok/repair/cancelItRepairPo',{
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
		console.log('reject')
		$('.eps-dialog').hide();
		let self = this;
		let confirmFlag="Refuse";
		let rejectDialog = MemoDialog({
			title:'是否拒绝该订单?',
			defaultValue: self.rejectMemo ?  self.rejectMemo : '',
			btnIconClass:'icon-reject',
      btnVal: '拒绝',
			placeholder: '拒绝必须输入备注...', 
      memorequired: true, 
      onBtnClick: (memo,callback)=>{  
      	self.rejectMemo = memo;
      	self.approveSubmit(e,type,memo,confirmFlag,callback)
      },
      onClose: (memo)=>{  
      	self.rejectMemo = memo;
				console.log('approve reject onClose:')
      },
		});
	}

	agree(e,type){
		// 餐厅确认&&评价 单独走一个接口
		if(this.props.location.query.type == '4'){
			this.EvaluateAgree();
			return;
		}


		let self=this;
		let storeScrapList = self.props.process['storeScrapList'];
		if(this.showScrapTip!=0 && storeScrapList.length==0){
			AlertBase({
				tip: '请挑选资产！！',
				icon: 'icon-save-error',
				onOk: ()=>{}
			});
			return 
		}


		let dispatch = this.props.dispatch;
		let data = this.props.process;
		let orderid=this.props.params.orderid;
		let orderState=data.orderState;
		let confirmFlag="Approve";
		let epsDialog = MemoDialog({
			title:'是否确认通过？',
			defaultValue: self.agreeMemo ?  self.agreeMemo : '',
			btnIconClass:'icon-check',
	    btnVal: '确认',
			placeholder: '请输入备注...',
			changeData:function(){},
	    memorequired:false, 
	    onBtnClick: (memo,callback)=>{  
			  self.approveSubmit(e,type,memo,confirmFlag,callback)
	    },
	    onClose: (memo)=>{  
	    	self.rejectMemo = memo;
				console.log('approve reject onClose:')
	    },
		});
		
	}

	//确认提交订单
  approveSubmit(e,type,value,confirmFlag,callback){
			let self=this;
			console.log(type,"确认提交订单",this.props.process)
			let requestUrl;
			// 餐厅确认&&评价 单独走一个接口
			if(this.props.location.query.type == '4'){
				requestUrl = '/McdEpsApi/joywok/repair/evaluate';
			}else{
				requestUrl = '/McdEpsApi/joywok/repair/submitItOrderInfo';
			}
			request(requestUrl,{
	      method:'POST',
	      body:JSON.stringify({
	        param:{
	          eid: eid,
	          record: {
              updateDate: self.props.process.updateDate,
              orderNumber:self.props.process.orderNumber,
              orderState: self.props.process.orderState,
              confirmFlag:confirmFlag,
              refuseRemarks: value,
              orderMoney:self.props.process.detailList[0]['lumpSumPrice'],
              storeScrapList:self.props.process['storeScrapList']||[]
	          }
	        }
	      })
	    }).then(function(resp){
	       if(resp.data.success){
	       	AlertBase({
						tip: '已成功提交',
						icon: 'icon-save-success',
						onOk: ()=>{
							setTimeout(function(){
								jw.closeWebView()
							},200)
						}
					});
	       }else{ 
		       if(typeof(callback)!='undefined'){
	          callback(true);
	        }	
	       }
	    })  
 }
 	//餐厅评价
  EvaluateAgree(){
    let EvaluateUrl='/McdEpsApi/joywok/repair/evaluate';
    console.log(window.RepairITEvaluate,"RepairITEvaluate")
    let self=this;
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
      btnVal: '完成',
      formData:{
        schema:_.map(window.RepairITEvaluate,function(val,key){ 
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
          name:'refuseRemarks',element:'Textarea',
          defaultValue:(typeof(window.EvaluateCache)!='undefined'?window.EvaluateCache['refuseRemarks']:''),
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
        for(var i in window.RepairITEvaluate){
          if(data[i]==0){
            AlertBase({
              tip: '请输入'+window.RepairITEvaluate[i]+'的评价!',
              icon: 'icon-save-error',
              onOk: ()=>{}
            });
            return false;
          }
        }
        let hasOne = false;
      	_.each(window.RepairITEvaluate,function(i,key){
      		if(data[key]<=2){
      			hasOne = true
      		}
      	})
      	if(hasOne && data['refuseRemarks'].length==0){
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

        let orderid=self.props.params.orderid;
        let eid=userinfo.employee_id;
        let updateDate=self.props.process['updateDate'];
          request(EvaluateUrl,{
            method:'POST',
            body:JSON.stringify({
              param:{
                  eid:eid,
                  record:_.extend({
                  	updateDate: self.props.process.updateDate,
			              orderNumber:self.props.process.orderNumber,
			              orderState: self.props.process.orderState,
			              confirmFlag:"Approve",
			              storeScrapList:self.props.process['storeScrapList']||[]
                  },data)
              }     
            })
          }).then(function(resp){
            // 把提交中按钮置为原样
            if(typeof(callback)=='function'){
              callback(true);
            }
            if(resp['data']['success']==false){
              
            }else{
              AlertBase({
                tip: '已成功提交',
                icon: 'icon-save-success',
                onOk: ()=>{
                  jw.closeWebView();
                }
              });
            }
          })
       },
       onClose: (memo)=>{  
          // self.rejectMemo = memo;
          console.log('approve reject onClose:')
       },
    });
  }

	openLog(){
		console.log("555")
		let url = EpsWebRoot+'/#/log/'+this.props.params['orderid'];
		let data = this.props.process;
		window.upTabsData('log','cache',data)
    jw.pushWebView(url);
	}
	openProcessTable(){
		let data = this.props.process;
		data['logType'] = 'repair';
		window.upTabsData('log','cache',data)
		var url = EpsWebRoot+'/#approval/'+this.props.params['orderid'];
		jw.pushWebView(url);
	}
	callJWFuncs(){
	  jw.setFuncBtns([{type:4}]);
	}
	componentDidMount(){
		NProgress.done();
		let self = this;
		let dispatch = this.props.dispatch;
		if(JWReady == true){
			this.callJWFuncs();
		}else{
			window.EpsEvents.off('jwready:ok').on('jwready:ok',()=>{
				self.callJWFuncs()
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
        openChart(eid,modelData['orderNumber'],'测试')
      }
    }
		let modelData = this.props.process;
		let orderid = this.props.params.orderid.split("&")[0];
		
		setTimeout(function(){
			// let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			// let header = $('.header').height() || 0;
			// let footer = $('.footer').height() || 0;
			// let moneyShow = $('.money-show').height() || 0;
			// $('.main-c').css({height:clientHeight-header-footer-moneyShow+'px'});
			dispatch({
				type:'process/changeData',
				data:{
					loading:{
						loading:false,
						fix:false,
						hide:true
					}
				}
			})
			self.setHeight();
		},0)
		// 请求数据
		dispatch({
			type:'process/getITOrderInfo',
			payload:{
    		eid:window.eid,
    		condition: {
		      orderNumber: orderid
		    },
		    'pager': {
		        'current': '1',
		        'rowCount': '3'
		    }
	    },
	    dispatch:dispatch
		})
		NProgress.done();
		//获取评价项：新增IT订单的评价项
    if(this.props.location.query.type == '4'){
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
        window.RepairITEvaluate = resp['data']['body'];
      })
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
			let header = $('.header').height() || 0;
			let footer = $('.footer').height() || 0;
			let moneyShow = $('.money-show').height() || 0;
			$('.main-c').css({height:clientHeight-header-footer-moneyShow-50+'px'});
		},0)
	}
}
function mapStateToProps(state) {
	let sta=state.routing.locationBeforeTransitions.query.sta;

	let hash = window.location.hash.split('?')[1].split('&');
	let nowHash = {};
	_.each(hash,(i)=>{
		let split = i.split('=');
		nowHash[split[0]] = split[1];
	})
	// console.log('nowHash', nowHash);
	let nowData = state;
	/*if(nowHash['type']){
		nowData['process']['type'] = nowHash['type']
	}else{
		nowData['process']['type'] = '1'
	}*/
	nowData['process']['type'] = nowHash['type']?nowHash['type']:'1';

	let title='';
	let orderState;

	if( isUnfinishedOrHistory() ){
		// 在途订单
		title = sta=='1'?'在途订单':'历史订单';
	}else{
		switch(nowData['process']['type'] ){
			case '1':
			 title = "维修确认";
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
			/*case '100':
		  	title = "订单详情";
			break;*/
			default:
				title = '';
			break;
		}
	}
	// state.process.orderState=orderState;
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