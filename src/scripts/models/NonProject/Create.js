/**
 * 非项目流程 model
 */
import * as demoService from '../../services/Demo';

export default {

  namespace: 'nonprojectcreatepo',

  state: {
    loading: true,
    filter: {
      pageno: 0,
      order: 'comprehensive_desc'
    }
  },

  reducers: {
    // 把返回的数据放到state中
    save(state, action) {
      return { ...state, ...action.payload };
    },
    // 合并列表
    savelist(state, action) {
      let payload = action.payload;
      state.list = state.list ? state.list : [];
      if(state.list.length == 0){
        let tmpdata = _.where(state.cachedList,{category: state.filter.category});
        if(tmpdata.length>0){
          state.list = tmpdata[0];
        }
      }
      return { ...state, list: (_.union(state.list, payload.list)), total:payload.total, pageinfo: payload.pageinfo, loading: payload.loading };
    },
    // 过滤条件发生变化
    FILTER_CHANGE(state, action) {
      return { ...state, filter: (_.extend(state.filter,action.payload)) };
    },
    // 设置loding状态
    SET_LOADING(state, action){
      return { ...state, ...action.payload };
    },
  },

  effects: {
    // 礼品列表
    *list({ payload }, { call, put }) {
      let newpayload = _.clone(payload);
      if(newpayload.category && newpayload.category == 'all') newpayload.category = ''; 
      const { data, headers } = yield call(demoService.fetch, newpayload );
      // 解析返回的数据
      yield put({
        type: 'save',
        payload: {
          list: data.JMGoodsList,
          total: data.JMStatus.total_num,
          pageinfo: data.JMStatus,
          loading: false
        },
      });
    },
    // 过滤条件发生变化
    FILTER_CHANGE({ payload }, { call, put }) {
      put({
        type: 'FILTER_CHANGE',
        payload: payload
      })
    },
    // 设置loding状态
    SET_LOADING({ payload }, { call, put }){
      put({
        type: 'SET_LOADING',
        payload: payload
      })
    },
  },

  subscriptions: {
  },

};
