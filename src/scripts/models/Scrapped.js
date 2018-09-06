
import request from './../utils/EpsRequest';
export default {
	namespace: 'scrapped',
	state: {
		loading:{
			loading:false,
			fix:true,
			hide:false
		},
    list:[]
	},
	reducers: {
		changeData(state,action){
      return { ...state, ...action.payload };
    }
	},
	effects:{
	},
	subscriptions: {
	},
};
