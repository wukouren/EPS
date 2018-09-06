import * as demoService from '../services/Demo';

export default {
	namespace: 'todos',
	state: {
		loading: false
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
