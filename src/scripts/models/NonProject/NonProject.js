/**
 * 非项目流程 model
 */
import * as demoService from '../../services/Demo';

export default {

  namespace: 'nonproject',

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
  },

  effects: {
  
  },

  subscriptions: {
  },

};
