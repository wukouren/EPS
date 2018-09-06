
export default {
	namespace: 'log',
	state: {
		loading: true,
		fix:true,
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
