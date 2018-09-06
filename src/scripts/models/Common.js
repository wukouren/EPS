// 公共model
// 获取税率
import * as CommonService from '../services/Common';

export default {
	namespace: 'common',
	state: {
		loading: false
	},
	reducers: {
		changeData(state,action) {
			return { ...state, ...action.data };
		}
	},
	effects: {
    addTipToOptions( options ){
      return options.unshift({label: "请选择", value: "-1"});
    },
		// 获取税率
		*getTaxList({ payload }, { call, put }){
			const {data}=yield call(CommonService.getTaxList);
			if(data.success){
				let taxlist = _.map(data.body.data,(item)=>{
					return { label: item.value, value: item.key }
				})
        // taxlist = this.addTipToOptions(taxlist);
        taxlist.unshift({label: "请选择", value: "-1"});
				// 保存字典
				window.upTabsData('taxlist','cache',taxlist)
				yield put({
          type: 'changeData',
          payload: {
             TaxList: taxlist
          },
        });
			}
		},
		// 获取设备操作建议
		*getEquipmentOperation({ payload }, { call, put }){
			const {data}=yield call(CommonService.getEquipmentOperation);
			if(data.success){
				let equipmentOperation = _.map(data.body.data,(item)=>{
					return { label: item.value, value: item.key }
				})
        equipmentOperation.unshift({label: "请选择", value: "-1"});
				// 保存字典
				window.upTabsData('equipmentOperation','cache',equipmentOperation)
				yield put({
          type: 'changeData',
          payload: {
             TaxList: equipmentOperation
          },
        });
			}
		},
		// 获取配件操作建议
		*getFittingOperation({ payload }, { call, put }){
			const {data}=yield call(CommonService.getFittingOperation);
			if(data.success){
				let fittingOperation = _.map(data.body.data,(item)=>{
					return { label: item.value, value: item.key }
				})
        fittingOperation.unshift({label: "请选择", value: "-1"});
				// 保存字典
				window.upTabsData('fittingOperation','cache',fittingOperation)
				yield put({
          type: 'changeData',
          payload: {
             TaxList: fittingOperation
          },
        });
			}
		},
		// 获取餐厅信息
		*getPRStoreInfo({ payload }, { call, put }){
			const {data}=yield call(CommonService.getPRStoreInfo);
			// console.log('PRStoreInfo:=====',data);
			if(data.success){
				// 保存字典
				window.upTabsData('PRStoreInfo','cache',data.body)
			}
		},
		// 获取采购类型
		*getPRTypeInfo({ payload }, { call, put }){
			const {data}=yield call(CommonService.getPRTypeInfo);
			// console.log('PRTypeInfo:=====',data);
			if(data.success){
				let PRTypeInfo = _.map(data.body.list,(item)=>{
					return { label: item.text, value: item.value }
				})
				// 保存字典
				window.upTabsData('PRTypeInfo','cache',PRTypeInfo)
			}
		},
		// 获取报废单号
		*getPRWriteoffInfo({ payload }, { call, put }){
			const {data}=yield call(CommonService.getPRWriteoffInfo);
			// console.log('PRWriteoffInfo:=====',data);
			if(data.success){
				let PRWriteoffInfo = _.map(data.body.list,(item)=>{
					return { label: item.scrapNumber, value: item.scrapNumber }
				})
				// 保存字典
				window.upTabsData('PRWriteoffInfo','cache',PRWriteoffInfo)
			}
		},



	},
	subscriptions: {
	},

};
