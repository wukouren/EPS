/**
 * 创建IT维修 路由为 /repairing/createpo/it
 * 供应商确认IT订单  路由为/repairing/assess/it/:orderid?type=2
 * orderid有值 就说明是供应商确认 提交接口就为 提交确认订单&填写订单维修明细：/McdEpsMobile/rest/repair/submitITSupplierEvaluateAdjust
 * orderid没值 就说明是新建接口 提交接口就为 TSI提交创建维修订单 /McdEpsApi/joywok/repair/submitITOrder
 *
 * 此页面主要逻辑：
 * 1. 页面加载后，将IT设备和IT设备配件list dispatch到repairit model中去
 * 2. 监听搜索设备页面的设备添加，将数据跟现有数据合并，并dispatch到repairit model中去
 * 3. 点击某个设备卡片时，跳转到IT设备维修详单页面，缓存点击的设备信息，缓存此设备对应的配件list, 以便在设备维修详单页面读取
 * 4. 监听IT设备详单的信息修改（这里涉及IT设备修改，IT设备配件修改），监听到以后将IT设备，IT设备配件数据更新到repairit model中去
 * 5. 删除设备，同时删除该设备下的配件， 将数据dispatch到repairit model中去
 * 6. 表单提交，提交时将数据转换成eps后台要求的参数
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { List, InputItem, Picker } from 'jw-components-mobile';
import SimpleUserCard from '../../components/Common/SimpleUserCard';
import { AlertBase, ConfirmBase, AlertInfoBase } from '../../components/Common/EpsModal';
import { ItCardListShow } from '../../components/Common/ItCard';
import EmptyWithArrow from '../../components/Common/EmptyWithArrow';
import UploadFile from '../../components/Common/UploadFile';
import { getDict, PAGE_SIZE } from '../../constants';
import request from '../../utils/EpsRequest';

let equipmentOperation = getDict('equipmentOperation');
class CreateIT extends Component {

	constructor(props) {
		super(props);
		this.state = _.extend({
			orderNumber800: '', // 800维修单号
			maintenanceOtherCostTaxRate: '', // 税率
			supRemarks: '', // 流程备注 
			storeNumber: '', // 餐厅id
			storeName: '', // 餐厅名称
			otherFeesNotax: '', // 其它费用
			otherCostRemark: '', // 其它费用备注 
			file:[] // 图片
		},this.props.repairit.record);


		this.gotoAddIt = this.gotoAddIt.bind(this);
		this.createHandler = this.createHandler.bind(this);
		this.deleteITEquipment = this.deleteITEquipment.bind(this);

		console.log('ooooooo:',this.props.params.orderid)
		// 获取订单信息
		if(this.props.params.orderid){
			this.getITOrderInfo();
		}
		// 获取TSI信息
		let dispatch = this.props.dispatch;
		dispatch({
			type:'repairit/getTSIInfo',
			payload:{
			}
		})
	}

	// 加载数据
  getITOrderInfo(nextPageNum){
		let self = this;
		let dispatch = this.props.dispatch;
    nextPageNum = nextPageNum ? nextPageNum : 1;
		dispatch({
			type:'repairit/getITOrderInfo',
			payload: {
        condition:{
          // 订单编号
          orderNumber: this.props.params.orderid,
        },
        pager: {
          pageNum: nextPageNum,
          pageSize: PAGE_SIZE
        }
      }
		})
  }

	cacelHandler(){
		console.log('cacelHandler')
		jw.closeWebView();
	}

	// 打开添加IT设备页面
	gotoAddIt(){
		let url = EpsWebRoot+'/#/repairing/add-edit/it';
    console.log('url:',url)
    jw.pushWebView(url);
	}

	// 打开添加餐厅页面
	gotoAddStore(){
		let data = this.props.repairit;
		let url = EpsWebRoot+'/#/repairing/add-edit/store';
    console.log('url:',url)
    jw.pushWebView(url);
    setTimeout(function(){
    	window.upTabsData('select:store','publish',{
    		storeNumber:data['record']['storeNumber'],
    		storeName:data['record']['storeName']
    	})
    },800)
	}

	// 表单校验
	checkData(){
		let record = this.props.repairit.record;
		let repairit = this.props.repairit;
		console.log('checkData:',record,repairit);
		// 餐厅名称必填
		if(record.storeNumber=='' || record.storeName==''){
			this.errorAlert('请挑选餐厅');
			return false;
		}
		// 校验800维修单号 
		if(record.orderNumber800 == ''){
			this.errorAlert('请选择800维修单号');
			return false;
		}else{
			let orderNumber800 = record.orderNumber800.toLowerCase();
			if((/^inc[0-9]{8}$/.test(orderNumber800))){
			}else if(!(/^inc(.*?)/.test(orderNumber800))){
				this.errorAlert('800维修单号请以inc开头');
				return false;
			}else{
				this.errorAlert('请正确填写800维修单号');
				return false;
			}
		}
		// 校验备注
		if(record.supRemarks == '' || $.trim(record.supRemarks)==''){
			this.errorAlert('请输入备注');
			return false;
		}
		// 校验设备
		if(repairit.selectITs.length==0){
			this.errorAlert('请选择维修设备');
			return false;
		}

		let error = '';
		for(var i=0;i<repairit['selectITs'].length;i++){
			let item = repairit['selectITs'][i];
			console.log(item,'123123123123123123');
			if(item['deviceOperate'] == '请选择' || item['deviceOperate'] =='-1'){
				error = '请正确选择配件的操作建议！'
				break;
			}
			// if(typeof(item['purchasingPriceNotax']) == 'undefined' || isNaN(item['purchasingPriceNotax']) || item['purchasingPriceNotax']==0){
			// 	error = '请正确输入配件的实际维修价！'
			// 	break;
			// }
			if(item['deviceOperate'] == '4'){
				console.log(item['deviceOperate'],typeof(item['partsnum'])!='undefined',item['partsnum']>0);
				if(typeof(item['partsnum'])!='undefined' && item['partsnum']>0){
					error = '当前设备建议报废，不能选择配件！'	
					break;
				}
			}
			// else{
			// 	if(typeof(item['partsnum'])=='undefined' || isNaN(item['partsnum']) || item['partsnum']==0){
			// 		error = '请正确输入配件的维修数量！'
			// 		break;
			// 	}	
			// }
		}

		if(error){
			this.errorAlert(error);
			return false;
		}
		for(var j=0;j<repairit["selectITParts"].length;j++){
			let item = repairit["selectITParts"][j];
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
		// 其他费用大于0时，其他备注税率必填
		if (record.otherFeesNotax>0 && (typeof(record.maintenanceOtherCostTaxRate)=='undefined'|| record.maintenanceOtherCostTaxRate.length==0 ||record.maintenanceOtherCostTaxRate =='请选择')){
			this.errorAlert('当其他费用大于0，必须选择税率');
			return false;
		}
		// 其他费用大于0时，其他备注必填
		if (record.otherFeesNotax>0 && $.trim(record.otherCostRemark)==''){
			this.errorAlert('当其他费用大于0，其他费用备注必须填写');
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

	// 表单提交
	createHandler(){
		console.log('createHandler')
		let dispatch = this.props.dispatch;
		let self = this;
		let record=_.clone(self.props.repairit.record);
		// 校验数据是否正确
		if(this.checkData() == false) return;
		// 确认提交
		ConfirmBase({
			tip: '确认要提交维修订单？',
			icon: 'icon-repair-alert',
			onOk: ()=>{
				// 数据保存中
				let saving = AlertBase({
					tip: '正在提交维修订单',
					icon: 'icon-saving',
					okBtn: {
						text: '提交中...'
					},
					onOk: ()=>{
						console.log('onOk')
					}
				});
				
				let url;
        record['equipmentRepairList'] = self.mapEquipmentRepairList(); // IT设备列表
        record['partRepairList'] = self.mapPartRepairList(); // IT设备配件列表
				if (record['otherFeesNotax'] == '') record['otherFeesNotax']='0.00'; // 如果其他费用未填，此数据就可不提交



				if(record['maintenanceOtherCostTaxRate']=="-1") record['maintenanceOtherCostTaxRate']=''; // 如果值为－1 那么置空
				if(typeof(record['maintenanceOtherCostTaxRate'])=='object') record['maintenanceOtherCostTaxRate'] = record['maintenanceOtherCostTaxRate'][0];


				// 供应商确认订单提交一个地址
				if(self.props.params.orderid){
					url='/McdEpsApi/joywok/repair/submitITSupplierEvaluateAdjust';
					record['orderNumber'] = self.props.params.orderid;
					record['orderState'] = self.props.repairit.orderState; // 订单状态 待德勤回复
					record['updateDate'] = self.props.repairit.updateDate; // 更新时间 待德勤回复
					delete record['file'];
				// 新建订单提交一个地址
				}else{
					url='/McdEpsApi/joywok/repair/submitITOrder';
				}
				// record['storeScrapList'] = self.props.repairit.storeScrapList;
				console.log(url,record,"submitITOrder:data");
				// return;
				request(url,{
					method:'POST',
					body:JSON.stringify({
            param:{
              eid:eid,
              record:record,
            }
        }),
					credentials: 'same-origin',
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(function(data){
					saving.close();
			    console.log(data.data.success,"data");
			    if(data.data.success){
			    	AlertBase({
							tip: '已成功提交',
							icon: 'icon-save-success',
							onOk: ()=>{
								setTimeout(function(){
									jw.closeWebView()
								},500)
							}
						});
			    }
				}).catch(function(error) {
			  })
				
			},
			onCancel: ()=>{
				// 提交失败
				// AlertBase({
				// 	tip: '这里是错误示例',
				// 	icon: 'icon-save-error',
				// 	onOk: ()=>{
				// 		console.log('onOk')
				// 	}
				// });
			}
		});
		
	}

	// 表单提交时 重组IT设备列表
	mapEquipmentRepairList(){
		let data = this.props.repairit;
		let record = data['record'];
		if(data.selectITs.length>0){
			return _.map(data.selectITs,(item)=>{
				return {
					itDeviceNumber: item.deviceCode,
					itDeviceName: item.deviceName,
					faCode: item.categoryCode,
					faCode2: item.subCategoryCode,
					typeDescription: item.typeDescription,
					typeCode: item.typeCode,
					deviceOperate: item.deviceOperate ? item.deviceOperate : equipmentOperation[0].value, // 建议操作
					maintenanceRemarks: item.maintenanceRemarks ? item.maintenanceRemarks : '' // 设备备注
    		}
			})
		}
		return [];
	}

	// 表单提交时 重组IT设备配件列表
	mapPartRepairList(){
		let data = this.props.repairit;
		let record = data['record'];
		let fittingOperation = getDict('fittingOperation');
		console.log('partRepairList:',data.selectITParts)
		if(data.selectITParts.length>0){
			return _.map(data.selectITParts,(item)=>{
				return {
					partDeviceNumber: item.partDeviceNumber, // it设备编号
					partTypeCode: item.partTypeCode, // 型号代码
					partsNumber: item.partsNumber, // 配件编号
	        partsName: item.partsName, // 配件名称
	        accessoriesReferencePrice: item.accessoriesReferencePrice, // 参考价
	        maintenanceNum: item.maintenanceNum, // 数量
	        partOperate: item.partOperate ? item.partOperate : fittingOperation[0].value , // 操作
	        partsRate: item.partsRate, // 税率
	        purchasingPriceNotax: item.purchasingPriceNotax, // 实际维修价格
	        maintenanceRemarks: item.maintenanceRemarks, // 配件备注
	        partIsFa: item.partIsFa// 是否入固定资产
				}
			})
		}
		return [];
	}


	
	addPic(datas){
		let dispatch = this.props.dispatch;
		let data = this.props.repairit;
		let record = data['record'];
		record['file'] = record['file'].concat(datas);
		dispatch({
			type:'repairit/changeData',
			payload:{
				record:record
			}
		})
	}
	removePic(resid){
		let dispatch = this.props.dispatch;
		let data = this.props.repairit;
		let record = data['record'];
		let nowData = []
		_.each(record['file'],function(i,index){
			if(resid != i['resid']){
				nowData.push(i)
			}
		})
		record['file'] = nowData;
		dispatch({
			type:'repairit/changeData',
			payload:{
				record:record
			}
		})
	}
	changePic(resid,id){
		let dispatch = this.props.dispatch;
		let data = this.props.repairit;
		let record = data['record'];
		let nowData = []
		_.each(record['file'],function(i,index){
			if(resid == i['resid']){
				i['serverId'] = id
				i['url'] = window.jwurl+'/file/download?code='+window.code+'&file_id='+id;
			}
			nowData.push(i);
		})
		record['file'] = nowData;
		dispatch({
			type:'repairit/changeData',
			payload:{
				record:record
			}
		})
	}

	// 修改record值
	changeRecord(params){
		// console.log(params,'zzzzzzzzzzzzzzzzz');
		let self = this;
		let maintenanceOtherCostTaxRate = ''
		_.each(params,function(i,key){
			if(key == 'maintenanceOtherCostTaxRate'){
				maintenanceOtherCostTaxRate = _.findWhere(self.taxrate,{value:i[0]});
			}
		})
		let dispatch = this.props.dispatch;
		let data = this.props.repairit;
		let record ;
		if(maintenanceOtherCostTaxRate){
			record = _.extend(data['record'],{
				maintenanceOtherCostTaxRate:maintenanceOtherCostTaxRate['label']
			});
		}else{
			record = _.extend(data['record'],params);
		}
		dispatch({
			type:'repairit/changeData',
			payload:{
				record:record
			}
		})	
	}

	// set wrap 高度
	setWrapHeight(){
		let self = this;
		let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		let footerheight = $('.eps-footer').height() || 0;
		let fileHeight = $('.file-num-specail').height()||0;
    // let ListHeight = $(window).height()-$(ReactDOM.findDOMNode(self.refs.listWrap)).offset().top-footerheight-fileHeight;
    // $(ReactDOM.findDOMNode(self.refs.listWrap)).css({'min-height': ListHeight});
    // 页面最大高度
	  // $(ReactDOM.findDOMNode(self.refs.createITBody)).css({'max-height': ($(window).height()-footerheight-fileHeight)});
	  console.log(clientHeight,footerheight,fileHeight,'这几个值是多少呢')
	  $('.eps-scroll-body').css({'maxHeight':clientHeight - footerheight - fileHeight+'px'})
	}
	// 组件加载完毕
  componentDidMount(){
  	NProgress.done();
    let self = this;
    // 安卓或者web端 可监听scorll来设置导航是否fixed
    this.headerOffset = $('.eps-create-device-body .eps-box-wrap').offset();
    if (!(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent))) {
      // this.headerFixedHandle();
    }

    // 订阅选择餐厅事件
    PubSub.subscribe('get:child:select:store',function(evt,data){
    	console.log("subscribe('get:child:select:store':",data['data'][0])
    	let dispatch = self.props.dispatch;
    	let oldData = self.props.repairit['record'];
    	_.extend(oldData,{
    		storeNumber:data['data'][0]['usCode'],
    		storeName: data['data'][0]['longSiteDesc']
    	})
    	console.log('=======:',oldData)
			dispatch({
				type:'repairit/changeData',
				payload:{
					record:oldData
				}
			})
    })
    // 订阅选择IT设备事件
    PubSub.subscribe('get:child:select:it',function(evt,data){
    	console.log("subscribe('get:child:select:it':",data['data'])
    	let dispatch = self.props.dispatch;
    	let oldData = self.props.repairit['record'];
    	let selectITepsids = [];
    	_.each(self.props.repairit['selectITs'],(item)=>{
    		// item['deviceOperate'] = '1';
    		selectITepsids.push(item.epsid);
    	});
    	let selectITs = self.props.repairit['selectITs'];
    	// 去重合并IT设备数据
    	let alreadyExistDevices = [];
    	_.each(data['data'],(item)=>{
    		item['deviceOperate'] = '1';
    		if(_.indexOf(selectITepsids,item.epsid)==-1){
    			// 向列表上方追加
    			selectITs = _.union([item], selectITs);
    		}else{
    			alreadyExistDevices.push(item.deviceName);
    		}
    	})
    	if(alreadyExistDevices.length>0){
    		AlertInfoBase({
          text:'以下设备已被添加,此次不会重复添加:',
          deviceNames:alreadyExistDevices
        })
    	}
    	// 重设高度
    	self.setWrapHeight();

    	console.log('selectITs:',selectITs)
			dispatch({
				type:'repairit/changeData',
				payload:{
					selectITs: selectITs,
					record:oldData
				}
			})
    })
    // 订阅维修详单的信息修改（这里涉及IT设备修改，IT设备配件修改），监听到以后将IT设备，IT设备配件数据更新到repairit model中去
    PubSub.subscribe('get:edit:maintenance:itdetails',function(evt,data){
    	// console.log('1111111')
    	let dispatch = self.props.dispatch;
    	let ITEquipment = data.ITEquipment;
    	// console.log('2222')
    	let newITParts = _.filter(self.props.repairit['selectITParts'],(item)=>{
    		return item.partDeviceEpsid != ITEquipment.epsid;
    	});
    	// 设备数据替换
    	let newITs = _.map(self.props.repairit['selectITs'],(item)=>{
    		if(item.epsid == ITEquipment.epsid){
    			return _.extend(item,ITEquipment);
    		}else{
    			return item;
    		}
    	});
    	// console.log('newITs:',newITs, 'ITS union:',_.union(newITs,data.ITEquipment),'newITParts:',_.union(newITParts,data.ITParts))
    	// 更新
			dispatch({
				type:'repairit/changeData',
				payload:{
					selectITs: newITs,
					selectITParts: _.union(data.ITParts,newITParts)
				}
			})
    	console.log("get:edit:maintenance:itdetails:",self.props.repairit.selectITParts,data)
		});

		// 安卓兼容 
		if(isAndroid()){
			let lastHeight = $( window ).height();
			let newHeight;
			$( window ).resize(function() {
				newHeight = $( window ).height();
				// 在安卓中，如果键盘呼起，那么其他费用会挡住inc和备注的输入框，所以当这两个输入框focus时，将其他费用设为absolute;
				let occlusionFlag = false;
				if($(ReactDOM.findDOMNode(self.refs.otherInfoWrap)).offset().top<($(ReactDOM.findDOMNode(self.refs.remarksInput)).offset().top+50)){
					if($(ReactDOM.findDOMNode(self.refs.incInput)).find('input').is(':focus') || $(ReactDOM.findDOMNode(self.refs.remarksInput)).find('input').is(':focus')){
	        	occlusionFlag = true;
        	}
				}
				if(occlusionFlag == true){
					$(ReactDOM.findDOMNode(self.refs.listWrap)).addClass('eps-fix-absolute');
	        $(ReactDOM.findDOMNode(self.refs.footerWrap)).addClass('eps-fix-absolute');
				}else{
					$('.eps-fix-absolute').removeClass('eps-fix-absolute');
					self.setWrapHeight();
				}
				// 编辑其他费用时，其他费用要显示出来
				let largeToSmallFlag = false; // 高度由大变小，那么就需要让费用absolute，否则费用移除absolute
				if($(ReactDOM.findDOMNode(self.refs.otherCostInput)).find('input').is(':focus') || $(ReactDOM.findDOMNode(self.refs.otherMarksInput)).find('input').is(':focus')){
					if(lastHeight>newHeight){
						$(ReactDOM.findDOMNode(self.refs.otherInfoWrap)).addClass('eps-cs-fix-absolute');
					}else{
						$(ReactDOM.findDOMNode(self.refs.otherInfoWrap)).removeClass('eps-cs-fix-absolute');
						self.setWrapHeight();
						setTimeout(()=>{
							$('.eps-create-it-body').scrollTop($(ReactDOM.findDOMNode(self.refs.otherInfoWrap)).top);
						})
						// $('.eps-create-it-body').scrollTop(100000);
					}
				}else{
					$(ReactDOM.findDOMNode(self.refs.otherInfoWrap)).removeClass('eps-cs-fix-absolute');
					self.setWrapHeight();
				}
				lastHeight = newHeight;
      });
		}
    setTimeout(function(){
    	self.setWrapHeight();
    },300)
  }

  // 删除已选设备 同时删除该设备下的配件
  deleteITEquipment(item){
  	console.log('deleteITEquipment:',item)
  	let dispatch = this.props.dispatch;
  	let selectITs = this.props.repairit['selectITs'];
  	let newSelectITs = _.filter(selectITs,(it)=>{ return it.epsid!=item.epsid; })
  	let selectITParts = this.props.repairit['selectITParts'];
  	let newSelectITParts = _.filter(selectITParts,(itparts)=>{ return itparts.partDeviceEpsid!=item.epsid; })
  	console.log('selectITs:',selectITs)

  	// let storeScrapList = [];
  	// _.each(this.props.repairit['storeScrapList'],function(i){
  	// 	if(i['itDeviceName']!=item['itDeviceName']){
  	// 		storeScrapList.push(i)
  	// 	}
  	// })
		dispatch({
			type:'repairit/changeData',
			payload:{
				selectITs: newSelectITs,
				selectITParts: newSelectITParts,
				// storeScrapList:storeScrapList
			}
		})
		// 存储到localstorage 下一个页面使用
		window.upTabsData('CreateIT:changeData:selectITs','cache',newSelectITs);
		window.upTabsData('CreateIT:changeData:selectITParts','cache',newSelectITParts);
  }
  renderItList(list){
		console.log('this.props.list========',list)
		if(list && list.length>0){
			let selectITParts = this.props.repairit['selectITParts'];
			return (
		    <ul className="eps-it-list">
					{
						list.map( (item) => { 
							let partslist = [];
							partslist = _.where(selectITParts,{ partDeviceEpsid: item.epsid })
							return (
								<ItCardListShow itemdata={item} partslist={ partslist } editable={ true } onDelete={ this.deleteITEquipment }/>
							)
						})
					}
		    </ul>
	  	);	
		}else{
			return (<EmptyWithArrow icon="icon-add-repair-it"/>)
		}
  }
  test(v){
  	let datas = window.replaceNnum(v);
		let dispatch = this.props.dispatch;
		let data = this.props.repairit;
		console.log(datas,'otherFeesNotax');
		let record = _.extend(data['record'],{
			otherFeesNotax:datas
		});
		console.log(record["otherFeesNotax"],'otherFeesNotax','----------------');
		dispatch({
			type:'repairit/changeData',
			payload:{
				record:record
			}
		})
  	
  }
  turnMoney(data){
		return Number(data).formatMoney(2,'','')
	}
  openFileView(data){
		var url = EpsWebRoot+'/#'+data;
		let datas = this.props.repairit;
		window.upTabsData('file','cache',datas);
		jw.pushWebView(url);
	}
	render(){
		let self = this;
		let taxrate = getDict('taxlist');
		this.taxrate = taxrate;
		// console.log('taxrate:===',taxrate)
		let data = this.props.repairit;
	 	// console.log('render: record:',data.record, 'render: orderinfo:',data.ITOrderInfo,'render:selectITs:',data.selectITs,'render:selectITParts:',data.selectITParts);
	 	console.log(data,'这个值是什么呢')
	 	let ItList = this.renderItList( data.selectITs );
	 	let uploadfile;
 		let orderid = window.location.href.split('?updateDate')[0].split('/');
		orderid = orderid[orderid.length-1];
		let fileUrl = '/file/'+orderid;
		if(window.isUnfinishedOrHistory()){
			fileUrl = '/filehistory/'+orderid
		}
		let fileShow ;
	 	if(this.props.params.orderid){
	 		// uploadfile = '';
	 		uploadfile = ''
			fileShow = <div className="file-num-specail before" onClick={(e)=>this.openFileView(fileUrl)}>
				<i className="icon-file"></i>
				<span className="preview-file">查看附件{ data['fileCount'] && data['fileCount']!=0?('('+data['fileCount']+')'):''}</span>
			</div>
	 	}else{
	 		uploadfile = (<div className="eps-cs-fileupload">
									<UploadFile 
										fileData={data["record"]["file"]} 
										addPic={(e)=>this.addPic(e)} 
										removePic={(e)=>this.removePic(e)} 
										changePic={(index,id)=>this.changePic(index,id)}
									></UploadFile>
								</div>);
	 	}
	 	// 组织显示内容
		if(this.props.params.orderid && data.loading){
		return (<div className="todos-loading">
				<img src="images/loading.gif" />
				<span>加载中</span>
			</div>)
		}else{
			if(data.firstEnter==true){
				setTimeout(()=>{
				 	// 改为整体滚动
    			self.setWrapHeight();
				},200)
			}
			let maintenanceOtherCostTaxRate = '';
			let maintenanceOtherCostTaxRateValue = ''
			if(data['record'].maintenanceOtherCostTaxRate == '11%' || data['record'].maintenanceOtherCostTaxRate == '17%'){
				let dispatch = this.props.dispatch;
				if(data['record'].maintenanceOtherCostTaxRate == '11%'){
					nowData = '10%';
				}else{
					nowData = '16%';
				}
				dispatch({
					type:'repairit/changeData',
					payload:{
						record:{
							maintenanceOtherCostTaxRate:nowData
						}
					}
				})
				// maintenanceOtherCostTaxRateValue = 	nowData
			}else{
				maintenanceOtherCostTaxRate = _.findWhere(taxrate,{label:data['record'].maintenanceOtherCostTaxRate}); 
				if(maintenanceOtherCostTaxRate){
					maintenanceOtherCostTaxRate = maintenanceOtherCostTaxRate['value'];
					// maintenanceOtherCostTaxRateValue = maintenanceOtherCostTaxRate['label']
				}	
			}

			
			console.log(maintenanceOtherCostTaxRate,'这个是是啊啊奥术大师大所大所');
			return (
				<div className="eps-create-it">
					<div className="eps-scroll-body">
						<header className="header header-hide-userinfo" ref="header">
							<div className="header-bg"></div>
							<div className="header-bg-2"></div>
							<div className="header-c">
								<SimpleUserCard userinfo={ userinfo }/>
							</div>
						</header>
						<div className="eps-create-it-body" ref="createITBody">
							<div className="eps-box-wrap">
								<div className="eps-box eps-box-with-addbtn">
									<div className="am-list-item am-input-item am-input-disabled jw-inline " onClick={ this.gotoAddStore.bind(this) }><div className="am-input-label am-input-label-5"><i className="icon-arrow-right"></i><div className="label-required"><label>餐厅名称</label><i className="icon-required"></i></div></div><div className="am-input-control">{ data['record'].storeName ? data['record'].storeName : (<font className="eps-placeholder">请选择餐厅</font>) }</div></div>
									<div className="am-list-item am-input-item am-input-disabled jw-inline eps-it-tsi"><div className="am-input-label am-input-label-5">TSI</div><div className="am-input-control">{ data.TSIInfo.vendorName }</div></div>
									<InputItem ref="incInput" className="jw-inline" placeholder={ data['record'].orderNumber800 ? '' : "INC+8位数字" } value={ data['record'].orderNumber800 } onChange={ v => { self.changeRecord( {'orderNumber800' : $.trim(v)} ); } }><div className="label-required"><label>800维修单号</label><i className="icon-required"></i></div></InputItem>
									<InputItem ref="remarksInput" className="jw-inline eps-form-memo" placeholder={ data['record'].supRemarks ? '' : "请输入备注" } value={ data['record'].supRemarks } onChange={ v => { self.changeRecord( {'supRemarks' : v} ); } }><div className="label-required"><label>备注</label><i className="icon-required"></i></div></InputItem>
									<div className="btn-wrap"><i className="icon-add-graybg" onClick={ this.gotoAddIt }></i></div>
								</div>
							</div>
							<div className="eps-cs-content" ref="listWrap">
								{ ItList }
								<div className={ data.selectITs.length>0 ? "eps-cs-otherinfo eps-cs-relative" : "eps-cs-otherinfo eps-cs-relative" } ref="otherInfoWrap">
									<div className="eps-cit-cost">
										<div className="cost-form-inline">
											<InputItem ref="otherCostInput" className="jw-inline eps-inline jw-inline-specail" placeholder={ (data['record'].otherFeesNotax || data['record'].otherFeesNotax=='0') ? '' : "请输入费用"} value={ data['record'].otherFeesNotax } onChange={ (v) => self.test(v)}>其他费用(不含税)</InputItem>
											<List style={{ backgroundColor: 'white' }}  className="picker-list jw-list eps-inline">
												<Picker data={ taxrate } cols={1} className="forss" value={[maintenanceOtherCostTaxRate]} onChange={ v => { self.changeRecord( {'maintenanceOtherCostTaxRate' : (typeof(v)=="string" ? [v] : v)} ); } }>
								          <List.Item arrow="horizontal">税率</List.Item>
								        </Picker>
							        </List>
										</div>
										<InputItem ref="otherCostInput2" readonly="readonly" className="jw-inline jw-inline-specail2" placeholder={data['record'].otherCostRemark ? '' : "请输入其他费用"} value={data['record'].otherFeesNotax&& maintenanceOtherCostTaxRate && maintenanceOtherCostTaxRate != '-1' ? self.turnMoney(Number(data['record'].otherFeesNotax) + Number(data['record'].otherFeesNotax/100*parseFloat(data['record'].maintenanceOtherCostTaxRate))):'-'} >其他费用(含税)</InputItem>
										<InputItem ref="otherMarksInput" className="jw-inline jw-inline-specail2" placeholder={ data['record'].otherCostRemark ? '' : "请输入其他费用备注" } value={ data['record'].otherCostRemark } onChange={ v => { self.changeRecord( {'otherCostRemark' : v} ); } }>其他费用备注</InputItem>
										<div className="money-show-other-tip has-padding" >
											<i className="icon-money-tips"></i>
											<div className="money-show-other-tip-v">在合同期内，如遇增值税税率发生变化，订单项下不含税价保持不变。</div>
										</div>
									</div>
									{ uploadfile }
								</div>
							</div>
						</div>
					</div>
					{fileShow}
					<div className="eps-footer" ref="footerWrap">
						<div className="eps-btn-wrap">
							<div className="eps-btn eps-btn-default-small" onClick={ this.cacelHandler }>取消</div>
							<div className="eps-btn eps-btn-warning-large" onClick={ this.createHandler }>提交</div>
						</div>
					</div>
				</div>
			);
		}
	}
}
/*
	<Picker data={ taxrate } cols={1} className="forss" value={ data['record'].maintenanceOtherCostTaxRate=='0' ? '' : (typeof(data['record'].maintenanceOtherCostTaxRate)=='string' ? [data['record'].maintenanceOtherCostTaxRate] : data['record'].maintenanceOtherCostTaxRate) } onChange={ v => { self.changeRecord( {'maintenanceOtherCostTaxRate' : (typeof(v)=="string" ? [v] : v)} ); } }>
								          <List.Item arrow="horizontal">税率</List.Item>
								        </Picker>
 */ 

export default connect((state)=>{ return state})(CreateIT);