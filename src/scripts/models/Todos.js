import * as TodoService from '../services/Todos';

export default {
  namespace: 'todos',
  state: {
    loading: true,
		firstFetch:true,
		list:[],
		businessType:'10',
    filter:{
      number:'',
      flowtype:['-1'],
      startDate:null,
      endDate:null,
      moneyFrom:'',
      moneyTo:'',
    },
    status:0,
    pageNum:1,
    pageSize:10,
    pages:1,
    hide:false,
    fix:false,
    todoListCnt:{},
    noMore:false,
  },
  reducers: {
    //修改state数据
		changeData(state,action) {
      console.log('reducers todos/changeData', state, action);
			return { ...state, ...action.payload };
		},
  },

  effects: {
    *changeData({payload,dispatch},{call,put,select}){
      // 比较 state.status()/state.businessType/state.filter，决定路由跳转
      // payload.forceflag=1 是否强制刷新
      // 

      if(payload.fetchAction === false ) return;
      let state = yield select(),
          conditions = state.todos,
          oldList = [];
      if(conditions['firstFetch']){
      }
      function _getRouter(){
        if(conditions.status=='1') return TodoService.UnfinishedList;
        else if(conditions.status=='2') return TodoService.HistoryList;
        else return TodoService.TodoList;
      }
      function _combinePayload(){
        let condition = {},
          params = { param:{
            eid:userinfo.employee_id,
            pager: {
              pageNum:conditions.pageNum,
              pageSize:conditions.pageSize
            }
          }};
        if(conditions.businessType!='all'&&conditions.filter.flowtype[0] == '-1') condition['businessType'] = conditions.businessType;
        if(conditions.filter.flowtype[0] != '-1') condition['flowType'] = conditions.filter.flowtype[0];
        if(conditions.filter.number != '') condition['orderNumber'] = conditions.filter.number;
        if(conditions.filter.moneyFrom != '') condition['orderMoneyFrom'] = conditions.filter.moneyFrom;
        if(conditions.filter.moneyTo != '') condition['orderMoneyTo'] = conditions.filter.moneyTo;
        if(!_.isNull(conditions.filter.startDate)) condition['orderDateFrom'] = moment(conditions.filter.startDate);
        if(!_.isNull(conditions.filter.endDate)) condition['orderDateTo'] = moment(conditions.filter.endDate);
        if(!_.isEmpty(condition)) 
          params['param']['condition'] = condition;
        return params;
      }
      // _checkChanged();
      if(conditions.pageNum != 1){
        // 如果不是第一页，则缓存当前列表
        oldList = _.clone(conditions.list);
      }

      const {data}=yield call(_getRouter(),_combinePayload());
      if(data.success){
        let pageinfo = data.body.pageInfo;
        // console.log('Marlin noMore',conditions.pageNum>=pageinfo.pages)
        // 
        // if(state[''])
        // if(state['todos']['firstFetch']){
        //   window.mescrollFunction = new MeScroll("mescroll", { 
        //     down: {
        //      offset:'70',
        //      auto:false,
        //      callback: function(){
        //        dispatch({
        //          type:'todos/changeData',
        //          payload:{
        //            businessType:'all',
        //            pageNum: 1
        //          }
        //        })
        //      }
        //    },
        //   });
        // }

        if(typeof(window.mescrollFunction)!='undefined'){
          window.mescrollFunction.endSuccess();
        }
        yield put({
          type: 'changeData',
          payload: {
            list: _.union(oldList,pageinfo.list),
            loading: false,
            firstFetch:false,
            pages:pageinfo.pages,
            fix:false,
            noMore:conditions.pageNum>=pageinfo.pages,
            fetchAction:false // 是否发起Ajax请求
          },
        });
      }
    }
  },

  subscriptions: {
     setup ({ dispatch ,history}) {
    }
  },

};
