/*
 * PM确认供应商的需求明细 model
 */
export default {
	namespace: 'pmconfirm',
	state: {
		loading: {
			loading: true,
			fix: true,
			hide: false
		},
		loading: true,
	},
	reducers: {
		changeData(state, action) {
			// console.log('changeData:',action)
			return { ...state, ...action.data };
		}
	},
	effects: {
	},
	subscriptions: {
	}
};
