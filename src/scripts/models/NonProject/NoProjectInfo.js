export default {
  namespace: 'noprojectinfo',
  state: {
    loading:true,
    noMore:false,
    hide:false,
    fix:false,
    epsTip:{
      show:true
    }
  },
  reducers: {
    changeData(state,action) {
      console.log('changeData:',action)
      return { ...state, ...action.data };
    }
  },
  effects: {
    
  },
  subscriptions: {
  }
};
