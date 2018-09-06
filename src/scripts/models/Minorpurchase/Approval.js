import request from './../../utils/EpsRequest';

function firstFetch(parame,type) {
	let url = '/McdEpsApi/joywok/reimage/getECOrderAdjustInfo'
  let data = {
  }
  if(type !='equipment'){
    url = '/McdEpsApi/joywok/reimage/getITOrderInfo'
    data['demandNumber'] = parame
  }else{
    data['orderNumber'] = parame
  }
  console.log(url,'获取数据的url是什么呢')
  return request(url, {
    method: 'POST',
    body:JSON.stringify({
    	param:{
    		eid:window.eid,
    		condition: data
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
      let type = datas['store']['model_type'];
      let firstData = yield call(firstFetch,payload,type);
      console.log('dddd',datas,'1',firstData);
      let loading = datas["store"]['loading'];
  		loading['loading'] = false;
  		loading['hide'] = true;
      let allData = _.extend({
      	loading:loading
      },firstData["data"]['body'],{
      })
      NProgress.done();
      console.log(firstData["data"]['body'],allData,'看看这个里面有啥很么呢')
      yield put({
        type: 'changeData',
        payload: allData,
      });
    },
	},
	subscriptions: {
	}
};
