import * as UserService from '../services/indexpage';

export default {

  namespace: 'indexpage',

  state: {
    loading: true,
    userInfo:window.userinfo,
    todosMenu:[],
    listCnt:{},
  },

  reducers: {
    // 把返回的数据放到state中
    changeData(state, action) {
      return { ...state, ...action.payload };
    },
    
  },

  effects: {
    // 用户角色
    *getMenu({ payload }, { call, put }) {
      let param=payload.param;
      // const userData = yield call(UserService.getUser, payload );
      const menuList= yield call(UserService.getMenu, param );
      let CollectionMenu=[];

      //合并菜单角色
      _.map(menuList.data.role,function(item){
          CollectionMenu=_.union(CollectionMenu,item.menu)
      });
      let newCollectionMenu=[];

      //角色去重
      _.each(CollectionMenu,function(item){
       let isExist=  _.find(newCollectionMenu,function(i){
           return i.menu_url==item.menu_url;
         })
       if(isExist){
         
       }else{
         if(item.menu_ename=='EPS Mobile'){
          
         }else{
           newCollectionMenu.push(item)

         }
       }
      })

      //newCollectionMenu为 去重后的菜单合集

      // 待办menuTodoList;
       let menuTodoList=[];
       let menuNoProjectList=[];
       let menuRepairList=[];

       let txtTodos={'10':'维修','20':'保养','30':'非项目','40':'项目','50':'新店/改造非GC','60':'新店/改造GC'} ;

       _.each(newCollectionMenu,function(item){
          if(item.menu_url.indexOf('todos')>0){
            item.type=item.menu_url.substring(14,16);
            item.val=txtTodos[item.type];
            item.key=txtTodos[item.type];
            menuTodoList.push(item)
          }
       })
       //  创建 createRepairList;
       _.each(newCollectionMenu,function(item){
          if(item.menu_url.indexOf('repairing/createpo')>0){
            switch(item.menu_url.substring(22)){
                case 'equipment':
                item.type='11';
                break;
                case 'project':
                item.type='12';
                break;
                case 'it':
                item.type='13';
                break;
            }
            menuRepairList.push(item)
          }
       })
       //noProjectList
       _.each(newCollectionMenu,function(item){
          if(item.menu_url.indexOf('nonproject/createpo')>0){
            switch(item.menu_url.substring(23)){
                case 'equipment':
                item.type='31';
                break;
                case 'project':
                item.type='32';
                break;
                case 'it':
                item.type='33';
                break;
            }
            menuNoProjectList.push(item)
          }
       })
       let sortMenuTodo=_.sortBy(menuTodoList,'type');
       let sortMenuRepair=_.sortBy(menuRepairList,'type');
       let sortMenuNoProject=_.sortBy(menuNoProjectList,'type')
      const data = yield call(UserService.getToDoListCount, {param:{eid:param.eid}} );
      let Cnt={};
      Cnt['10']=data.data.body.todoListCnt['repairCnt'];
      Cnt['20']=data.data.body.todoListCnt['maintenanceCnt'];
      Cnt['30']=data.data.body.todoListCnt['nonProjectCnt'];
      Cnt['40']=data.data.body.todoListCnt['projectCnt'];
      Cnt['50']=data.data.body.todoListCnt['newStoreCnt'];
      Cnt['60']=data.data.body.todoListCnt['newStoreGcCnt'];

      window.upTabsData('todosMenu','cache',sortMenuTodo)

     if(sortMenuTodo&&data.data.body.todoListCnt){
         yield put({
          type: 'changeData',
          payload: {
            todosMenu:sortMenuTodo,
            repairMenu:sortMenuRepair,
            noProjectMenu:sortMenuNoProject,
            listCnt:Cnt,
            loading:false,
          },
        });
     }
      // 解析返回的数据
     
    },
  },

  subscriptions: {
   
  },

};
