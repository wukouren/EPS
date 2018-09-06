
import request from './../../utils/EpsRequest';

function firstFetch(parame, type) {
	let url = '/McdEpsApi/joywok/maintenance/getYearPlan'
	if (type != 'year') {
		url = '/McdEpsApi/joywok/maintenance/getMonthPlan'
	}
	return request(url, {
		method: 'POST',
		body: JSON.stringify({
			param: {
				eid: window.eid,
				condition: {
					orderNumber: parame,
					// updateDate:window.updatetime
				}
			}
		})
	});
}
function planAttach(parame, type) {
	let url = '/McdEpsApi/joywok/maintenance/getYearPlanAttach'
	if (type != 'year') {
		url = '/McdEpsApi/joywok/maintenance/getMonthPlanAttach'
	}
	return request(url, {
		method: 'POST',
		body: JSON.stringify({
			param: {
				eid: window.eid,
				condition: {
					orderNumber: parame,
					updateDate: window.updatetime
				}
			}
		})
	});
}
function planStore(parame, type) {
	let url = '/McdEpsApi/joywok/maintenance/getYearPlanStore'
	if (type != 'year') {
		url = '/McdEpsApi/joywok/maintenance/getMonthPlanStore'
	}
	return request(url, {
		method: 'POST',
		body: JSON.stringify({
			param: {
				eid: window.eid,
				condition: {
					orderNumber: parame
				},
				pager: { 'pageNum': '1', 'pageSize': '10000' }
			}
		})
	});
}
export default {
	namespace: 'maintenance',
	state: {
		loading: {
			loading: true,
			fix: true,
			hide: false
		},
		list: []
	},
	reducers: {
		changeData(state, action) {
			return { ...state, ...action.payload };
		}
	},
	effects: {
		*fetch({ payload, dispatch }, { call, put, select }) {
			let datas = yield select();
			let type = datas['maintenance']['type'];
			let firstData = yield call(firstFetch, payload, type);
			// let planAttachData = yield call(planAttach,payload,type);
			let planStoreData = yield call(planStore, payload, type);
			let loading = datas["maintenance"]['loading'];
			// console.log(firstData['data']['body'],planStoreData["data"]['body'],'firstDatafirstDatafirstDatafirstDatafirstDatafirstData');
			loading['loading'] = false;
			loading['hide'] = true;
			// console.log(firstData['data']['body'],planAttachData['data']['body'],planStoreData["data"]['body']["pageInfo"],'第一次获取的数据');
			let allData = _.extend({
				loading: loading
			}, firstData['data']['body'], {
					list: planStoreData["data"]['body']["pageInfo"]["list"]
				})
			// console.log(allData,'这个里面返回什么数据呢');、
			// getUsers(allData['storeMan'],'num',function(resp){
			//   let userdata = resp['data'][0];
			//   dispatch({
			//     type: 'process/changeData',
			//     payload: {
			//       avatar:userdata['avatar']
			//     },
			//   });
			// })
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
