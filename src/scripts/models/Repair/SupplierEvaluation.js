/**
 * 供应商评估 model
 */

import request from './../../utils/EpsRequest';
import {getUsers} from '../../constants';
function FirstFetch(parame) {
	return request('/McdEpsApi/joywok/repair/getEquipmentList', {
		method: 'POST',
		body:JSON.stringify({
			param:{
				eid:window.eid,
				condition: {
					orderNumber: parame
				},
				pager:{'pageNum':'1','pageSize':'10000'}
			}
		})
	});
}
export default {
	namespace: 'supplierevaluation',
	state: {
		loading:{
			loading:true,
			fix:true,
			hide:false
		},
	},
	reducers: {
		changeData(state,action) {
			console.log(action,"action.payload")
			return { ...state, ...action.payload };
		},
		changeItemData(state,action){
			let data = action['payload'];
			let list = _.clone(state['list'])
			_.each(list,function(i){
				if(i['id'] == data['id']){
					i = _.extend(i,data['data'])
				}
			});
			return _.extend({},state,{
				list:list,
				showMoney:true,
			});
		}
	},
	effects: {
		*fetch({ payload , dispatch}, { call, put ,select}) {
			let datas = yield select();
			let firstData = yield call(FirstFetch,payload);
			let type = datas["supplierevaluation"]['type'];
			let loading = datas["supplierevaluation"]['loading'];
			loading['loading'] = false;
			loading['hide'] = true;
			let list = [];
			let allData={};
			let allParts = [];
			let showMoney=true;
			let maintenancePrice = 0;
			//组织设备的list 
			_.each(_.clone(firstData['data']['body']['pageInfo']['list']),function(i){
				//pageinfo list为设备配件 列表，partName 不为空时为配件项否则为列表项
				console.log(datas["supplierevaluation"]['type'],i,'iiiiiiiiiiii')
				if(i['partName']){
					allParts.push(i);
					i.maintenanceLaborRate=i.rate;
					_.each(list,function(item){
						if(item['deviceNumber'] == i['deviceNumber']){
							if(item['deviceList']){
								i['partMark']=i.mark;
								item['deviceList'].push(i);

							}else{
					    	i['partMark']=i.mark;
								item['deviceList'] = [i]
							}
						}
					})
				}else{
					i['epsid'] = i["deviceNumber"]+ '.' +i["vendorNumber"];
					i['categoryCode'] = i['faCategory'];
					i['subCategoryCode'] = i['subCategory'];
					// i['deviceMark'] = i['mark'];暂时存疑的一个问题
					i['deviceOperate'] = i['operate'];
					i.devceMaintenanceNum = i['maintenanceNum'] || '1';

					i['maintenanceCost']= (i['maintenanceCost'] || '0.00');
					i['maintenanceAccommodation']=(i['maintenanceAccommodation'] || '0.00');
					i['maintenanceTravel']= (i['maintenanceTravel'] || '0.00');
					i['maintenanceOtherCost']=(i['maintenanceOtherCost'] || '0.00');

					if(datas["supplierevaluation"]['type']=='2'){
					  //供应商确认页面，费用的对应字段需要转一下
						_.each(firstData['data']['body']['incidentalList'],function(j){
							console.log(j,'jjjjjjjjjjjjjjjjjjj');
								if(i.deviceNumber==j.deviceNumber){
						      i.maintenanceCost=j.installationFee;
						      i.maintenanceLaborRate=j.installationFeeRate;
						      i.maintenanceTravel=j.carCost;
						      i.maintenanceRate=j.carCostTax;
						      i.maintenanceAccommodation=j.hotelCost;
						      i.maintenanceAccommodationRate=j.hotelCostTax;
						      i.maintenanceOtherCost=j.otherCost;
						      i.maintenanceOtherCostTaxRate=j.otherCostTax;
						      i.otherCostRemark=j.otherCostRemark;

						      i.carCostNotax = j.carCostNotax
						      i.hotelCostNotax = j.hotelCostNotax
						      i.otherCostNotax = j.otherCostNotax
						      i.installationFeeNotax = j.installationFeeNotax
						 	 }
							let flag=false;
							i['deviceMark'] = i['mark'];
							_.each(list,function(k){
							 	if(k.deviceNumber==i.deviceNumber){
							 		flag=true;
							 	}
							})
							if(!flag){
							 	list.push(i);
							}
						})
						showMoney=true;
					}else{
						  //type=1，餐厅确认订单节点拒绝后-->//订单回到供应商评估页面，此时订单评估页面的初始状态会有费用的相关信息
						  //同上，需要组织设备的list相关信息
						  if(firstData['data']['body']['incidentalList']){
						  		_.each(firstData['data']['body']['incidentalList'],function(j){
										if(i.deviceNumber==j.deviceNumber){
								      i.maintenanceCost=j.installationFee;
								      i.maintenanceLaborRate=j.installationFeeRate;
								      i.maintenanceTravel=j.carCost;
								      i.maintenanceRate=j.carCostTax;
								      i.maintenanceAccommodation=j.hotelCost;
								      i.maintenanceAccommodationRate=j.hotelCostTax;
								      i.maintenanceOtherCost=j.otherCost;
								      i.maintenanceOtherCostTaxRate=j.otherCostTax;
								      i.otherCostRemark=j.otherCostRemark;
								      i.carCostNotax = j.carCostNotax
								      i.hotelCostNotax = j.hotelCostNotax
								      i.otherCostNotax = j.otherCostNotax
								      i.installationFeeNotax = j.installationFeeNotax
								 	 }
									let flag=false;
									i['deviceMark'] = i['mark'];
									 _.each(list,function(k){
											 	if(k.deviceNumber==i.deviceNumber){
											 		 flag=true;
											 	}
										 })
									 if(!flag){
									 	  list.push(i);
									 }
									 showMoney=true;
								})
						  }else{
						  	 showMoney=true;
							   list.push(i);
						  }
					}
				}
			});
			allData = _.extend({
				loading:loading,
				showMoney:showMoney,
			},firstData['data']['body'],{
				remark:firstData['data']['body']['maintenanceRemarks'],
				list:list
			})
			if(datas.supplierevaluation['type'] == '2'){
				allData['maintenancePrice'] = maintenancePrice
				let orderMoney = 0;
				let money = 0
				_.each(list,function(i){
					money+=Number(i['maintenanceTravel'])+Number(i['maintenanceAccommodation'])+Number(i['maintenanceCost'])+Number(i['maintenanceOtherCost']);
				});
			}
			getUsers(allData['createEid'],'num',function(resp){
        let userdata = resp['data'][0];
        dispatch({
          type: 'supplierevaluation/changeData',
          payload: {
            avatar:userdata?userdata['avatar']:''
          },
        });
      })
      console.log(allData,'获取到的数据呢');
			NProgress.done();
			yield put({
				type: 'changeData',
				payload: allData,
			});
		}
	},
	subscriptions: {
	}
};
