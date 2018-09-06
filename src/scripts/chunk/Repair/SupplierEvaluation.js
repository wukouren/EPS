/**
 * 供应商评估-维修流程－设备
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import UserCard from '../../components/Common/UserCard';
import { DeviceCardAssess } from '../../components/Common/DeviceCard';
import MoneyShow from './../../components/Common/MoneyShow';
import EmptyView from '../../components/Common/EmptyView';
import LoadMore from './../../components/Common/LoadMore';
import { MemoDialog ,EvaluateDialog} from '../../components/Common/EpsModal';
import { AlertBase, ConfirmBase ,AlertInfoBase} from './../../components/Common/EpsModal';
import request from './../../utils/EpsRequest';
import {openChart} from '../../constants';

class SupplierEvaluation extends Component {
	constructor(props) {
		super(props);
		this.openLog = this.openLog.bind(this);
		this.createHandler = this.createHandler.bind(this);
		this.gotoAddDevice = this.gotoAddDevice.bind(this);
		this.delDeviceItem = this.delDeviceItem.bind(this);
	}
	render(){
		let content = this.combineContent();
		let combineCost =this.combineCost();
		let orderCost=combineCost.orderCost;
		let data = this.props.supplierevaluation;
		return (
			<div className="eps-repair-supplier-response equipment">
				<header className="header" ref="header">
					<div className="header-bg-specail">
						<div className="header-bg"></div>
						<div className="header-bg-2"></div>
					</div>
					<div className="header-c">
						<UserCard data={_.extend(data,{
							name:data['createBy'],
							remark:data['maintenanceRemarks'],
							time:data['dateAppointment'],
							fileCount:data['fileCount'] || 0,
							uploadPhaseName:data['uploadPhaseName'] || ''
						})}></UserCard>
					</div>
				</header>
				<div className="eps-repair-supr-content evaluation">
					<div className="eps-box-wrap">
						<div className="eps-box">
							<div className="eps-add-small" onClick={ this.gotoAddDevice }><i className="icon-add-device-small"></i><font>添加设备</font></div>
						</div>
					</div>
					{ content }
					<LoadMore container='main-c' data={data['loading']} onEndReached={(e)=>{this.onEndReached(e)} }/>
				</div>
				{ orderCost }
				<div className="eps-footer">
					<div className="eps-btn-wrap">
						<div className="log-btn" onClick={(e)=>this.openLog(e)}><i className="icon-log"></i><span>流程日志</span></div>
						<div className="eps-btn eps-btn-warning-large" onClick={(e)=>this.createHandler(e)}>提交</div>
					</div>
				</div>
			</div>
		);
	}
	turnMoney(data){
		return Number(data).formatMoney(2,'','')
	}
	componentDidMount(){
		let self = this;
		let dispatch = this.props.dispatch;
		let orderid = this.props.params.orderid.split("&")[0];
		this.setHeight();
		PubSub.subscribe('get:child:select:device',function(evt,data){
			console.log(data,"data")
			data['data'][0]['maintenanceCost']='0.00';
			data['data'][0]['maintenanceTravel']='0.00';
			data['data'][0]['maintenanceAccommodation']='0.00';
			data['data'][0]['maintenanceOtherCost']='0.00';
			data['data'][0]['otherCostRemark']='';
			data['data'][0]['devceMaintenanceNum']='1';
			let modelData = self.props.supplierevaluation;
			let initialList=modelData['list'].concat(data['data']);
			console.log(initialList,"initialList")
			let allList = modelData['list'].concat(data['data']);
			allList = _.uniq(allList,(i)=>{
				return i['epsid']
			})
			let repeatData=_.intersection(initialList,modelData['list']);
			let deviceNames=[];
			_.each(repeatData,function(item,index){
				deviceNames.push(item.deviceName);
			})
			if(initialList.length>allList.length){
				AlertBase({
					tip: '设备重复添加！',
					icon: 'icon-save-error',
					onOk: ()=>{
					}
				});
			}
			dispatch({
					type:'supplierevaluation/changeData',
					payload:{
						list:allList,
						showMoney:true,
					}
			})
    })
		PubSub.subscribe('get:edit:maintenance:details:device',function(evt,data){
			_.map(data.data.deviceList,function(item){
				item.maintenanceNum=item.maintenanceNum?item.maintenanceNum:'0';
			})
			console.log('这个里面传过来的数据是什么呢',data.data);
			dispatch({
				type:'supplierevaluation/changeItemData',
				payload:{
					id:data['data']['id'],
					data:data['data']
				}
			})
		});
		dispatch({ type: 'supplierevaluation/fetch', payload:orderid,dispatch:dispatch});
		window.onJwNavBtnClick = function(data){
			if(data['type'] == '4'){
				let modelData = self.props.supplierevaluation;
				openChart(modelData['createEid'],modelData['orderNumber'],'供应商评估')
			}
		}
		let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    $(window).resize(function(){
    	self.setHeight();
    	setTimeout(function(){
    		let clientHeightNow = document.documentElement.clientHeight || document.body.clientHeight;
    		console.log(clientHeight,clientHeightNow,'zxczxczxczxczxczxczxcz');
    		if(clientHeight>clientHeightNow){
    			$('.eps-second-body').stop().animate({scrollTop:'100000px'})
    		}else{
    		}
    	},100)
    })
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
			let top = $('.eps-box-wrap').height() || 0;
			let money =  $('.money-show').height() ||0;
			let footer = $('.eps-footer').height() || 0;
			$('.eps-repair-supplier-response').css({height:clientHeight+'px'});
		},0)
	}
	// 打开log
	openLog(){
		let datas = this.props.supplierevaluation;
		var url = EpsWebRoot+'/#log/'+datas["orderNumber"]
		window.upTabsData('log','cache',datas);
		jw.pushWebView(url);
	}
	// 提交
	createHandler(){
		let self = this;
		let data = _.clone(self.props.supplierevaluation);
		let combineCost =self.combineCost();
		let allMoney=combineCost.orderMoney;
		data['equipmentRepairList'] = data['list'];
	  if(data['list'].length<1){
      AlertBase({
        tip: '至少要选择一个设备！',
        icon: 'icon-save-error',
        onOk: ()=>{}
      });
      return
    }
		let error;
    data['partRepairList'] = [];
		if(self.props.location.query.type=='1'||self.props.location.query.type=='2'){
			_.each(data['equipmentRepairList'] ,function(item){
				console.log(item,"equipmentRepairList");
				item.othersPrice=(item.maintenanceCost-0)+(item.maintenanceOtherCost-0)+(item.maintenanceTravel-0)+(item.maintenanceAccommodation-0);
				item.faCode=item.faCategory;
				item.faCode2=item.subCategory;
				item.maintenanceAccommodationRate=item.maintenanceAccommodationRate?item.maintenanceAccommodationRate:'0';
				item.maintenanceLaborRate=item.maintenanceLaborRate?item.maintenanceLaborRate:'0';
				item.maintenanceOtherCostTaxRate=item.maintenanceOtherCostTaxRate?item.maintenanceOtherCostTaxRate:'0';
				item.otherCostRemark=item.otherCostRemark?item.otherCostRemark:'';
				item.maintenanceRate=item.maintenanceRate?item.maintenanceRate:'0';
				//校验数据
				delete item['faCategory'];
				delete item['subCategory'];
			})
		}else{
			_.each(data['equipmentRepairList'] ,function(item){
				item.faCode=item.faCategory;
				item.faCode2=item.subCategory;
				delete item['mark']
				delete item['operate'];
				delete item['faCategory'];
				delete item['subCategory'];
			})
		}
		_.each(data['list'],function(i){
			if(i['deviceList'] && i['deviceList'].length!=0){
				let deviceList = _.clone(i['deviceList']);
				_.each(deviceList,function(item){
					// console.log(item,"partRepairList:item")
					data['partRepairList'].push({
						'partDeviceNumber':i["deviceNumber"],
						'partNumber':item["partNumber"],
						'partNameCn':item["partName"],
						'maintenancePriceNotax': item["maintenancePriceNotax"],
						'maintenancePrice':item["maintenancePrice"],
						'partMaintenanceNum':item["maintenanceNum"],
						'maintenancePriceRate':item["maintenanceLaborRate"]?item["maintenanceLaborRate"]:'0',
						'partIsFa':item["partIsFa"] || item["accessoriesIntoFixedAssets"],
						'partOperate':item["operate"],
						'partMark':item["mark"]
					});
					delete i['deviceList']
				})
			}
		})

		delete data['list'];
		delete data['loading'];
		delete data['name'];
		delete data['pageInfo'];
		delete data['repairType'];
		delete data['costList'];
		delete data['incidentalList'];
		data['orderMoney']=allMoney;
		for(var i=0;i<data['equipmentRepairList'].length;i++){
			let item = data['equipmentRepairList'][i];
			if(typeof(item['devceMaintenanceNum']) == 'undefined'  || item['devceMaintenanceNum'] == 0){
				if(item['deviceOperate'] != '4'){
					error = '请正确输入设备维修数量'
					break;
				}
			}
			if(typeof(item['deviceSerialNumber']) == 'undefined' || item['deviceSerialNumber'].length==0){
				error = '请完善设备序列号'
			}

			if(typeof(item['maintenanceCost']) == 'undefined' || item['maintenanceCost'].length == 0 || isNaN(item['maintenanceCost'])){
				error = '请正确输入人工费';
				break;
			}

			if(item['maintenanceCost']> 0 && ( typeof(item['maintenanceLaborRate']) == 'undefined'||item['maintenanceLaborRate']=='请选择' || item['maintenanceLaborRate'].length==0)){
				error = '请选择人工费税率';
				break;
			}

			if(typeof(item['maintenanceAccommodation']) == 'undefined' || item['maintenanceAccommodation'].length == 0 || isNaN(item['maintenanceAccommodation'])){
				error = '请正确输入住宿费';
				break;
			}

			if(item['maintenanceAccommodation']>0 && ( typeof(item['maintenanceAccommodationRate']) == 'undefined'||item['maintenanceAccommodationRate']=='请选择' || item['maintenanceAccommodationRate'].length==0)){
				error = '请选择住宿费税率';
				break;
			}

			if(typeof(item['maintenanceTravel']) == 'undefined' || item['maintenanceTravel'].length == 0 || isNaN(item['maintenanceTravel'])){
				error = '请正确输入差旅费';
				break;
			}

			if(item['maintenanceTravel']>0 && ( typeof(item['maintenanceRate']) == 'undefined'||item['maintenanceRate']=='请选择'||item['maintenanceRate'].length==0)){
				error = '请选择差旅费税率';
				break;
			}

			if(typeof(item['maintenanceOtherCost']) == 'undefined' || item['maintenanceOtherCost'].length == 0 || isNaN(item['maintenanceOtherCost'])){
				error = '请正确输入其他费用';
				break;
			}

			if(item['maintenanceOtherCost']>0 && ( typeof(item['maintenanceOtherCostTaxRate']) == 'undefined'||item['maintenanceOtherCostTaxRate']=='请选择' || item['maintenanceOtherCostTaxRate'].length==0)){
				error = '请选择其他费税率';
				break;
			}
			if(item['maintenanceOtherCost']>0){
				if(typeof(item['otherCostRemark']) == 'undefined' || item['otherCostRemark'].length == 0){
					error = '其他费用备注不能为空';
					break
				}
			}
		}
		for(var i=0;i<data['partRepairList'];i++){
			let item = data['partRepairList'][i];
			if(item['partOperate'] == '请选择'){
				error = '请选择配件操作建议！';
				break
			}
			if(item['partOperate'] == '2' && (typeof(item['partNumber']) == 'undefined' || item['partNumber'].length== 0 || item['partNumber']=='0')){
				error = '请输入配件维修数量！';
				break
			}
		}
		if(error){
			AlertBase({
				tip: error,
				icon: 'icon-save-error'
			});
			return 
		}
		console.log(data,'这个提交的数据是什么呢');
   	let epsDialog = MemoDialog({
				title:'供应商确认维修?',
				defaultValue: self.agreeMemo ?  self.agreeMemo : '',
				btnIconClass:'icon-check',
	      btnVal: '确认',
				placeholder: '请输入备注...',
				changeData:function(){},
	      memorequired:false, 
	      onBtnClick: (memo,callback)=>{  
         // setTimeout(function(){
	          // let saving = AlertBase({tip: '正在提交…',icon: 'icon-saving',okBtn: {text: '提交中...'}})
						data.maintenanceRemarks=memo;
						// console.log('ddddddd:',JSON.stringify({
						// 		param:{
						// 			eid:window.eid,
						// 			record: data
						// 		}
						// 	}));
						// return;
						request('/McdEpsApi/joywok/repair/submitSupplierEvaluate',{
							method:'POST',
							body:JSON.stringify({
								param:{
									eid:window.eid,
									record: data
								}
							})
						}).then(function(resp){
							if(resp['data']['success']==false){
								if(typeof(callback)!='undefined'){callback(true);}
							}else{
								if(typeof(callback)!='undefined'){
		              callback();
		            }
								console.log(resp['data'],'返回的数据')
								AlertBase({
									tip: resp['data']['msg'],
									icon: 'icon-save-success',
									onOk: ()=>{
										jw.closeWebView()
									}
								});
							}
						})
         // },500)
	      },
	      onClose: (memo)=>{  
	      	self.rejectMemo = memo;
	      },
	  });
	}
	// 打开添加设备页面
	gotoAddDevice(){
		let url = EpsWebRoot+'/#/repairing/add-edit/equipment';
    jw.pushWebView(url);
	}
	//
	delDeviceItem(data){
		let dispatch=this.props.dispatch;
		let suppliereValuationData=this.props.supplierevaluation;
		let newList=[];
		let pageInfoList=[];
		// let storeScrapList = [];
		_.each(suppliereValuationData.list,function(item){
			if(item.deviceNumber!=data.deviceNumber){
				newList.push(item)
			}
		})

		let newIncidentalList=[];
		if(suppliereValuationData.type=='2'){
			console.log(newList,'newList')
		}
		// _.each(suppliereValuationData['storeScrapList'],function(i){
		// 	if(i['deviceName']!=data['deviceName']){
		// 		storeScrapList.push(i)
		// 	}
		// })
		dispatch({
			type:'supplierevaluation/changeData',
	    payload:{
	      list:newList,
	      showMoney:newList.length>0?true:false,
	      incidentalList:newIncidentalList,
	      // storeScrapList:storeScrapList
	    }
		})
	}
	// 组织设备列表
	combineContent(){
		let self = this;
		const list = this.props.supplierevaluation.list;
		if(list && list.length>0){
			return (
		    <ul className="eps-list-card-wrap eps-device-list" ref="listWrap">
					{
						_.map(list,(item) => {
							return <DeviceCardAssess delDeviceItem={self.delDeviceItem} deleteBtnShow={true} orderid={self.props.supplierevaluation['orderNumber']} showCardIcon={true} itemdata={_.extend(_.clone(item),{
								name:item['deviceName'],
								repairnum:(item['devceMaintenanceNum']),
								faCategory:item["faCategory"] || item['categoryCode'],
								subCategory:item["subCategory"] || item['subCategoryCode'],
								// deviceMark:item["remark"] || item['deviceMark'],
								deviceOperate:item['operate'] || item['deviceOperate']
							})} />
						})
					}
		    </ul>
	  	);	
		}else{
			return (<EmptyView tip="暂无设备"/>)
		}
	}
	// 组织费用小计 有费用项时就显示费用项，没有费用项时就返回空
	combineCost(){
		let data = this.props.supplierevaluation;
		let money = {
			installationFee:0,
			installationFeeRate:'',
			hotelCost:0,
			hotelCostTax:'',
			carCost:0,
			carCostTax:'',
			otherCost:0,
			otherCostTax:''
		};
		let allMoney=0;

		let maintenancePrice = 0;
		let maintenanceLaborRate = '-';
		_.each(data['list'],function(i,index){
			console.log(i,'评估页面费用')
			money['installationFee'] += turnNan(i['maintenanceCost']);
			money['hotelCost'] += turnNan(i['maintenanceAccommodation']);
			money['carCost'] += turnNan(i['maintenanceTravel']);
			money['otherCost'] += turnNan(i['maintenanceOtherCost']);
			allMoney += turnNan(i['maintenanceCost'])+turnNan(i['maintenanceAccommodation'])+turnNan(i['maintenanceTravel'])+turnNan(i['maintenanceOtherCost'] || 0);
			let deviceList = i['deviceList'];
			if(deviceList){
				deviceList = _.filter(deviceList,function(i){
					if(i['maintenanceNum']!="0"){
						if(i['operate']=='2'){
							maintenancePrice+=turnNan(i['maintenancePrice'] * i['maintenanceNum']);
						  allMoney += turnNan(i['maintenancePrice']*i['maintenanceNum']);
						}
						return i['operate']=='2';
					}	 
				})
			}
			if(deviceList && deviceList.length!=0){
				_.each(i['deviceList'],function(item,deviceIndex){
					if(index==0 && deviceIndex == 0){
						if(item['maintenanceLaborRate'] && item['maintenanceLaborRate']!="-1"){
							maintenanceLaborRate = item['maintenanceLaborRate'];
						}else{
							maintenanceLaborRate = '-'
						}
					}else{
						if(maintenanceLaborRate != '-'){
							if(maintenanceLaborRate != item['maintenanceLaborRate']){
								maintenanceLaborRate = '-';
							}else{
								maintenanceLaborRate = item['maintenanceLaborRate'];
							}
						}
					}
					
				})
			}
			if(index == 0){
				money['installationFeeRate'] = i['maintenanceLaborRate'];
				money['hotelCostTax'] = i['maintenanceAccommodationRate'];
				money['carCostTax'] = i['maintenanceRate'];
				money['otherCostTax'] =i['maintenanceOtherCostTaxRate'];
			}else{
				money['installationFeeRate'] = (money['installationFeeRate']!=i['maintenanceLaborRate'])?'-':money['installationFeeRate'];
				money['hotelCostTax'] = (money['hotelCostTax']!=i['maintenanceAccommodationRate'])?'-':money['hotelCostTax'];
				money['carCostTax'] = (money['carCostTax']!=i['maintenanceRate'])?'-':money['carCostTax'];
				money['otherCostTax'] = (money['otherCostTax']!=i['maintenanceOtherCostTaxRate'])?'-':money['otherCostTax'];
			}
		})
		maintenancePrice = (isNaN(maintenancePrice)?0.00:this.turnMoney(maintenancePrice));
		console.log(maintenancePrice,'这个钱是多少啊啊');
		console.log("allMoney",allMoney)
		let datas = {
			FeeList:money,
			PurchaseMoney:maintenancePrice+' '+'('+maintenanceLaborRate+')',
			orderMoney:allMoney
		}
		let orderCost='';
     let moneyName=(data['list']&&data['list'].length>1)?'evaluation-show-money':'money-show';
		if(data.showMoney){
				orderCost=<div className={moneyName}> <MoneyShow allData={datas}  ></MoneyShow> </div>;
		}else{
			  orderCost='';
		}
		 return {orderCost:orderCost,orderMoney:allMoney}

	}
}

export default connect(function(state){
	let hash = window.location.hash.split('?')[1].split('&');
	let nowHash = {};
	_.each(hash,(i)=>{
		let split = i.split('=');
		nowHash[split[0]] = split[1];
	})
	let nowData = state;
	if(nowHash['type']){
		nowData['supplierevaluation']['type'] = nowHash['type']
	}else{
		nowData['supplierevaluation']['type'] = '1'
	}
	return nowData
})(SupplierEvaluation);