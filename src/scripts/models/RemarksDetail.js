import * as demoService from '../services/Demo';

export default {
	namespace: 'remarksdetail',
	state: {
		remarks: '餐厅的新地机无法正常使用，请及时处理。'
	},
	reducers: {
		changeData(state,action) {
			return { ...state, ...action.data };
		}
	},
	effects: {
	},
	subscriptions: {
	},
};
