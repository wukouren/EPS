/**
 * 设备维修详单
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { DeviceCardAssess } from '../../components/Common/DeviceCard';
import { openWebView } from '../../constants';
import Form from "jw-form/dist/mobile";
import { getDict,DataLength } from '../../constants';
import { AlertBase,AlertInfoBase} from './../../components/Common/EpsModal';

let taxlist = getDict('taxlist');
let fittingOperation = getDict('fittingOperation');
class MaintenanceDetailsDevice extends Component {
	FormChange(values,schema){
		console.log("values:",values,"FormChange:",schema);
	}
	changeData(data){
	}
	constructor(props) {
		let store = new Store('Joywok:cache:tabs:details:device:card');
		var cache = store.find({id:'tab:cache'}) || {};
		if(cache['id']){
			let dispatch = props.dispatch;
			console.log(cache['data'],'获取到的数据');
			dispatch({
				type:'details/changeData',
				payload:cache["data"]
			})
		}
		super(props);
	}
	// set wrap 高度
	setWrapHeight(){
    let self = this;
		setTimeout(function(){
			let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			let header = $('.header').height() ||0;
			let footer = $('.eps-footer').height() || 0;
			console.log('clientHeight',header,top,footer);
			$('.eps-second-body').css({height:clientHeight-header-footer+'px'});
			// $('.maintenance-details-wrap').css({height:clientHeight-header-top-footer-20+'px'});
		},0)
	}
	// 组件加载完毕
  componentDidMount(){
  	let self = this;
  	let dispatch = this.props.dispatch;
		this.setWrapHeight();
		if(isAndroid()) {
    	console.log('Register event of resize')
      $( window ).resize(function() {
      	console.log('window resize')
        self.setWrapHeight();
      });
    }
		// 监听添加配件事件
		PubSub.subscribe('editequipment',function(evt,data){
			console.log("subscribe('editequipment':",data,")")
			dispatch({
				type:'details/changeData',
				payload:data
			})
		});
		PubSub.subscribe('editmoney',function(evt,data){
			console.log("subscribe('editmoney':",data,")")
			dispatch({
				type:'details/changeData',
				payload:data
			})
		});
		PubSub.subscribe('get:child:select:parts',function(evt,data){
			console.log(data,'get:child:select:parts');
			let datas = self.props.details;
			let newList = [];
			data = _.each(data['data'],function(i){
				i['operate'] = '1';
				i['maintenanceNum'] = '1'
				i['partName'] = i['partNameCn'];
				if(i['maintenanceLaborRate'] && i['maintenanceLaborRate']!='-1'){
					i["maintenancePrice"] = Number(i['maintenancePriceNotax']) + i['maintenancePriceNotax']/100 * parseFloat(i['maintenanceLaborRate'])
				}else{
					i['maintenancePrice'] = '-'
				}
			})

			if(datas['deviceList']){
				let isFlag=false;
	    	_.each(data,function(i){
	    		if(_.findWhere(datas['deviceList'],{id:i['id']})){
	    			isFlag = true
	    		}
	    		newList.push(i)
	    	})
	    	if(isFlag){
	    		AlertBase({
		        tip: '配件重复添加！',
		        icon: 'icon-save-error',
		        onOk: ()=>{}
		      });
	    	}

				newList = datas['deviceList'].concat(newList);
			}else{
				newList = newList.concat(data);
			}
			// AlertInfoBase({
	  	//     text:'以下设备已被添加,此次不会重复添加:',
	  	//     deviceNames:newList,
		  //  });
			newList = _.uniq(newList,function(i){
				return i['partName']
			})
			dispatch({
				type:'details/changeData',
				payload:{
					deviceList:newList
				}
			})
		});
		let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		$(window).resize(function(){
    	self.setWrapHeight();
    	setTimeout(function(){
    		let clientHeightNow = document.documentElement.clientHeight || document.body.clientHeight;
    		if(clientHeight>clientHeightNow){
    			$('.eps-second-body').stop().animate({scrollTop:'100000px'})
    		}else{
    		}
    	},100)
    })
  }
  openWebView(e,type,data){
		var url = EpsWebRoot+'/#'+data;
		let datas = this.props.details;
		if(type == 'editequipment'){
			let equipmentOperation = getDict('equipmentOperation');
			let details = {
				equipmentOperation:equipmentOperation,
				datas:datas	
			}
			window.upTabsData('editequipment','cache',details);
		}else{
			window.upTabsData('editmoney','cache',datas);
		}
		jw.pushWebView(url);
		e.stopPropagation();
	}
	NameInfo(name){ 
		if(DataLength(name)>10){
			AlertInfoBase({
        text: name,
     });
		}   
  }
  countMoney(money,rate){
  	let data = ''
  	if(rate && rate!='0'){
  		data = (Number(money) + money/100*parseFloat(rate));
  	}else{
  		data = (Number(money));
  	}
  	return (Number(data).formatMoney(2,'',''))
  }
	render(){
	 	// 设备信息，这个命名 联调的时候要保留哦，下面打开搜索配件时用到了呢～～  
	 	// 且deviceData中 一定要有 deviceName:'薯条冰箱', deviceNumber:'000063', vendorNumber:'供应商编号',  这3个字段，搜索配件才能成功 
	 	let self = this;
		let data =this.props.details;
		console.log(data,'datadatadatadatadatadatadatadatadatadata')
		let deviceData  = {id: data["id"], deviceName:data["deviceName"], vendorNumber:data['vendorNumber'], deviceNumber:data['deviceNumber'], categoryCode:data["faCategory"]};
		let maintenanceCost = (this.countMoney(data["maintenanceCost"])) + ' (' + (data["maintenanceLaborRate"] && data["maintenanceLaborRate"]!='0'? data["maintenanceLaborRate"]:'-') + ')',
				maintenanceAccommodation = (this.countMoney(data["maintenanceAccommodation"])) +' ('+(data["maintenanceAccommodationRate"] && data["maintenanceAccommodationRate"]!='0'?data["maintenanceAccommodationRate"]:'-')+')',
				maintenanceTravel = (this.countMoney(data["maintenanceTravel"]))+' ('+(data["maintenanceRate"] && data["maintenanceRate"]!='0'?data["maintenanceRate"]:'-')+')',

				maintenanceOtherCost = (this.countMoney(data["maintenanceOtherCost"]))+' ('+(data["maintenanceOtherCostTaxRate"]&&data["maintenanceOtherCostTaxRate"]!='0'?data["maintenanceOtherCostTaxRate"]:'-')+')',

				otherCostRemark = data["otherCostRemark"] || "无备注";

		console.log(data,'taxlist,taxlist,taxlist')
		return (
			<div className="eps-maintenance-details-device">
				<header className="header specail" ref="header">
					<div className="header-bg-specail">
						<div className="header-bg"></div>
						<div className="header-bg-2"></div>
					</div>
					<div className="header-c">
					</div>
				</header>
				<div className="eps-second-body">
					<div className="eps-box-wrap header-box">
						<DeviceCardAssess showMore={true} itemdata={_.extend({},this.props.details,{
							repairnum:data['devceMaintenanceNum'] || 1,
							// deviceNumber:data['deviceSerialNumber'],
						})} animated={ false } showCardIcon={ false } noClick={true}>
							<div className="eps-card-title eps-card-title-2">
								<i className="eps-list-card-bgicon"></i>
								<div className="eps-card-title border-line-h after">
									<font>设备信息</font>
									<i className="icon-edit" onClick={(e)=>this.openWebView(e,'editequipment','/repairing/edit-info/equipment/'+data["orderNumber"]+'/'+data["id"])}></i>
								</div>
							</div>
						</DeviceCardAssess>
					</div>
					<div className="maintenance-details-wrap" ref="listWrap">
						<div className="maintenance-cost-card">
							<div className="eps-device-card-select">
								<div className="eps-list-card eps-card-with-title">
									<i className="eps-list-card-bgicon"></i>
									<div className="eps-card-title border-line-h after">
										<font>费用(含税)</font>
										<i className="icon-edit" onClick={(e)=>this.openWebView(e,'editmoney','/repairing/edit-money/'+data["orderNumber"]+'/'+data["id"])}></i>
									</div>
									<div className="eps-card-body">
										<div className="cost-row">
											<div className="cost-item" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(maintenanceCost) } }><dt>人工费 ¥</dt><dd><font className="ellipsis">{maintenanceCost}</font></dd></div>
											<div className="cost-item" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(maintenanceAccommodation) } }><dt>住宿费 ¥</dt><dd><font className="ellipsis">{maintenanceAccommodation}</font></dd></div>
										</div>
										<div className="cost-row">
											<div className="cost-item" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(maintenanceTravel) } }><dt>差旅费 ¥</dt><dd><font className="ellipsis">{maintenanceTravel}</font></dd></div>
											<div className="cost-item" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(maintenanceOtherCost) } }><dt>其他费用 ¥</dt><dd><font className="ellipsis">{maintenanceOtherCost}</font></dd></div>
										</div>
										<div className="cost-other-info"><dt>其他费用备注</dt><dd className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(otherCostRemark) } }>{otherCostRemark}</dd></div>
									</div>
								</div>
							</div>
						</div>
						<div className="parts-form-list">
							{
								_.map(data['deviceList'] || [],function(i,index){
									let rate = '';
									let classSpecailName = generateMixed(16);
									if(i['maintenanceLaborRate'] == '11%' || i['maintenanceLaborRate'] == '17%'){
										let dispatch = self.props.dispatch;
										let nowData = ''
										if(i['maintenanceLaborRate'] == '11%'){
											nowData = '10%';
										}else{
											nowData = '16%';
										}
										dispatch({
											type:'details/changePart',
											payload:{
												index:index,
												key:'maintenanceLaborRate',
												value:nowData
											}
										})
									}else{
										rate = _.findWhere(taxlist,{label:i["maintenanceLaborRate"]});
										rate = rate?rate['value']:'';	
									}
									// console.log(i,'这个里面有啥数据啊');
									let time = null;
									let formData={
										schema:[
											{
												name: 'form_1', element:'Input',
												label:'配件名称',
												defaultValue: i["partName"],
												attr:{
													type: 'text',
													className:'',
													disabled: 'disabled',
												}
											},{
												name: 'form_2', element:'Input',
												label:'维修数量',
												defaultValue: i["maintenanceNum"],
												attr:{
													type: 'number',
													placeholder:'请输入维修数量',
													className:'edit-fitting-input'
												},
												events:{
													onChange:function(e){
														let dispatch = self.props.dispatch;
														dispatch({
															type:'details/changePart',
															payload:{
																index:index,
																key:'maintenanceNum',
																value:e[0]
															}
														})
														let maintenancePrice = 0;
														if(i["operate"] == '2'){
															if(i["maintenanceLaborRate"] && i["maintenanceLaborRate"]!='-1'){
																maintenancePrice = (Number(i['maintenancePriceNotax']) + i['maintenancePriceNotax']/100 * parseFloat(i["maintenanceLaborRate"]));
															}else{
																maintenancePrice = i["maintenancePriceNotax"]
															}
														}else{

														}
														dispatch({
															type:'details/changePart',
															payload:{
																index:index,
																key:'maintenancePrice',
																value:maintenancePrice
															}
														})
														// let value = Number(maintenancePrice*self.props.details['deviceList'][index]['maintenanceNum']).formatMoney(2,'','');
														// let classn = "."+classSpecailName+' .maintenancePrice input';
														// let rate = Number(self.props.details['deviceList'][index]["maintenancePriceNotax"]/100*parseFloat(self.props.details['deviceList'][index]['maintenanceLaborRate'])).formatMoney(2,'','');
														// setTimeout(function(){
														// 	$(classn).addClass("zhailei").val(value);
														// 	$("."+classSpecailName+' .maintenanceRate input').val(rate)
														// })
													}
												}
											},{
												name: 'form_3', element:'Select',label:'建议操作',
												defaultValue:[i["operate"]],
												options: fittingOperation,
												attr:{
													cols:1,
													className:''
												},
												events:{
													onChange:function(data){
														let dispatch = self.props.dispatch;
														dispatch({
															type:'details/changePart',
															payload:{
																index:index,
																key:'operate',
																value:data[0][0]
															}
														})

														let maintenancePrice = 0;
														if(data[0][0] == '2'){
															if(i["maintenanceLaborRate"] && i["maintenanceLaborRate"]!='-1'){
																maintenancePrice = (Number(i['maintenancePriceNotax']) + i['maintenancePriceNotax']/100 * parseFloat(i["maintenanceLaborRate"]));
															}else{
																maintenancePrice = i["maintenancePriceNotax"]
															}
														}else{

														}
														dispatch({
															type:'details/changePart',
															payload:{
																index:index,
																key:'maintenancePrice',
																value:maintenancePrice
															}
														})
														// let value = Number(maintenancePrice*self.props.details['deviceList'][index]['maintenanceNum']).formatMoney(2,'','');
														// let classn = "."+classSpecailName+' .maintenancePrice input'
														// // console.log(classSpecailName,maintenancePrice,value,classn,$(classn),'zzzzzzzzzzzzzzzzzzzz')
														// let rate = Number(self.props.details['deviceList'][index]["maintenancePriceNotax"]/100*parseFloat(self.props.details['deviceList'][index]['maintenanceLaborRate'])).formatMoney(2,'','');
														// setTimeout(function(){
														// 	$(classn).addClass("zhailei").val(value);
														// 	$("."+classSpecailName+' .maintenanceRate input').val(rate)	
														// })
													}
												}
											},{
												name: 'form_122', element:'Input',
												label:'维修价格',
												defaultValue: (i["maintenancePriceNotax"] || 0.00)+'(不含税)',
												attr:{
													type: 'text',
													className:'specail-disabled-input',
													disabled:'disabled'
												},
											},{
												name: 'form_4', element:'Select',label:'设备税率',
												defaultValue:[rate],
												options: taxlist,
												attr:{
													cols:1,
												},
												events:{
													onChange:function(data){
														let dispatch = self.props.dispatch;
														let nowData = _.findWhere(taxlist,{value:data[0][0]});
														let values = nowData['value'];
														nowData = nowData['label'];
														if(nowData == '请选择'){
															nowData = ''
														}
														dispatch({
															type:'details/changePart',
															payload:{
																index:index,
																key:'maintenanceLaborRate',
																value:nowData
															}
														})
														let maintenancePrice = 0;
														if(i["operate"] == '2'){
															if(values && values!='-1'){
																maintenancePrice = (Number(i['maintenancePriceNotax']) + i['maintenancePriceNotax']/100 * parseFloat(nowData));
															}else{
																maintenancePrice = i["maintenancePriceNotax"]
															}
														}else{

														}
														dispatch({
															type:'details/changePart',
															payload:{
																index:index,
																key:'maintenancePrice',
																value:maintenancePrice
															}
														})
														let value = Number(maintenancePrice*self.props.details['deviceList'][index]['maintenanceNum']).formatMoney(2,'','');
														let classn = "."+classSpecailName+' .maintenancePrice input'
														// console.log(classSpecailName,maintenancePrice,value,classn,$(classn),'zzzzzzzzzzzzzzzzzzzz')
														let rate = Number(self.props.details['deviceList'][index]["maintenancePriceNotax"]/100*parseFloat(nowData)).formatMoney(2,'','');
														setTimeout(function(){
															$(classn).addClass("zhailei").val(value)	
															$("."+classSpecailName+' .maintenanceRate input').val(rate)
														})
													}
												}
											},{
												name: 'form_666', element:'Input',label:'设备税金',
												defaultValue:Number(self.props.details['deviceList'][index]["maintenancePriceNotax"]/100*parseFloat(self.props.details['deviceList'][index]['maintenanceLaborRate'])).formatMoney(2,'',''),
												attr:{
													type: 'text',
													className:'specail-disabled-input maintenanceRate',
													disabled:'disabled',
												}
											},{
												name: 'form_777', element:'Input',label:'价税合计',
												defaultValue: (rate && rate!='-1' && i["operate"] == '2'?Number((Number(self.props.details['deviceList'][index]["maintenancePriceNotax"])+self.props.details['deviceList'][index]["maintenancePriceNotax"]/100*parseFloat(self.props.details['deviceList'][index]['maintenanceLaborRate']))*self.props.details['deviceList'][index]["maintenanceNum"]).formatMoney(2,'',''):'-'),
												attr:{
													type: 'text',
													className:'specail-disabled-input maintenancePrice',
													disabled:'disabled'
												}
											},{
												name: 'form_5', element:'Input',
												label:'维修描述',
												defaultValue: i["mark"],
												attr:{
													type: 'text',
													className:'',
												},
												events:{
													onChange:function(e){
														let dispatch = self.props.dispatch;
														dispatch({
															type:'details/changePart',
															payload:{
																index:index,
																key:'mark',
																value:e[0]
															}
														})
														let maintenancePrice = 0;
														if(i["operate"] == '2'){
															if(i["maintenanceLaborRate"] && i["maintenanceLaborRate"]!='-1'){
																maintenancePrice = (Number(i['maintenancePriceNotax']) + i['maintenancePriceNotax']/100 * parseFloat(i["maintenanceLaborRate"]));
															}else{
																maintenancePrice = i["maintenancePriceNotax"]
															}
														}else{
														}
														dispatch({
															type:'details/changePart',
															payload:{
																index:index,
																key:'maintenancePrice',
																value:maintenancePrice
															}
														})
														// let value = Number(maintenancePrice*self.props.details['deviceList'][index]['maintenanceNum']).formatMoney(2,'','');
														// let classn = "."+classSpecailName+' .maintenancePrice input'
														// // console.log(classSpecailName,maintenancePrice,value,classn,$(classn),'zzzzzzzzzzzzzzzzzzzz')
														// let rate = Number(self.props.details['deviceList'][index]["maintenancePriceNotax"]/100*parseFloat(self.props.details['deviceList'][index]['maintenanceLaborRate'])).formatMoney(2,'','');
														// setTimeout(function(){
														// 	$(classn).addClass("zhailei").val(value);
														// 	$("."+classSpecailName+' .maintenanceRate input').val(rate)	
														// },0)

														// console.log(this,sekf,'zzzzzzzzzzzz');

														// this.props.

													}
												}
											},
										],
										buttons:false,
										changeData:self.changeData.bind(self)
									}
									return <div className={"parts-form-item eps-list-card "+(classSpecailName)}>
														<i className="icon-close" onClick={(e)=>self.removeParts(index)}></i>
														<Form formData={formData}/>
													</div>
								})
							}
						</div>
					</div>
				</div>
				<div className="eps-footer">
					<div className="eps-btn-wrap">
						<div className="eps-btn eps-btn-default-large" onClick={(e)=>{ 
							window.upTabsData('partsOwnerInfo','cache',deviceData);
							openWebView('/repairing/add-edit/parts');
						}}><i className="icon-add-parts"></i>添加配件</div>
						<div className="eps-btn eps-btn-warning-small" onClick={(e)=>this.createHandler(e)}>提交</div>
					</div>
				</div>
			</div>
		);
	}
	removeParts(targetIndex){
		let self = this;
		let dispatch = this.props.dispatch;
		let datas = self.props.details['deviceList'];
		let newList = [];
		_.each(datas,function(i,index){
			if(targetIndex!=index){
				newList.push(i)
			}
		})
		dispatch({
			type:'details/changeData',
			payload:{
				deviceList:newList
			}
		})
	}
	// 校验配件维修数量、建议操作、设备税率
	_checkFitting(fitting){
		console.log('fitting', fitting);
		if(fitting['maintenanceNum']==''||fitting['maintenanceNum']=='0'){
			return '请选择配件维修数量！';
		}
		if(fitting['operate']==''||fitting['operate']=='-1'){
			return '请选择配件建议操作！';
		}
		console.log('fitting',fitting,fitting['maintenanceLaborRate'])
		if(!fitting['maintenanceLaborRate']||fitting['maintenanceLaborRate']=='-1'){
			return '请选择配件税率！';
		}
		return '';
	}
	createHandler(e){
		let data = this.props.details;
		console.log(data,'这个创建了 传过去的数据有什么呢');
		if(data['deviceList'] && data['deviceList'].length>0){
			// 校验配件维修数量、建议操作、设备税率
			let rets = _.map(data['deviceList'],this._checkFitting);
			let checkstr = _.find( rets, function(ret){ return ret != ''; });
			if(checkstr){
				AlertBase({
					tip: checkstr,
					icon: 'icon-save-error',
					onOk: ()=>{}
				});
				return;
			}
		}
		// if(typeof(data['deviceList'])=='undefined' || data['deviceList'].length==0){
		// 	AlertBase({
		// 		tip: '维修配件不能为空！',
		// 		icon: 'icon-save-error',
		// 		onOk: ()=>{}
		// 	});
		// 	return
		// }
		window.upTabsData('get:edit:maintenance:details:device','publish',{
      data:data
    })
    jw.closeWebView();
	}
}

export default connect(function(state){return state})(MaintenanceDetailsDevice);