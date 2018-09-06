import request from './../../utils/EpsRequest';
function FirstFetch(parame) {
  return request('/McdEpsApi/joywok/repair/getStoreEvaluate', {
    method: 'POST',
    body:JSON.stringify({
    	param:{
    		eid:window.eid,
    		condition: {
		      orderNumber: parame
		    },
		    pager:{'pageNum':'1','pageSize':'1000'}
	    }
    })
  });
}
export default {
	namespace: 'projectinfo',
	state: {
		loading:{
			loading:true,
			fix:true,
			hide:false
		},
	},
	reducers: {
		changeData(state,action) {
			return { ...state, ...action.payload };
		}
	},
	effects: {
		*fetch({ payload }, { call, put ,select}) {
      let datas = yield select();
      // let firstData = yield call(FirstFetch,payload);
      let secondData = yield call(FirstFetch,payload);
      // console.log(secondData,'这个里面有什么数据ne');
      let loading = datas["projectinfo"]['loading'];
  		loading['loading'] = false;
  		loading['hide'] = true;
  		loading['fix'] = false;
      // let allData = _.extend({
      // 	loading:loading
      // },firstData['data']['body'],secondData['data']['body'],{
      // 	list:firstData['data']['body']["pageInfo"]['detailList']
      // })
      let allData = _.extend({
      	loading:loading
      },secondData['data']['body'],{
      	list:secondData['data']['body']["detailList"].length!=0?secondData['data']['body']["detailList"]:secondData['data']['body']["orderList"]["list"]
      })
      NProgress.done();
      yield put({
        type: 'changeData',
        payload: allData,
      });
    }
	},
	subscriptions: {
	}
};
