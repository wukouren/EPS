/*
 * 需求阶段的餐厅列表（Local PM拒绝，DOA审批）的model
 */
import * as ApprovalService from '../../services/NewStoreIT';
import request from './../../utils/EpsRequest';

export default {
  namespace: 'pmstorelist',
  state: {
    loading: {
      loading: true,
      fix: true,
      hide: false
    },
    list: 'firstenter',
    pageNum: 1,
    size: 10,
    total: 0,
    noMore: false,
    originaldata: {} // 原始数据
  },
  reducers: {
    changeData(state, action) {
      // console.log('pmstorelist changeData:=========',action,action.payload)
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 获取供应商BY餐厅列表
    *getStoreListByVendor({ payload }, { call, put, select }) {
      // loading
      yield put({
        type: 'changeData',
        payload: _.extend({
          loading: true
        }, payload),
      });
      // 请求数据
      const { data } = yield call(ApprovalService.getStoreListByVendor, payload);
      console.log('gatData', data);
      if (data.success) {
        let reset = true
        let datas = yield select();
        if (payload['pager']['pageNum'] > 1) {
          reset = false
        }
        let newlist = (reset ? data.body["pageinfo"]["list"] : datas["pmstorelist"]['list'].concat(data.body["pageinfo"]["list"]));
        yield put({
          type: 'changeData',
          payload: {
            list: newlist,
            loading: false,
            noMore: (data.body["pageinfo"]["pageNum"] * payload['pager']['pageSize'] >= data.body["pageinfo"]['total']) ? false : true,
            total: data.body["pageinfo"] ? data.body["pageinfo"]['total'] : newlist.length,
            originaldata: data.body,
            pager: {
              pageNum: data.body["pageinfo"]["pageNum"] ? data.body["pageinfo"]["pageNum"] : 1,
              pages: data.body["pageinfo"]["pages"] ? data.body["pageinfo"]["pages"] : 1,
            },
            isTsi: data.body["isTsi"]
          }
        });
      }
    },
  },
  subscriptions: {
  }
};


