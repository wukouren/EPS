export default {
  namespace: 'processdevice',
  state: {
    loading:true,
    form:{},
    epsDialog:{
      title:'请输入备注',
      buttonIconClass:'icon-check-i',
      buttonVal:'确认',
      fix:true,
      show:false,
    },
    epsTip:{
      show:true
    },
    refuseRemarks:'',
    confirmFlag:'Approve',
    orderMoney:'1000',
    avatar:{
      avatar_l:'https://www.joywok.com/public/images/avatar/l.jpg',
      avatar_s:'https://www.joywok.com/public/images/avatar/s.jpg'
    },
  },
  reducers: {
    changeData(state,action) {
      return { ...state, ...action.data };
    }
  },
  effects: {
  },
  subscriptions: {
  }
};
