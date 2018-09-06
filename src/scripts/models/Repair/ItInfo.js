export default {
	namespace: 'itinfo',
	state: {
		loading:{
			loading:true,
			fix:true,
			hide:false
		},
		pageNum:1,
    size:10,
    noMore:false,
	},
	reducers: {
		changeData(state,action) {
			console.log(action,"33")
			return { ...state, ...action.payload };
		}
	},
	effects: {
		//上拉加载更多
		*loadMoreDevice({ payload ,pages}, { call, put }) {
			console.log("payload:",payload,'pages:',pages)
      if(pages<payload.param.pager.pageNum){
          yield put({
            type: 'changeData',
            payload: {
              loading:false,
              noMore:true,
            },
          })
     }else{
        const  data  = yield call(DeviceInfoService.getITOrderList, payload );
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
