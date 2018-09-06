/**
 * IT设备维修详单
 *
 * 此页面主要逻辑：
 * 1. 从localstorage读取要编辑的IT设备信息，dispatch到 itdetails model中去
 * 2. 从localstorage读取要编辑的IT设备配件list, dispatch到 itdetails model中去
 * 3. 点击设备的编辑按钮，跳转到设备编辑页面
 * 4. 修改配件信息，更新 itdetails model中的配件信息
 * 5. 删除配件，更新itdetails model中的配件list
 * 6. 点击完成，publish 修改后的设备信息，和 设备配件信息
 * 7. 点击返回，不做任何操作
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { DeviceCardAssessToIT } from '../../components/Common/DeviceCard';
import { openWebView,getDict } from '../../constants';
import { AlertBase, AlertInfoBase } from '../../components/Common/EpsModal';
import Form from "jw-form/dist/mobile";

// 税率
let taxlist = getDict('taxlist');
// 配件操作建议
let fittingOperation = getDict('fittingOperation');
// 获取设备操作建议
let equipmentOperation = getDict('equipmentOperation');
class MaintenanceDetailsIT extends Component {
	FormChange(values,schema){
		console.log("values:",values,"FormChange:",schema);
	}
	changeData(data){
	}
	constructor(props) {
		super(props);
		this.gotoAddParts = this.gotoAddParts.bind(this);
		this.createHandler = this.createHandler.bind(this);
		let dispatch = this.props.dispatch;
		// 从localstorage拿即将编辑的IT设备信息
		let ITEquipment = getDict('willEditITEquipment');
		// 从localstorage拿该设备下的IT配件信息
		let ITParts = getDict('willEditITParts');
		console.log('MaintenanceDetailsIT:EditITParts',{
			ITEquipment: ITEquipment,
			ITParts: ITParts
		})
		// 存储
		dispatch({
			type:'itdetails/changeData',
			payload:{
				ITEquipment: ITEquipment,
				ITParts: ITParts,
			}
		})
	}

	// 添加配件
	gotoAddParts(){
		// 先缓存IT设备信息
		window.upTabsData('itPartsOwnerInfo','cache',this.props.itdetails.ITEquipment);
		// 打开IT设备配件搜索页面
		let url = EpsWebRoot+'/#/repairing/add-edit/itparts';
    console.log('url:',url)
    jw.pushWebView(url);
	}
	// 删除配件
	removeParts(targetIndex){
		let self = this;
		let dispatch = this.props.dispatch;
		let datas = self.props.itdetails['ITParts'];
		let newList = [];
		_.each(datas,function(i,index){
			if(targetIndex!=index){
				newList.push(i)
			}
		})
		dispatch({
			type:'itdetails/changeData',
			payload:{
				ITParts:newList
			}
		})
	}
	// 表单校验
	checkData(data){
		console.log('checkData:',data);
		if(data.length==0) return true;
		let error='';
		for(var j=0;j<data.length;j++){
			let item = data[j];
			// console.log(item,'循环配件里面的东西');
			// 操作建议必填
			if(typeof(item['partOperate'])=='undefined'|| item['partOperate'].length==0 ||item['partOperate'] =='请选择' || item['partOperate'] =='-1'){
				error = '请正确选择配件的建议操作！'
				break;
			}
			// 税率必填
			if(typeof(item['partsRate'])=='undefined'|| item['partsRate'].length==0 ||item['partsRate'] =='请选择' || item['partsRate'] =='-1'){
				error = '请正确选择配件的税率！'
				break;
			}
			// 实际维修价必填
			if(typeof(item['purchasingPriceNotax'])=='undefined'|| isNaN(item['purchasingPriceNotax']) || item['purchasingPriceNotax'] <0 ){
				error = '请正确输入配件的实际维修价！'
				break;
			}
		}
		// console.log(error,'看看error是什么');
		if(error){
			this.errorAlert(error);
			return false;
		}
		return true;
	}

	// 错误弹框
	errorAlert(msg){
		AlertBase({
			tip: msg,
			icon: 'icon-save-error',
			onOk: ()=>{}
		});
	}
	// 完成修改
	createHandler(e){
		let data = this.props.itdetails['ITParts'];
		console.log("this.props.itdetails['ITParts']:::",this.props.itdetails['ITParts'])
		// 校验数据是否正确
		if(this.checkData(data) == false) return;
		// 向上级页面广播IT维修详单更新的消息 含IT设备，及当前设备下的配件
		window.upTabsData('get:edit:maintenance:itdetails','publish',{
      ITParts: this.props.itdetails['ITParts'],
      ITEquipment: _.extend(this.props.itdetails['ITEquipment'],{partsnum: this.props.itdetails['ITParts'].length})
    })
    jw.closeWebView();
	}

	// set wrap 高度
	setWrapHeight(){
    let ListHeight = $(window).height()-$('.eps-footer').outerHeight();
    $(ReactDOM.findDOMNode(this.refs.listBody)).css({'max-height': ListHeight});
	}

	// 组件加载完毕
  componentDidMount(){
		NProgress.done();
  	let self = this;
  	let dispatch = this.props.dispatch;
		this.setWrapHeight();
		// 监听设备更改事件，dispatch请求到当前页面的model中
		PubSub.subscribe('editequipmentit',function(evt,data){
    	console.log("MaintenanceDetailsIT subscribe('editequipmentit':",data)
    	dispatch({
				type:'itdetails/changeData',
				payload:{
					ITEquipment:_.extend(self.props.itdetails['ITEquipment'],data)
				}
			})
    });
		// 监听添加IT设备配件事件
		PubSub.subscribe('get:child:select:itparts',function(evt,data){
    	console.log("MaintenanceDetailsIT subscribe('get:child:select:itparts':",data['data'])
			let newList = [];
			data = _.each(data['data'],function(i){
				i['partName'] = i['partNameCn'];
			})
			let ITPartsEpsids = [];  
			_.each(self.props.itdetails['ITParts'],(item)=>{
				ITPartsEpsids.push(item.epsid);
			});

    	let ITParts = self.props.itdetails['ITParts'];
    	let ITEquipment = self.props.itdetails['ITEquipment'];
    	let alreadyExistParts = [];
    	// 去重合并IT设备配件数据
    	_.each(data,(item)=>{
    		if(_.indexOf(ITPartsEpsids,item.epsid)==-1){
    			let newItem = {
    				id: item.id,
    				epsid: item.epsid,
    				partDeviceEpsid: ITEquipment.epsid, // it设备epsid
    				partDeviceNumber: ITEquipment.deviceCode, // it设备编号
    				partTypeCode: item.typeCode, // 型号代码
    				partsNumber: item.deviceNumber, // 配件编号
            partsName: item.name, // 配件名称
            accessoriesReferencePrice: item.referencePrice, // 参考价
            maintenanceNum: 1, // 数量
            partOperate: '-1', // 操作
            partsRate: '', // 税率
            purchasingPriceNotax: item['purchasingPriceNotax'] ? item['purchasingPriceNotax'] : item['referencePrice'], // 实际维修价格
            maintenanceRemarks: '', // 配件备注
            partIsFa: item.isFa// 是否入固定资产
    			};
    			ITParts = _.union( [newItem], ITParts );
    		}else{
    			alreadyExistParts.push(item.name);
    		}
    	})
    	if(alreadyExistParts.length>0){
    		AlertInfoBase({
          text:'以下配件已被添加,此次不会重复添加:',
          deviceNames:alreadyExistParts
        })
    	}
			dispatch({
				type:'itdetails/changeData',
				payload:{
					ITParts:ITParts
				}
			})
		});
  }

	render(){
		let self = this;
		console.log('this.props::',this.props);
	 	// 设备信息，这个命名 联调的时候要保留哦，下面打开搜索配件时用到了呢～～  
	 	// 且deviceData中 一定要有 deviceName:'it设备名称' ,typeCode:'型号代码', 这2个字段，搜索配件才能成功 
	 	let data = this.props.itdetails;
	 	let deviceData = data.ITEquipment;
	 	let curDeviceParts =data.ITParts;
		console.log('this.props:',this.props, 'ITEquipment:',deviceData,'ITParts:',data['ITParts']);
		// console.log('curDeviceParts',deviceData);
		return (
			<div className="eps-maintenance-details-it">
				<div className="eps-header-2">
					<div className="header-bg-2"></div>
				</div>
				<div className="eps-second-body maintenance-details-custom" ref="listBody">
					<div className="eps-box-wrap header-box">
						<DeviceCardAssessToIT itemdata={ deviceData } showpartsnum={ false } animated={ false } showCardIcon={ false }>
							<div className="eps-card-title eps-card-title-2">
								<i className="eps-list-card-bgicon"></i>
								<div className="eps-card-title border-line-h after">
									<font>设备信息</font>
									<i className="icon-edit" onClick={(e)=>{
										window.upTabsData('EditEquipmentITData','cache',self.props.itdetails.ITEquipment);
										openWebView('/repairing/edit-info/it')
									}}></i>
								</div>
							</div>
						</DeviceCardAssessToIT>
					</div>
					<div className="maintenance-details-wrap" ref="listWrap">
						<div className="parts-form-list">
							{
								_.map(curDeviceParts || [],function(i,index){
									let rate = '';
									if(i['partsRate'] == '11%' || i['partsRate'] == '17%'){
										let dispatch = self.props.dispatch;
										let nowData = ''
										if(i['partsRate'] == '11%'){
											nowData = '10%';
										}else{
											nowData = '16%';
										}
										dispatch({
											type:'itdetails/changePart',
											payload:{
												index:index,
												key:'partsRate',
												value:nowData
											}
										})
									}else{
										rate = _.findWhere(taxlist,{label:i["partsRate"]});
										rate = rate?rate['value']:'';	
									}
									let partOperate = _.findWhere(fittingOperation,{value:(i["partOperate"]+'')});
									partOperate = partOperate?partOperate['value']:'-1';
									// if(){}
									let purchasingPriceNotax = i['purchasingPriceNotax']


									console.log(i,'这个数据是什么啊啊啊啊');

									let formData={
										schema:[
											{
												name: 'partsName', element:'Input',
												label:'配件名称',
												defaultValue: i['partsName'],
												attr:{
													type: 'text',
													className:'',
													disabled: 'disabled',
												}
											},{
												name: 'accessoriesReferencePrice', element:'Input',
												label:'参考维修价',
												defaultValue: i['accessoriesReferencePrice'],
												attr:{
													type: 'tel',
													placeholder:'',
													className:'',
													disabled: 'disabled',
												}
											},{
												name: 'maintenanceNum', element:'Input',
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
															type:'itdetails/changePart',
															payload:{
																index:index,
																key:'maintenanceNum',
																value:e[0]
															}
														})
													}
												}
											},{
												name: 'partOperate', element:'Select',label:'建议操作',
												defaultValue:[partOperate],
												options: fittingOperation,
												attr:{
													cols:1,
													className:''
												},
												events:{
													onChange:function(data){
														console.log('form rate:',data)
														let dispatch = self.props.dispatch;
														dispatch({
															type:'itdetails/changePart',
															payload:{
																index:index,
																key:'partOperate',
																value:data[0][0]
															}
														})
													}
												}
											},{
												name: 'partsRate', element:'Select',label:'设备税率',
												defaultValue:[rate],
												options: taxlist,
												attr:{
													cols:1,
												},
												events:{
													onChange:function(data){
														let dispatch = self.props.dispatch;
														let nowData = _.findWhere(taxlist,{value:data[0][0]})["label"];
														if(nowData == '请选择'){
															nowData = ''
														}
														dispatch({
															type:'itdetails/changePart',
															payload:{
																index:index,
																key:'partsRate',
																value:nowData
															}
														})
													}
												}
											},{
												name: 'purchasingPriceNotax', element:'Input',
												label:'实际维修价',
												defaultValue: i['purchasingPriceNotax'] ,
												attr:{
													type: 'text',
													placeholder:'请输入实际维修价',
													className:'edit-equipment-it-input purchasingPrice-after',
												},
												events:{
													onChange:function(e){
														let dispatch = self.props.dispatch;
														dispatch({
															type:'itdetails/changePart',
															payload:{
																index:index,
																key:'purchasingPriceNotax',
																value:window.replaceNnum(e[0])
															}
														})
													}
												}
											},{
												name: 'form_item_1', element:'Input',
												label:'设备税金',
												defaultValue: rate && rate!='-1'?Number((i["purchasingPriceNotax"]/100*parseFloat(i['partsRate']))).formatMoney(2,'',''):'-',
												attr:{
													type: 'text',
													className:'specail-disabled-input',
													disabled:'disabled',
												}
											},{
												name: 'form_item_2', element:'Input',
												label:'价税合计',
												defaultValue: rate && rate!='-1' && partOperate == '2'?Number((Number(i["purchasingPriceNotax"])+i["purchasingPriceNotax"]/100*parseFloat(i['partsRate']))*i["maintenanceNum"]).formatMoney(2,'',''):'-',
												attr:{
													type: 'text',
													className:'specail-disabled-input',
													disabled:'disabled',
												}
											},{
												name: 'maintenanceRemarks', element:'Input',
												label:'维修描述',
												defaultValue: i["maintenanceRemarks"],
												attr:{
													type: 'text',
													placeholder:'请输入维修描述',
													className:'edit-equipment-it-input',
												},
												events:{
													onChange:function(e){
														let dispatch = self.props.dispatch;
														dispatch({
															type:'itdetails/changePart',
															payload:{
																index:index,
																key:'maintenanceRemarks',
																value:e[0]
															}
														})
													}
												}
											},
										],
										buttons:false,
										changeData:self.changeData.bind(self)
									}
									return <div className="parts-form-item eps-list-card">
														<i className="eps-list-card-bgicon"></i>
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
						<div className="eps-btn eps-btn-default-large" onClick={ this.gotoAddParts }><i className="icon-add-parts"></i>添加配件</div>
						<div className="eps-btn eps-btn-warning-small" onClick={ this.createHandler }>提交</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(function(state){return state})(MaintenanceDetailsIT);