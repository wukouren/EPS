import * as demoService from '../services/Demo';

export default {
	namespace: 'reply',
	state: {
		form:{},
		loading: true,
		fix:true,
		showForm:false
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
