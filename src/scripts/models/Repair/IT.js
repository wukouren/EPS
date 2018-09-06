/**
 * 维修流程－IT model
 */
import * as ITService from '../../services/RepairIt';
import { getDict } from '../../constants';

export default {

  namespace: 'repairit',

  state: {
    loading: true,
    firstEnter: true,
    filter: {
      pageno: 0,
      order: 'comprehensive_desc'
    },
    TSIInfo: {}, // TSI信息
    selectITs: [], // 已选设备列表
    selectITParts: [], // 已选设备配件列表
    orderState: '', // 订单状态，（订单确认时）获取订单信息的时候下发下来的，直接上传就可以
    updateDate: '', // 订单修改时间，（订单确认时）获取订单信息的时候下发下来的，直接上传就可以
    record:{
      orderNumber800: '', // 800维修单号
      maintenanceOtherCostTaxRate: '', // 税率
      supRemarks: '', // 流程备注 
      storeNumber: '', // 餐厅id
      storeName: '', // 餐厅名称
      otherFeesNotax: '0.00', // 其它费用
      otherCostRemark: '', // 其它费用备注 
      equipmentRepairList:[], // IT设备列表
      partRepairList: [], // IT设备配件列表
      file:[] // 上传文件
    },
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
      if(state.list.length == 0){
        let tmpdata = _.where(state.cachedList,{category: state.filter.category});
        if(tmpdata.length>0){
          state.list = tmpdata[0];
        }
      }
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
    changeSelectStore(state, action){
      console.log('changeSelectStore:',state,action)
      // return
    },
  },

  effects: {
    // 礼品列表
    *list({ payload }, { call, put }) {
      let newpayload = _.clone(payload);
      if(newpayload.category && newpayload.category == 'all') newpayload.category = ''; 
      const { data, headers } = yield call(demoService.fetch, newpayload );
      // 解析返回的数据
      yield put({
        type: 'save',
        payload: {
          list: data.JMGoodsList,
          total: data.JMStatus.total_num,
          pageinfo: data.JMStatus,
          loading: false
        },
      });
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
    // 获取TSI信息
    *getTSIInfo({ payload }, { call, put }){
      const {data}=yield call(ITService.getTSIInfo,payload);
      if(data.success){
        yield put({
          type: 'changeData',
          payload: {
            TSIInfo: data.body
          },
        });
      }
    },  
    // TSI确认订单&填写订单维修明细 获取订单信息   http://ssi.mcd.com.cn:8080/McdEpsApi/joywok/repair/getITOrderInfo   
    *getITOrderInfo({ payload }, { call, put, select }){
      const {data}=yield call(ITService.getITOrderInfo,payload);

      let equipmentRepairList = [];
      let partRepairList = [];
      if(data.success){
        let orderInfo = data.body;
        // 税率
        let taxlist = getDict('taxlist');
        // 转换配件信息
        partRepairList = _.map(orderInfo.costList,(item)=>{
          // let ratekey = _.findWhere(taxlist,{value:item.rate})["label"];
          return{
            id: item.partsNumber,
            epsid: item.partsNumber, // 配件的epsid 由deviceNumber(it配件编号)拼成了唯一id, epsid和id都=deviceNumber, 用作页面流转，提交时去掉
            partDeviceEpsid: item.itDeviceNumber + '.' + item.faCategory, // it设备epsid
            partDeviceNumber: item.itDeviceNumber, // it设备编号
            partTypeCode: item.faCategory, // 型号代码
            partsNumber: item.partsNumber, // 配件编号
            partsName: item.partsName, // 配件名称
            accessoriesReferencePrice: item.accessoriesReferencePrice, // 参考价
            maintenanceNum: item.maintenanceNum ? item.maintenanceNum : 1, // 数量
            partOperate: item.operate, // 操作
            partsRate: item.rate, // 税率
            purchasingPriceNotax: item.purchasingPriceNotax, // 实际维修价格
            maintenanceRemarks: item.maintenanceRemarks, // 配件备注
            partIsFa: item.isFa// 是否入固定资产
          }
        });
        // 转换设备信息
        equipmentRepairList = _.map(orderInfo.pageInfo.list,(item)=>{
          // 计算该设备下有几种配件要修改
          let partsnum = _.where(partRepairList,{ partDeviceEpsid: (item.itDeviceNumber + '.' + item.typeNumber) }).length;
          return {
            id: item.itDeviceNumber + '.' + item.typeNumber,
            epsid: item.itDeviceNumber + '.' + item.typeNumber,
            deviceCode: item.itDeviceNumber,
            deviceName: item.itDeviceName,
            typeCode: item.typeNumber,
            categoryCode: item.faCategory,
            subCategoryCode: item.subCategory,
            typeDescription: item.typeCode ? item.typeCode : '', // 设备描述 
            deviceOperate: item.operate ? item.operate :'', // 设备操作建议
            partsnum: partsnum, //修改配件种类数
            maintenanceRemarks: item.mark // 维修描述
          }
        })
        // 转换税率
        // maintenanceOtherCostTaxRate
        // 计算其他费用 "lumpSumPrice" - "totalMaintenanceCost"
        let maintenanceOtherCost = orderInfo.detailList ? (orderInfo.detailList[0] ? (orderInfo.detailList[0].lumpSumPrice-orderInfo.detailList[0].totalMaintenanceCost) : '') : '';


        // console.log()

        console.log(orderInfo.detailList[0],'bbbbbbbbbbbbbbb');

        yield put({
          type: 'changeData',
          payload: {
            loading: false,
            firstEnter: false,
            ITOrderInfo: orderInfo,
            selectITs: equipmentRepairList, // 已选设备列表
            selectITParts: partRepairList, // 已选设备配件列表
            orderState: orderInfo.orderState, // 订单状态，（订单确认时）获取订单信息的时候下发下来的，直接上传就可以
            updateDate: orderInfo.updateDate, // 订单修改时间，（订单确认时）获取订单信息的时候下发下来的，直接上传就可以,
            // storeScrapList:orderInfo['scrapPageInfo']?orderInfo['scrapPageInfo']['list']:[],
            record:{
              orderNumber800: orderInfo.pageInfo.list[0].orderNumber800, // 800维修单号
              maintenanceOtherCostTaxRate: orderInfo.detailList ? (orderInfo.detailList[0] ? orderInfo.detailList[0].otherFeesRates+'' : '') : '', // 税率 
              supRemarks: orderInfo.supRemarks ? orderInfo.supRemarks : '', // 流程备注            
              storeNumber: orderInfo.storeNumber, // 餐厅id
              storeName: orderInfo.storeName, // 餐厅名称
              otherFeesNotax: orderInfo.detailList ? (orderInfo.detailList[0] ? orderInfo.detailList[0].otherFeesNotax : '') : '', // 其它费用
              otherCostRemark: orderInfo.detailList ? (orderInfo.detailList[0] ? orderInfo.detailList[0].otherCostRemark : '') : '', // 其它费用备注 
              equipmentRepairList: equipmentRepairList, // IT设备列表
              partRepairList: [], // IT设备配件列表
              file:[]// 上传文件,
            }
          },
        });
      }
    }
  },

  subscriptions: {
  },

};
