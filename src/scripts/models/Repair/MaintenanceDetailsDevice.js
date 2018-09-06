export default {
	namespace: 'details',
	state: {
	},
	reducers: {
		changeData(state,action) {
			return { ...state, ...action.payload };
		},
		changePart(state,action){
			let data= action.payload;
			let deviceList = [];
			_.each(state['deviceList'],function(i,index){
				if(index == data['index']){
					i[data['key']] = data['value']
				}
				deviceList.push(i)
			})
			let nowData = _.extend({},state,{
				deviceList:deviceList
			});
			return nowData
		}
	},
	effects: {
	},
	subscriptions: {
	}
};
