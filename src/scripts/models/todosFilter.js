/**
 * 待办、订单过滤
 */
export default {
  namespace: 'todosFilter',
  state: {
    filter:{
      number:'',
      flowtype:['-1'],
      startDate:null,
      endDate:null,
    }
  },
  reducers: {
    changeData(state,action){
      return { ...state, ...action.payload };
    }
  }
};
