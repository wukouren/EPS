import request from './../../utils/EpsRequest';

function firstFetch(parame,type) {
	let url = '/McdEpsApi/joywok/gc/getOrderInfo'
  return request(url, {
    method: 'POST',
    body:JSON.stringify({
    	param:{
    		eid:window.eid,
    		condition: {
		      orderNumber: parame
		    }
	    }
    })
  });
}
export default {
	namespace: 'store',
	state: {
		loading:{
			loading:true,
			fix:true,
			hide:false
		}
	},
	reducers: {
		changeData(state,action) {
			return { ...state, ...action.payload };
		}
	},
	effects: {
		*fetch({payload,dispatch}, { call, put ,select}) {
      let datas = yield select();
      let type = datas['store']['type'];
      let firstData = yield call(firstFetch,payload,type);
      console.log(firstData["data"]['body'],'请求回来的数据');
      let loading = datas["store"]['loading'];
  		loading['loading'] = false;
  		loading['hide'] = true;
      let allData = _.extend({
      	loading:loading
      },firstData["data"]['body'],{
      })
      NProgress.done();
      yield put({
        type: 'changeData',
        payload: allData,
      });
    },
	},
	subscriptions: {
	}
};
