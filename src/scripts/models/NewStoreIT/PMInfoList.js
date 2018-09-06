/*
 * 需求阶段的采购明细(含设备，工程，IT)列表（Local PM拒绝，DOA审批）的model
 */
import * as ApprovalService from '../../services/NewStoreIT';
import request from './../../utils/EpsRequest';

export default {
	namespace: 'pminfolist',
	state: {
		loading:{
			loading:true,
			fix:true,
			hide:false
		},
    list:'firstenter',
		pageNum:1,
    size:10,
    total: 0,
    noMore:false,
    originaldata:{} // 原始数据
	},
	reducers: {
		changeData(state,action) {
			// console.log('pminfolist changeData:=========',action,action.payload)
			return { ...state, ...action.payload };
		},
	},
	effects: {
    // 获取餐厅BY设备列表
    *getDeviceListByStore({ payload }, { call, put, select }){
      // loading
      yield put({
        type: 'changeData',
        payload: _.extend({
          loading: true
        },payload),
      });
      // 请求数据
      const { data } = yield call(ApprovalService.getDeviceListByStore,payload);
      if(data.success){
        let reset = true
        let datas = yield select();
        if(payload['pager']['pageNum']>1){
          reset = false
        }
        let newlist = (reset?data.body["pageinfo"]["list"]:datas["pminfolist"]['list'].concat(data.body["pageinfo"]["list"]));
        yield put({
          type: 'changeData',
          payload: {
            list: newlist,
            loading: false,
            noMore: (data.body["pageinfo"]["pageNum"]*payload['pager']['pageSize']>=data.body["pageinfo"]['total']) ? false : true, 
            total:data.body["pageinfo"] ? data.body["pageinfo"]['total'] : newlist.length,
            originaldata: data.body,
            vendorRole:data.body["vendorRole"] ? data.body["vendorRole"] : '',
            isTsi:data.body["isTsi"] ? data.body["isTsi"] : '',
            pager: {
              pageNum: data.body["pageinfo"]["pageNum"] ? data.body["pageinfo"]["pageNum"] : 1,
              pages: data.body["pageinfo"]["pages"] ? data.body["pageinfo"]["pages"] : 1,
            }
          }
        });
      }
    },
	},
	subscriptions: {
	}
};


