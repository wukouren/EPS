import request from './../../utils/EpsRequest';
function firstFetch(parame, type) {
	let url = '/McdEpsApi/joywok/maintenance/getOrderInfo'
	return request(url, {
		method: 'POST',
		body: JSON.stringify({
			param: {
				eid: window.eid,
				condition: {
					orderNumber: parame,
					updateDate: window.updatetime
				},
				pager: { 'pageNum': '1', 'pageSize': '1' }
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
		files: []
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
			let loading = datas["maintenance"]['loading'];
			loading['loading'] = false;
			loading['hide'] = true;
			console.log(firstData['data']['body'], '第一次获取的数据');
			let allData = _.extend({
				loading: loading
			}, firstData['data']['body'], {
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
