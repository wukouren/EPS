/**
 * 维修流程－工程 model
 */
function getPartTime(){
  /*let date = new Date();
  let minute = date.getMinutes();
  let hour = date.getHours()+4;
  if(minute>=30){
    hour++
    minute = 0
  }else{
    minute = 30
  }
  console.log('Marlin 1',date.getFullYear(),date.getMonth(),date.getDate(),hour,minute,'时间选择是什么呢')
  // let nowData =  moment({ year :date.getFullYear(), month :date.getMonth(), day :date.getDate(), hour :hour, minute:minute}).format('YYYY-MM-DD');
  let nowData = moment(Date.parse(new Date())).format('YYYY/MM/DD HH:00');
  console.log('Marlin 2',date,nowData,'时间选择是什么呢');
  return nowData*/

  let next_day = moment(Date.parse(new Date())+3600*4*1000).format('YYYY/MM/DD HH:00');
  return Date.parse(new Date(next_day))/1000;
}
export default {
  namespace: 'repairproject',
  state: {
    loading: true,
    filter: {
      pageno: 0,
      order: 'comprehensive_desc'
    },
    record:{
      storeNumber:'',
      repairType:'1',
      dateAppointment:getPartTime(),
      vendorNumber:['-1'],
      engineeringList:[],
			file:[]
    },
    repairstores:[],
    style:{
      
    }
  },
  reducers: {
    changeData(state,action){
      return { ...state, ...action.payload };
    },
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
