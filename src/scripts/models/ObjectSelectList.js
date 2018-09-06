/**
 * 公共搜索组件
 * 
 * 搜索工程（objectselect/list）
 * 搜索设备（objectselect/searchEquipmentList)
 * 搜索设备配件（objectselect/getFittingList)
 * 搜索IT设备（objectselect/searchITEquipment)
 * 搜索IT设备配件（objectselect/searchITFitting)
 * 搜索餐厅（objectselect/searchStoreList)
 * 
 * 注意： 此组件拼装了一个epsid, 原因是 设备，配件，IT设备，IT设备配件接口中没有返回唯一的id，
 *       德勤给出没返回id的原因： 因为这些是主键是由麦当劳主数据方决定的，所以业务主键里并没有叫id的标识。虽说实际表里有id这个物理主键，但这个不适用于去做匹配
 * 注意： 工程和餐厅因为后期数据交互没影响，所以没有拼装epsid      
 * 所以eps系统根据唯一规则，拼装了epsid
    唯一规则如下：
    1.设备的话，唯一标识就是 "deviceNumber": "设备编号" + "vendorNumber": "供应商编号"  
       epsid = deviceNumber+ '.' + vendorNumber    id = deviceNumber + '.' + vendorNumber
    2.设备配件的话，唯一标识就是 "deviceNumber": "设备编号" +"partNumber": "配件编号"  
       epsid=deviceNumber+'.'+’partNumber’    id=deviceNumber+'.'+’partNumber’
    3.IT设备的话，唯一标识就是 "deviceCode": "it设备id" + "typeCode": "型号代码" 
       epsid=deviceCode+'.'+typeCode    id=deviceCode+'.'+typeCode
    4.IT设备配件的话，唯一标识就是"deviceNumber": "it配件编号"
        epsid=deviceNumber id=deviceNumber
 */
import * as ObjectService from '../services/ObjectSelect';
import request from './../utils/EpsRequest';

