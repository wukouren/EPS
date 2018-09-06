/**
 * 维修流程－设备 model
 */
export default {
  namespace: 'editequipment',
  state: {
    loading:{
      loading:true,
      fix:true,
      hide:false
    },
    deviceOperate:'1'
  },
  reducers: {
    // 把返回的数据放到state中
    changeData(state, action) {
      console.log(state,'这个里面的state');
      return { ...state, ...action.payload };
    },
  },
  effects: {
  },
  subscriptions: {
  },
};
