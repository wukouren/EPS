
import request from './../utils/EpsRequest';

function firstFetch(parame,uploadPhase) {
	let url = '/McdEpsApi/joywok/common/getFileList';
  console.log(parame,uploadPhase,'zzzxcasdasdasdasdas')
  return request(url, {
    method: 'POST',
    body:JSON.stringify({
    	param:{
    		eid:window.eid,
    		condition: {
		      orderNumber: parame,
		      uploadPhase:uploadPhase
          // updateDate:window.updatetime
		    }
	    }
    })
  });
}

export default {
	namespace: 'file',
	state: {
		loading:{
			loading:true,
			fix:true,
			hide:false
		},
		file:[]
	},
	reducers: {
		changeData(state,action){
      return { ...state, ...action.payload };
    }
	},
	effects:{
		*fetch({payload,dispatch}, { call, put ,select}) {
      let datas = yield select();
      let uploadPhase = datas['file']['uploadPhase'];
      let firstData = yield call(firstFetch,payload,uploadPhase);
      let loading = datas["file"]['loading'];
  		loading['loading'] = false;
  		loading['hide'] = true;
  		console.log(firstData['data']['body'],'请求返回的数据');
      let allData = _.extend({
      	loading:loading
      },firstData['data']['body'],{
      })
      NProgress.done();
      yield put({
        type: 'changeData',
        payload: allData,
      });
    },
	},
	subscriptions: {
	},
};
