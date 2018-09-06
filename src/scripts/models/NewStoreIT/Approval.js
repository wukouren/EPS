/*
 * 1. 审批（含设备／工程／IT）(审批节点含： DOA审批，送货调整DOA审批)   model
 * 路由：/newstoreit/approval/:objecttype/orderid?type=1
 * 2. 餐厅确认评价 (含设备／工程／IT) 
 * 路由：/newstoreit/approval/:objecttype/orderid?type=4
 * 3. 设备明细&工程明细&IT设备明细 list
 * 路由：/newstoreit/info-list/:objecttype/orderid?_k=30nald
 * 
 * objecttype可以为 equipment project it   
 */
import * as ApprovalService from '../../services/NewStoreIT';
import request from './../../utils/EpsRequest';
import { getUsers } from '../../constants';

export default {
  namespace: 'approval',
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
      // console.log('approval changeData:=========',action,action.payload)
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 这个接口只用于项目明细页面了，DOA调整审批和餐厅确认评价页面中直接用了request请求该接口
    // 获取餐厅确认&评价信息&设备明细&工程明细&IT设备明细list
    *getStoreInfo({ payload }, { call, put, select }) {
      // loading
      yield put({
        type: 'changeData',
        payload: _.extend({
          loading: true
        }, payload),
      });
      // 请求数据
      const { data } = yield call(ApprovalService.getStoreInfo, payload);
      if (data.success) {
        let reset = true
        let datas = yield select();
        if (payload['pager']['pageNum'] > 1) {
          reset = false
        }
        let newlist = (reset ? data.body["pageInfo"]["list"] : datas["approval"]['list'].concat(data.body["pageInfo"]["list"]));
        yield put({
          type: 'changeData',
          payload: {
            list: newlist,
            loading: false,
            noMore: (data.body["pageInfo"]["pageNum"] * payload['pager']['pageSize'] >= data.body["pageInfo"]['total']) ? false : true,
            total: data.body["pageInfo"] ? data.body["pageInfo"]['total'] : newlist.length,
            originaldata: data.body,
            pager: {
              pageNum: data.body["pageInfo"]["pageNum"] ? data.body["pageInfo"]["pageNum"] : 1,
              pages: data.body["pageInfo"]["pages"] ? data.body["pageInfo"]["pages"] : 1,
            }
          }
        });
      }
    },
  },
  subscriptions: {
  }
};


