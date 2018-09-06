/**
 * 维修流程－编辑IT设备信息 model
 */
export default {
  namespace: 'editequipmentit',
  state: {
    loading:{
      loading:true,
      fix:true,
      hide:false
    },
    ITEquipment:{}
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