function Test(parame) {
  return request('/McdEpsApi/joywok/repair/searchConstructionList', {
    method: 'POST',
    body:JSON.stringify(parame)
  });
}
export default {
  namespace: 'objectselect',
  state: {
		loading: false,
		firstFetch:true,
    inputloadingicon: false, // input框是否显示loading
		noMore:false,
    list: 'firstenter', // 根据list决定是显示添加提示 还是空页面 还是列表; 如果list为'firstenter',那么显示添加添加提示；如果list为[],显示空页面；否则显示list
    selectObjects: [],
    condition:{
      keys:''
    },
    total:0,
    pager:{
      pageNum:1,
      pageSize:'10'
    }
  },

  reducers: {
    changeData(state,action){
      return { ...state, ...action.payload };
    },
    // 把返回的数据放到state中
    save(state, action) {
      return { ...state, ...action.payload };
    },
    // 合并列表
    savelist(state, action) {
      let payload = action.payload;
      state.list = state.list ? state.list : [];
      return { ...state, list: (_.union(state.list, payload.list)), total:payload.total, pageinfo: payload.pageinfo, loading: payload.loading };
    },
    // 过滤条件发生变化
    FILTER_CHANGE(state, action) {
      return { ...state, filter: (_.extend(state.filter,action.payload)) };
    },
    // 设置loding状态
    SET_LOADING(state, action){
      return { ...state, ...action.payload };
    },
    // 更改选中状态
    CHANGE_CHECKED_STATUS(state, action){
      let tmplist = state.list;
      let tmpitem = '';
      let changeItem = '';
      _.each(tmplist, (item,i)=>{
        tmpitem = item;
        if(tmpitem.id == action.payload.id){
          changeItem = item;
          (tmpitem.checked = action.payload.checked)
        }
        tmplist[i] = tmpitem;
      })
      let newSelectObjects = state.selectObjects;
      if(changeItem){
        action.payload.checked==true ? (newSelectObjects = _.union([changeItem],newSelectObjects)) : (newSelectObjects = _.filter(newSelectObjects,(item)=>{ return item.id!=action.payload.id}))
      }
      return { ...state, list: tmplist, selectObjects: newSelectObjects };
    },
  },

  effects: {
    // 获取列表 搜索工程 返回结果中也没有id, 但 后期数据交互没影响，所以没有拼装epsid  
    *list({ payload }, { call, put ,select}) {
      yield put({
        type: 'changeData',
        payload: _.extend({
          loading: true
        },payload),
      });
      let reset = true
      if(payload['pager'] && payload['pager']['pageNum']>1){
        reset = false
      }

      let datas = yield select();
      let param = _.extend({},{
        condition:datas["objectselect"]['condition'],
        pager:datas["objectselect"]['pager']
      })
      const { data, headers } = yield call(Test,{
        param:param
      });
      let selectObjectIDs = _.pluck(datas.objectselect.selectObjects,'id');
      let lists = _.map(data.body["deviceList"]["list"],(item)=>{
        return _.extend(item,{checked:(_.indexOf(selectObjectIDs,item.id)==-1?false:true)})
      })
      // console.log((reset?lists:datas["objectselect"]['list'].concat(lists)),data.body["deviceList"],lists,'这个里面获取到了什么数据呢');
      yield put({
        type: 'save',
        payload: _.extend({
          list: (reset?lists:(typeof(datas["objectselect"]['list'])=='string'?lists:datas["objectselect"]['list'].concat(lists))),
          loading: false,
          total:data.body["deviceList"]['total'],
        },param),
      });
    },
    // 搜索餐厅  返回结果中也没有id, 但 后期数据交互没影响，所以没有拼装epsid  
    *searchStoreList({ payload }, { call, put, select }){
      // loading
      yield put({
        type: 'changeData',
        payload: _.extend({
          loading: true
        },payload),
      });
      // 请求数据
      const { data } = yield call(ObjectService.searchStoreList,payload);
      if(data.success){
        let reset = true
        let datas = yield select();
        if(payload['pager']['pageNum']>1){
          reset = false
        }
        yield put({
          type: 'changeData',
          payload: {
            list: (reset?data.body["pageInfo"]["list"]:datas["objectselect"]['list'].concat(data.body["pageInfo"]["list"])),
            loading: false,
            total:data.body["pageInfo"]['total'],
            pager: {
              pageNum: data.body["pageInfo"]["pageNum"] ? data.body["pageInfo"]["pageNum"] : 1,
              pages: data.body["pageInfo"]["pages"] ? data.body["pageInfo"]["pages"] : 1,
            }
          }
        });
      }
    },
    // 搜索设备  返回的列表中无id字段，由 "deviceNumber": "设备编号" + '.' + "vendorNumber": "供应商编号" 作唯一标识， epsid和id都="deviceNumber": "设备编号" + '.' + "vendorNumber": "供应商编号", 用作页面流转，提交时去掉
    *searchEquipmentList({ payload }, { call, put, select }){
      // loading
      yield put({
        type: 'changeData',
        payload: _.extend({
          loading: true
        },payload),
      });
      // 请求数据
      const { data } = yield call(ObjectService.searchEquipmentList,payload);
      if(data.success){
        let reset = true
        let datas = yield select();
        // console.log('searchEquipmentList:',datas.objectselect.selectObjects)
        if(payload['pager']['pageNum']>1){
          reset = false
        }
        let selectObjectIDs = _.pluck(datas.objectselect.selectObjects,'id');
        let id;
        let lists = _.map(data.body["pageInfo"]["list"],(item)=>{
          id = item['deviceNumber']+'.'+item['vendorNumber'];
          // "deviceNumber": "设备编号" + '.' + "vendorNumber": "供应商编号" 是设备的唯一标识
          return _.extend(item,{id: id,epsid: item['deviceNumber']+'.'+item['vendorNumber'],checked:(_.indexOf(selectObjectIDs,id)==-1?false:true)})
        })
        yield put({
          type: 'changeData',
          payload: {
            list: (reset?lists:datas["objectselect"]['list'].concat(lists)),
            loading: false,
            total:data.body["pageInfo"]['total'],
            pager: {
              pageNum: data.body["pageInfo"]["pageNum"] ? data.body["pageInfo"]["pageNum"] : 1,
              pages: data.body["pageInfo"]["pages"] ? data.body["pageInfo"]["pages"] : 1,
            }
          }
        });
      }
    },
     // 搜索设备配件 返回的列表中无id字段，由deviceNumber(设备编号) + partNumber(配件编号)拼成了唯一id, epsid和id都=(deviceNumber+'.'+partNumber),用作页面流转，提交时去掉
    *getFittingList({ payload }, { call, put, select }){
      // loading
      yield put({
        type: 'changeData',
        payload: _.extend({
          loading: true
        },payload),
      });
      // 请求数据
      const { data } = yield call(ObjectService.getFittingList,payload);
      if(data.success){
        let reset = true
        let datas = yield select();
        if(payload['pager']['pageNum']>1){
          reset = false
        }
        let selectObjectIDs = _.pluck(datas.objectselect.selectObjects,'id');
        let id;
        let lists = _.map(data.body["pageInfo"]["list"],(item)=>{
          id = item['deviceNumber']+'.'+item['partNumber'];
          // 设备配件的话，唯一标识就是 "deviceNumber": "设备编号" +"partNumber": "配件编号"  
          return _.extend(item,{id: id, epsid: item['deviceNumber']+'.'+item['partNumber'],checked:(_.indexOf(selectObjectIDs,id)==-1?false:true)})  
        })
        yield put({
          type: 'changeData',
          payload: {
            list: (reset?lists:datas["objectselect"]['list'].concat(lists)),
            loading: false,
            total:data.body["pageInfo"]['total'],
            pager: {
              pageNum: data.body["pageInfo"]["pageNum"] ? data.body["pageInfo"]["pageNum"] : 1,
              pages: data.body["pageInfo"]["pages"] ? data.body["pageInfo"]["pages"] : 1,
            }
          }
        });
      }
    },
    // 搜索IT设备 返回的列表中无id字段，由deviceCode(it设备id) + typeCode(型号代码)拼成了唯一id, epsid和id都＝deviceCode+'.'+typeCode, 用作页面流转，提交时去掉
    *searchITEquipment({ payload }, { call, put, select }){
      // loading
      yield put({
        type: 'changeData',
        payload: _.extend({
          loading: true
        },payload)
      });
      // 请求数据
      const { data } = yield call(ObjectService.searchITEquipment,payload);
      if(data.success){
        let reset = true
        let datas = yield select();
        if(payload['pager']['pageNum']>1){
          reset = false
        }
        let selectObjectIDs = _.pluck(datas.objectselect.selectObjects,'id');
        let id;
        let lists = _.map(data.body["pageInfo"]["list"],(item)=>{
          id = item['deviceCode']+'.'+item['typeCode'];
          // IT设备的话，唯一标识就是 "deviceCode": "it设备id" + "typeCode": "型号代码"  
          return _.extend(item,{id: id,epsid: item['deviceCode']+'.'+item['typeCode'],checked:(_.indexOf(selectObjectIDs,id)==-1?false:true)})
        })
        yield put({
          type: 'changeData',
          payload: {
            list: (reset?lists:datas["objectselect"]['list'].concat(lists)),
            loading: false,
            total:data.body["pageInfo"]['total'],
            pager: {
              pageNum: data.body["pageInfo"]["pageNum"] ? data.body["pageInfo"]["pageNum"] : 1,
              pages: data.body["pageInfo"]["pages"] ? data.body["pageInfo"]["pages"] : 1,
            }
          }
        });
      }
    },
    // 搜索IT设备配件 返回的列表中无id字段，由deviceNumber(it配件编号)拼成了唯一id, epsid和id都=deviceNumber, 用作页面流转，提交时去掉
    *searchITFitting({ payload }, { call, put, select }){
      // loading
      yield put({
        type: 'changeData',
        payload: _.extend({
          loading: true
        },payload),
      });
      // 请求数据
      const { data } = yield call(ObjectService.searchITFitting,payload);
      if(data.success){
        let reset = true
        let lists = [];
        let datas = yield select();
        if(payload['pager']['pageNum']>1){
          reset = false
        }
        if(data.body["pageInfo"] && data.body["pageInfo"]["list"].length>0){
          let selectObjectIDs = _.pluck(datas.objectselect.selectObjects,'id');
          let id;
          lists = _.map(data.body["pageInfo"]["list"],(item)=>{
            id = item['deviceNumber'];
            return _.extend(item,{id: item['deviceNumber'], epsid: item['deviceNumber'],checked:(_.indexOf(selectObjectIDs,id)==-1?false:true)})
          })
        }
        yield put({
          type: 'changeData',
          payload: {
            list: (reset?lists:datas["objectselect"]['list'].concat(lists)),
            loading: false,
            total:data.body["pageInfo"]['total'],
            pager: {
              pageNum: data.body["pageInfo"]["pageNum"] ? data.body["pageInfo"]["pageNum"] : 1,
              pages: data.body["pageInfo"]["pages"] ? data.body["pageInfo"]["pages"] : 1,
            }
          }
        });
      }
    },
    // 搜索供应商  返回结果中也没有id, 但 后期数据交互没影响，所以没有拼装epsid  
    *searchMaintainerList({ payload }, { call, put, select }){
      // loading
      yield put({
        type: 'changeData',
        payload: _.extend({
          loading: true
        },payload),
      });
      // 请求数据
      const { data } = yield call(ObjectService.searchMaintainerList,payload);
      if(data.success){
        let lists = [];
        let reset = true
        let datas = yield select();
        if(payload['pager']['pageNum']>1){
          reset = false
        }
        if(data.body["pageInfo"] && data.body["pageInfo"]["list"].length>0){
          let id;
          let selectObjectIDs = _.pluck(datas.objectselect.selectObjects,'id');
          lists = _.map(data.body["pageInfo"]["list"],(item)=>{
            id = item['vendorNumber'];
            return _.extend(item,{id: item['vendorNumber'], epsid: item['vendorNumber'],checked:(_.indexOf(selectObjectIDs,id)==-1?false:true)})
          })
        }
        yield put({
          type: 'changeData',
          payload: {
            list: (reset?lists:datas["objectselect"]['list'].concat(lists)),
            loading: false,
            total:data.body["pageInfo"]['total'],
            pager: {
              pageNum: data.body["pageInfo"]["pageNum"] ? data.body["pageInfo"]["pageNum"] : 1,
              pages: data.body["pageInfo"]["pages"] ? data.body["pageInfo"]["pages"] : 1,
            }
          }
        });
      }
    },
    *searchScrappedList({ payload }, { call, put, select }) {
      // loading
      yield put({
        type: 'changeData',
        payload: _.extend({
          loading: true
        }, payload),
      });
      // 请求数据
      const { data } = yield call(ObjectService.searchScrappedList, payload);
      if (data.success) {
        let lists = [];
        let reset = true
        let datas = yield select();
        if (payload['pager']['pageNum'] > 1) {
          reset = false
        }
        console.warn('开始设置拉倒的值');
        let selectObjectIDs = _.pluck(datas.objectselect.selectObjects, 'assetNumber');
        // selectObjectIDs = _.map(datas.objectselect.selectObjects,function(i){
        //   return (i['deviceName']+'.'+i['deviceNumber']+'.'+i['assetDesc'])
        // });
        // if (data.body["pageInfo"] && data.body["pageInfo"]["list"].length > 0) {
        //   let id;
          
        //   // lists = _.map(data.body["pageInfo"]["list"], (item) => {
        //   //   id = item['vendorNumber'];
        //   //   return _.extend(item, { id: item['vendorNumber'], epsid: item['vendorNumber'], checked: (_.indexOf(selectObjectIDs, id) == -1 ? false : true) })
        //   // })
        // }
        lists = data.body["pageInfo"]["list"];
        // let hahaha = yield select();
        // console.log(JSON.stringify(hahaha["objectselect"]),'这里走了几次呢');
        // console.log(datas,'123123123123');

        lists = _.map(lists,(item)=>{
          let assetNumber = item['assetNumber']
          // let epsid = item['deviceName']+'.'+item['deviceNumber']+'.'+item['assetDesc'];
          // "deviceNumber": "设备编号" + '.' + "vendorNumber": "供应商编号" 是设备的唯一标识
          return _.extend(item,{checked:(_.indexOf(selectObjectIDs,assetNumber)==-1?false:true)})
        })
        /*
          id = item['deviceName']+'.'+item['deviceNumber'];
          // IT设备的话，唯一标识就是 "deviceCode": "it设备id" + "typeCode": "型号代码"  
          return _.extend(item,{id: id,epsid: item['deviceCode']+'.'+item['typeCode'],checked:(_.indexOf(selectObjectIDs,id)==-1?false:true)})
         */
        if(reset){
        }else{
          lists = (datas["objectselect"]['list'].length!=0?datas["objectselect"]['list'].concat(lists):lists)
        }
        // console.log(lists,'这个里面有多少',selectObjectIDs);
        yield put({
          type: 'changeData',
          payload: {
            loading: false,
            list:lists,
            // list:[],
            total: data.body["pageInfo"]['total'],
            pager: {
              pageNum: (data.body["pageInfo"]["pageNum"] ? data.body["pageInfo"]["pageNum"] : 1),
              pages: (data.body["pageInfo"]["pages"] ? data.body["pageInfo"]["pages"] : 1),
            }
          }
        });
      }
    },
    // 过滤条件发生变化
    FILTER_CHANGE({ payload }, { call, put }) {
      put({
        type: 'FILTER_CHANGE',
        payload: payload
      })
    },
    // 设置loding状态
    SET_LOADING({ payload }, { call, put }){
      put({
        type: 'SET_LOADING',
        payload: payload
      })
    },
    // 更改选中状态
    CHANGE_CHECKED_STATUS({ payload }, { call, put }){
      put({
        type: 'CHANGE_CHECKED_STATUS',
        payload: payload
      })
    },

    
  },

  subscriptions: {
  },

};
