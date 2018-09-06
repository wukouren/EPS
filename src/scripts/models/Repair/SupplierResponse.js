/**
 * 供应商响应 model
 */
export default {
	namespace: 'supplierresponse',
	state: {
		loading:{
			loading:true,fix:true,
			hide:false
		},
		list:[],
		btnDisabled:false
	},
	reducers: {
		changeData(state,action) {
			return { ...state, ...action.payload };
		}
	},
	effects: {
	},
	subscriptions: {
	}
};
