 import * as DeviceInfoService from '../../services/DeviceInfo';


export default {
	namespace: 'deviceinfo',
	state: {
		loading:{
			loading:true,
			fix:true,
			hide:false
		},
		noMore:false,
		fix:false,
		pageNum:1,
    size:10,
	},
	reducers: {
		changeData(state,action) {
			return { ...state, ...action.payload };
		},
		changeDeviceList(state,action){
			console.log(action.payload,"action")
      let newDeviceList=_.union(state.list,action.payload.list);
      let loading=action.payload.loading;
      let pageNum=action.payload.pageNum;
      return {...state,list:newDeviceList,fix:action.payload.fix,loading:loading,pageNum:pageNum,noMore:action.payload.noMore,pages:action.payload.pages}
    }
	},
	effects: {
		*loadMoreDevice({ payload ,pages}, { call, put }) {
      console.log(payload.param,pages,"2222")
     if(pages<payload.param.pager.pageNum){
        console.log('没有更多数据了')
          yield put({
            type: 'changeData',
            payload: {
              loading:false,
              noMore:true,
            },
          })
     }else{
        const  data  = yield call(DeviceInfoService.getEquipmentList, payload );
        console.log(data,payload,"loadMoreDevice")
        if(data.data.body.pageInfo&&data.data.body.pageInfo.detailList&&data.data.body.pageInfo.detailList.length>0){
            yield put({
            type: 'changeDeviceList',
            payload: {
              loading: false,
              list:data.data.body.pageInfo.detailList,
              fix:false,
              pages:data.data.body.pages,
              noreMore:data.data.body.pages<payload.param.pager.pageNum?true:false,
              pageNum:payload.param.pager.pageNum,
            },
          });
          }else{
            
          } 
       } 
    },
	},
	subscriptions: {
	}
};
