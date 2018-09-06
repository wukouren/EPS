export default {
	namespace: 'approval',
	state: {
		loading: false,
		fix:false,
		data:[]
	},
	reducers: {
		changeData(state,action){
      return { ...state, ...action.payload };
    }
	},
	effects: {
	},
	subscriptions: {
	},
};
