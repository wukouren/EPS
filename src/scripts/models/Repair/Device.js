/**
 * 维修流程－设备 model
 */
import * as RepairDeviceService from '../../services/RepairDevice';


export default {

  namespace: 'repairdevice',

  state: {
    loading: true,
    record:{
      file:[],
      // dateAppointment:Date.parse(new Date())/1000+86400,
      dateAppointment:function(){
        // 格式化成整点
        let next_day = moment(Date.parse(new Date())+3600*4*1000).format('YYYY/MM/DD HH:00');
        return Date.parse(new Date(next_day))/1000;
      }(),
      isRepair: "1",
      rmrk:"",
      equipmentList: []
  }
},

  reducers: {
    // 把返回的数据放到state中
    changeData(state, action) {
      console.log(action.payload,"equipmentList")
      return { ...state, ...action.payload };
    },
    delDeviceItem(state,action){
      let oldList=state.record.equipmentList;
      let newList=_.without(oldList,action.payload.item);
      let record=_.clone(state.record);
      record.equipmentList=newList;
      return {...state,record:record}
    },
    changePic(state,action){
      console.log(action,"changePic")
      return {...state,...action.payload}
    },
    changeDate(state,action){
      console.log(action,"action-date")
      let record=_.clone(state.record);
      record.dateAppointment=action.payload.dateAppointment;
      return {...state,record:record}
    },
    changeRepair(state,action){
      console.log(action,"action-isRepair")
      let record=_.clone(state.record);
      record.isRepair=action.payload.isRepair;
      return {...state,record:record}
    }
  },

  effects: {
    // 礼品列表
    *list({ payload }, { call, put }) {
      // const { data } = yield call(RepairDeviceService.fetch, payload );

      // 解析返回的数据
    //   yield put({
    //     type: 'save',
    //     payload: {
    //       loading: false
    //     },
    //   });
    },
  },

  subscriptions: {
  },

};
