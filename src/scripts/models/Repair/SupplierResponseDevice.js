/**
 * 供应商响应 model
 */
 import * as RepairDeviceResponseService from '../../services/SupplierResponseDevice';

export default {
  namespace: 'supplierresponsedevice',
  state: {
    avatar:{
      avatar_l:'https://www.joywok.com/public/images/avatar/l.jpg',
      avatar_s:'https://www.joywok.com/public/images/avatar/s.jpg'
    },
    loading: true,
    list:[],
    loadingMore:false,
    hide:false,
    fix:false,
    noMore:false,
    pageNum:1,
  },
  reducers: {
    changeData(state,action) {
      console.log(action,'action')
      return { ...state, ...action.payload };
    },
    changeDeviceList(state,action){
      let newDeviceList=_.union(state.list,action.payload.list);
      let loading=action.payload.loading;
      let pageNum=action.payload.pageNum;
      return {...state,list:newDeviceList,loading:loading,pageNum:pageNum,noMore:action.payload.noMore,fix:action.payload.fix}
    }
  },
  effects: {
    *loadMoreDevice({ payload }, { call, put }) {
      const  data  = yield call(RepairDeviceResponseService.getEQOrderInfo, payload );
      if(data.data.body.pageInfo&&data.data.body.pageInfo.list&&data.data.body.pageInfo.list.length>0){
          yield put({
          type: 'changeDeviceList',
          payload: {
            loading: false,
            list:data.data.body.pageInfo.list,
            fix:false,
            noMore:data.data.body.pages<payload.param.pager.pageNum?true:false,
            pageNum:payload.param.pager.pageNum,
          },
        });
        }else{
          yield put({
            type: 'changeData',
            payload: {
              loading:false,
              noMore:true,
            },
          })
        } 
    },
  },
  subscriptions: {
  }
};
