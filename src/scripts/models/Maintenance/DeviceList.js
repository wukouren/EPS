export default {
	namespace: 'maintenance',
	state: {
		loading: {
			loading: true,
			fix: true,
			hide: false
		},
	},
	reducers: {
		changeData(state, action) {
			return { ...state, ...action.payload };
		}
	},
	effects: {
	},
	subscriptions: {
	}
};
