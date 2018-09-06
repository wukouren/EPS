import request from './utils/EpsRequest';
import Toast from 'antd-mobile/lib/toast';
import { AlertInfoBase } from './components/Common/EpsModal';
require('antd-mobile/lib/toast/style/index.css');
/**
	* 公共变量定义
 */
export const PAGE_SIZE = 10;

export const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

/**
 * [SEARCH_CONFIG description]
 * @type {
 *  title: '您需要维修什么?',
 * 	placeholder: '搜索设备ID、名称', // 搜索框提示
 * 	action: 'repairdevice/search' // 搜索框发生变化时dispatch的请求action
 * 	checkMode: 'radio', // 选择模式 默认为多选， 值为radio(单选) 或 multiple(多选) ；单选模式 没有footer ；多选模式有footer,有checkbox框
 *  emptyIcon: '', // 页面为空时的提示icon
 * }
 *
 * key代表含义： device(设备) parts(配件) project(工程) it(IT) store(餐厅 门店),不同的类型对应不同的卡片
 */
export const SEARCH_CONFIG = {
  'device': { title: '您需要维修什么?', placeholder: '搜索设备名称或供应商名称', action: 'repairdevice/search', checkMode: 'multiple', emptyIcon: 'icon-search-device-tip', emptyViewTip: '没有找到相关设备', nonChooseTip: '您还没选择任何设备', assistTip: '可同时搜索设备和供应商名称，如:汽水机  康富' },
  'parts': { title: '配件', placeholder: '搜索配件名称、配件编号', action: 'repairdevice/searchparts', checkMode: 'multiple', emptyIcon: '', emptyViewTip: '没有找到相关配件', nonChooseTip: '您还没选择任何配件' },
  'itparts': { title: '配件', placeholder: '搜索配件名称', action: 'repairdevice/itsearchparts', checkMode: 'multiple', emptyIcon: '', emptyViewTip: '没有找到相关IT配件', nonChooseTip: '您还没选择任何配件' },
  'project': { title: '您需要维修什么?', placeholder: '搜索工程名称', action: 'repairdevice/searchproject', checkMode: 'multiple', emptyIcon: 'icon-search-project-tip', emptyViewTip: '没有找到相关工程', nonChooseTip: '您还没选择任何工程' },
  'it': { title: '您需要维修什么?', placeholder: '设备名称、FA Code、型号代码、描述', action: 'repairdevice/searchits', checkMode: 'multiple', emptyIcon: 'icon-search-it-tip', emptyViewTip: '没有找到相关IT设备', nonChooseTip: '您还没选择任何设备' },
  'store': { title: '餐厅', placeholder: '搜索餐厅ID、名称、省市', action: 'repairdevice/searchstore', checkMode: 'radio', emptyIcon: 'icon-search-store-tip', emptyViewTip: '没有找到餐厅', nonChooseTip: '您还没选择任何餐厅' },
  'repairstore': { title: '供应商', placeholder: '搜索供应商名称', action: 'repairdevice/getMaintainerList', checkMode: 'radio', emptyIcon: 'icon-search-store-tip', emptyViewTip: '没有找到供应商', nonChooseTip: '您还没选择任何供应商' },
  'scrapped': { title: '您需要挑选的资产是什么？', placeholder: '搜索资产摘要', action: 'repairdevice/getEqChooseScrapList', checkMode: 'multiple', emptyIcon: 'icon-search-store-tip', emptyViewTip: '没有找到资产', nonChooseTip: '您还没选择任何资产' },
}

// 校验是否是允许的路由类型 只允许 equipment（设备）  project（工程） it（IT）  三种内容的路由，其它的都应跳转404
export const isRightRoter = (type) => {
  let indexnum = _.indexOf(['equipment', 'project', 'it'], type);
  return indexnum == -1 ? false : true;
}

// 主内容字典
export const MAINTYPE_DICTS = { 'equipment': '设备', 'project': '工程', 'it': 'IT' };

// 打开webview
export const openWebView = (data) => {
  var url = window.EpsWebRoot + '/#' + data;
  jw.pushWebView(url);
}

export const orderStatus = {
  repair: {
    1: {
      label: "创建订单",
      val: '已创建待提交'
    },
    2: {
      label: "供应商响应",
      val: '已提交待响应'
    },
    3: {
      label: "供应商评估",
      val: '已响应待评估'
    },
    4: {
      label: "评估确认",
      val: '已评估待确认'
    },
    5: {
      label: "审批",
      val: '已确认待审批'
    },
    6: {
      label: "维修确认",
      val: '已审批待服务'
    },
    7: {
      label: "调整与评估",
      val: '已服务待评价'
    },
    8: {
      label: "维修调整审批",
      val: '已调整待审批'
    },
    98: {
      label: "已取消",
      val: '已取消'
    },
    99: {
      label: "已完成",
      val: '已完成'
    }
  },
  21: {
    1: {
      label: "已创建待提交",
      val: '已创建待提交'
    },
    2: {
      label: "已提交待审批",
      val: '已提交待审批'
    },
    3: {
      label: "经理确认",
      val: '经理确认'
    },
    99: {
      label: "已完成",
      val: '已完成'
    }
  },
  maintenanceBefore: {
    1: {
      label: "已创建待提交",
      val: '预留及确认'
    },
    2: {
      label: "已提交待审批",
      val: '保养计划的DO审批'
    },
    3: {
      label: "经理确认",
      val: '经理确认'
    },
    98: {
      label: "已取消",
      val: '已取消'
    },
    99: {
      label: "已完成",
      val: '已完成'
    }
  },
  maintenanceAfter: {
    1: {
      label: "已提交待响应",
      val: '供应商回复'
    },
    2: {
      label: "已响应待确认",
      val: '设备经理更新'
    },
    3: {
      label: "已确认待服务",
      val: '供应商确认'
    },
    4: {
      label: "已服务待评价",
      val: '餐厅评价'
    },
    98: {
      label: "已取消",
      val: '已取消'
    },
    99: {
      label: "已完成",
      val: '已完成'
    }
  },
  minorputchaseProject: {
    1: { label: "PM创建需求", val: '已创建待提交' },
    2: { label: "需求回复批", val: '已提交待回复' },
    3: { label: "PM需求确认", val: '已回复待确认' },
    4: { label: "DOA审批", val: '已确认待审批' },
    5: { label: "订单确认", val: '已审批待供应商确认' },
    6: { label: 'PM确认', val: '供应商已确认待服务' },
    // 8:{label:"PM确认收货",val:'已调整待审批'},
    98: { label: "已取消", val: '已取消' },
    99: { label: "已完成", val: '已完成' },
  },
  // 新店改造订单状态 于20171024作废
  minorputchaseIt: {
    1: { label: "供应商调整", val: '已审批待供应商确认' },
    2: { label: "TSI确认", val: '供应商已确认待服务' },
    3: { label: "IT Function确认", val: '已确认待IT Function审批' },
    4: { label: "IT Dept Head确认", val: '已确认待IT Dept Head审批' },
    98: { label: "已取消", val: '已取消' },
    99: { label: "已完成", val: '已完成' },
  },
  // 新店改造需求状态 于20171024作废
  minorputchaseIt2: {
    1: { label: "TSI填写需求", val: '已创建待提交' },
    2: { label: "供应商回复", val: '已创建待提交' },
    3: { label: "TSI确认", val: '已提交待回复' },
    4: { label: "IT Function审批", val: '已回复待确认' },
    5: { label: "IT Dept Head审批", val: '已确认待IT Function审批' },
    98: { label: "已取消", val: '已取消' },
    99: { label: "已完成", val: '已完成' },
  },
  newstoregc: {
    1: {
      label: "创建PO",
      val: '已创建待提交'
    },
    2: {
      label: "QS确认工程量清单",
      val: '已提交待回复'
    },
    3: {
      label: "承建商确认QS评估",
      val: '已回复待确认'
    },
    4: {
      label: "QS确认承建商回复",
      val: '已回复待确认'
    },
    5: {
      label: "PM确认",
      val: '已回复待确认'
    },
    6: {
      label: "DOA审批",
      val: '已确认待审批'
    },
    7: {
      label: "更新入场时间",
      val: '已审批待更新'
    },
    8: {
      label: "隐蔽工程验收",
      val: '已更新待隐蔽工程验收'
    },
    9: {
      label: "PM确认工程",
      val: '已工程验收待开业验收'
    },
    10: {
      label: "收货调整DOA审批",
      val: '已开业验收待开业'
    },
    // 11:{
    //   label:"一年后保固验收",
    //   val:'一年后保固验收'
    // },
    12: {
      label: "一年后保固验收",
      val: '已开业待保固验收'
    },
    98: {
      label: "已取消",
      val: '已取消'
    },
    99: {
      label: "已完成",
      val: '已完成'
    },
  },
  nonproject: {
    // 36 IT 采购 34 IT采购需求 33 工程采购 35 工程采购需求
    36: {
      1: {
        label: "创建需求",
        val: '已创建待提交'
      },
      2: {
        label: "选择供应商",
        val: '已提交待选择'
      },
      3: {
        label: "供应商评估",
        val: '已选择待评估'
      },
      4: {
        label: "PM确认",
        val: '已评估待确认'
      },
      5: {
        label: "审批",
        val: '已确认待审批'
      },
      98: {
        label: "已取消",
        val: '已取消'
      },
      99: {
        label: "已完成",
        val: '已完成'
      },
    },
    34: {
      1: {
        label: "已创建待审批",
        val: 'DOA审批'
      },
      2: {
        label: "已审批待服务",
        val: 'PO确认及填写送货信息'
      },
      3: {
        label: "餐厅确认",
        val: '已审批待确认'
      },
      4: {
        label: "IT PM确认",
        val: '餐厅已确认'
      },
      5: {
        label: "IT HEAD确认",
        val: 'IT PM已确认'
      },
      98: {
        label: "已取消",
        val: '已取消'
      },
      99: {
        label: "已完成",
        val: '已完成'
      },
    },
    33: {
      1: {
        label: "DOA审批",
        val: '已创建待审批'
      },
      2: {
        label: "PO确认及填写送货信息",
        val: '已审批待服务'
      },
      3: {
        label: "餐厅确认",
        val: '已服务待确认'
      },
      4: {
        label: "调整后DOA审批",
        val: '已收货待审批'
      },
      98: {
        label: "已取消",
        val: '已取消'
      },
      99: {
        label: "已完成",
        val: '已完成'
      },
    },
    35: {
      1: {
        label: "创建需求",
        val: '已创建待提交'
      },
      2: {
        label: "选择供应商",
        val: '已提交待选择'
      },
      3: {
        label: "供应商评估",
        val: '已选择待评估'
      },
      4: {
        label: "PM 确认",
        val: '已评估待确认'
      },
      5: {
        label: "审批",
        val: '已确认待审批'
      },
      98: {
        label: "已取消",
        val: '已取消'
      },
      99: {
        label: "已完成",
        val: '已完成'
      },
    },
    31: {
      1: {
        label: "创建需求",
        val: '已创建待提交'
      },
      2: {
        label: "选择供应商",
        val: '已提交待选择'
      },
      3: {
        label: "供应商评估",
        val: '已选择待评估'
      },
      4: {
        label: "PM确认",
        val: '已评估待确认'
      },
      5: {
        label: "审批",
        val: '已确认待审批'
      },
      98: {
        label: "已取消",
        val: '已取消'
      },
      99: {
        label: "已完成",
        val: '已完成'
      },
    },
    32: {
      1: {
        label: "DOA审批",
        val: '已创建待审批'
      },
      2: {
        label: "PO确认及填写送货信息",
        val: '已审批待服务'
      },
      3: {
        label: "餐厅确认",
        val: '已服务待签收'
      },
      4: {
        label: "调整后DOA审批",
        val: '已收货待审批'
      },
      98: {
        label: "已取消",
        val: '已取消'
      },
      99: {
        label: "已完成",
        val: '已完成'
      },
    }
  },
  // 项目采购
  project: {
    // 41 项目采购需求  42 项目型供应商采购订单  
    // 43 项目型采购订单  43-1 项目型采购订单－设备  43-2 项目型采购订单－工程  43-3 项目型采购订单－IT
    41: {
      '1': {
        label: "创建项目需求",
        val: "已创建待提交"
      },
      '2': {
        label: "供应商评估", // 创建需求 or 供应商回复 ?
        val: "已提交待评估"
      },
      '3': {
        label: "PM确认",
        val: "已评估待确认"
      },
      '4': {
        label: "DOA审批",
        val: "已确认待审批"
      },
      '98': {
        label: "已取消",
        val: "已取消"
      },
      '99': {
        label: "已完成",
        val: "已完成"
      }
    },
    // 项目型供应商采购订单
    42: {
      '1': {
        label: "",
        val: "已审批待服务"
      },
      '98': {
        label: "已取消",
        val: "已取消"
      },
      '99': {
        label: "已完成",
        val: "已完成"
      }
    },
    // 项目型订单
    43: {
      '1': {
        label: "餐厅确认及评价",
        val: "已服务待确认"
      },
      '2': {
        label: "DOA审批确认",
        val: "已调整待审批"
      },
      '98': {
        label: "已取消",
        val: "已取消"
      },
      '99': {
        label: "已完成",
        val: "已完成"
      }
    },
    // 项目型订单－设备
    '43-1': {
      '1': {
        label: "餐厅确认及评价",
        val: "已服务待确认"
      },
      '2': {
        label: "DOA审批确认",
        val: "已调整待审批"
      },
      '98': {
        label: "已取消",
        val: "已取消"
      },
      '99': {
        label: "已完成",
        val: "已完成"
      }
    },
    // 项目型订单－工程
    '43-2': {
      '1': {
        label: "餐厅确认及评价",
        val: "已服务待确认"
      },
      '2': {
        label: "DOA审批确认",
        val: "已调整待审批"
      },
      '98': {
        label: "已取消",
        val: "已取消"
      },
      '99': {
        label: "已完成",
        val: "已完成"
      }
    },
    // 项目型订单－IT
    '43-3': {
      '1': {
        label: "餐厅确认及评价",
        val: "已服务待确认"
      },
      '2': {
        label: "DOA审批确认",
        val: "已调整待审批"
      },
      '98': {
        label: "已取消",
        val: "已取消"
      },
      '99': {
        label: "已完成",
        val: "已完成"
      }
    }
  },
  // 新店／改造非GC - IT 
  newstoreit: {
    // 53 新店／改造IT采购需求  
    // 55 新店／改造IT采购订单  
    53: {
      '1': {
        label: "创建需求",
        val: "已创建待提交"
      },
      '2': {
        label: "供应商评估",
        val: "已提交待评估"
      },
      '3': {
        label: "PM确认",
        val: "已评估待确认"
      },
      '4': {
        label: "DOA审批",
        val: "已确认待审批"
      },
      '98': {
        label: "已取消",
        val: "已取消"
      },
      '99': {
        label: "已完成",
        val: "已完成"
      }
    },
    55: {
      '1': {
        label: "餐厅确认",
        val: "已服务待确认"
      },
      '2': {
        label: "调整后DOA审批",
        val: "已调整待审批"
      },
      '98': {
        label: "已取消",
        val: "已取消"
      },
      '99': {
        label: "已完成",
        val: "已完成"
      }
    }
  }
}

// 获取公共字典
export const initCommonDict = () => {
  // 注册公共model
  let commonModel = _.find(app._models, { namespace: 'common' });
  if (typeof (commonModel) == 'undefined') {
    let commonModel = require('./models/Common')["default"];
    registerModel(app, commonModel);
  }
  // 获取税率基础数据
  if ($.isEmptyObject(getDict('TaxList')) == true) {
    app._store.dispatch({
      type: "common/getTaxList"
    })
  }
  // 获取设备操作建议
  if ($.isEmptyObject(getDict('EquipmentOperation')) == true) {
    app._store.dispatch({
      type: "common/getEquipmentOperation"
    })
  }
  // 获取配件操作建议
  if ($.isEmptyObject(getDict('FittingOperation')) == true) {
    app._store.dispatch({
      type: "common/getFittingOperation"
    })
  }
  // 餐厅人员
  if (userinfo.storeCode) {
    // 获取餐厅信息
    if ($.isEmptyObject(getDict('PRStoreInfo')) == true) {
      app._store.dispatch({
        type: "common/getPRStoreInfo"
      })
    }
    // 获取采购类型
    if ($.isEmptyObject(getDict('PRTypeInfo')) == true) {
      app._store.dispatch({
        type: "common/getPRTypeInfo"
      })
    }
    // 获取报废单号
    if ($.isEmptyObject(getDict('PRWriteoffInfo')) == true) {
      app._store.dispatch({
        type: "common/getPRWriteoffInfo"
      })
    }
  }

}

// 获取字典
export const getDict = (key) => {
  let store = new Store('Joywok:cache:tabs:' + key);
  var cache = store.find({ id: 'tab:cache' }) || {};
  if (cache['id']) {
    return cache["data"];
  } else {
    return {};
  }
}

/**
 * 获取字典值
 * type：字典类别
 * key：字典key
 * 返回值：字典值
 */
export const getDictVal = (type, key) => {
  let dicts = getDict(type);
  if (dicts.length > 0) {
    let idx = _.findIndex(dicts, { value: key });
    return idx >= 0 ? dicts[idx]['label'] : key;
  } else {
    return key;
  }
}
/**
 * 惰性函数获取判断当前浏览器
 */
window.isAndroid = function () {
  var u = navigator.userAgent;
  var androidFlag = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  isAndroid = () => {
    return androidFlag;
  }
  return isAndroid();
}
/**
 * 名　　称：DataLength 
 * 功   能：计算数据的长度 
 * 入口参数：fData：需要计算的数据 
 * 出口参数：返回fData的长度(Unicode长度为2，非Unicode长度为1) 
 */
export const DataLength = (fData) => {
  var intLength = 0
  for (var i = 0; i < fData.length; i++) {
    if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255))
      intLength = intLength + 2
    else
      intLength = intLength + 1
  }
  return intLength
}
Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  symbol = symbol !== undefined ? symbol : "$";
  thousand = thousand || ",";
  decimal = decimal || ".";
  var number = this,
    negative = number < 0 ? "-" : "",
    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  let data = symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "")
  return data;
};

String.prototype.formatMoney = function (places, symbol, thousand, decimal) {
  var str = this;
  if (_.isNumber(str)) str = 0;
  return Number(str).formatMoney(places, symbol, thousand, decimal);
}

window.turnNan = function (data) {
  if (typeof (data) == 'undefined' || isNaN(data)) {
    return 0
  } else {
    return Number(data);
  }
}

/**
 * 是否在途、历史详情页面
 */
window.isUnfinishedOrHistory = function () {
  return window.location.href.indexOf('/view/') >= 0 ||
    window.location.href.indexOf('/vieworder/') >= 0;
}

export const getUsers = (val, type, callback) => {
  jw.getUsers({
    users: val,
    type: type
  }, {
      success: callback,
      fail: callback
    })
}

export const openChart = (eid, orderNumber, name) => {
  // Toast.loading('Loading...',10000);
  // console.log('xxxx');
  Toast.info('加载中…', 0, function () { }, true);
  console.log('openChart', eid, orderNumber, '这俩是什么呢')
  eid = window.eid;
  request('/McdEpsApi/joywok/common/getSynergyUserList', {
    method: 'POST',
    body: JSON.stringify({
      param: {
        eid: eid,
        condition: {
          orderNumber: orderNumber
        }
      }
    })
  }).then(function (resp) {
    Toast.hide();
    let data = [];
    _.each(resp['data']['body']['list'], function (i) {
      data.push(i['eid'])
    })
    // add self to users
    console.log('openChart', resp['data']['body'], window.eid, data, _.indexOf(data, window.eid))
    _.indexOf(data, window.eid) == -1 && data.push(window.eid);

    name = orderNumber;
    console.log({
      id: orderNumber,
      name: name,
      users: data.join(','),
      type: 'num',
      mobileurl: window.location.origin + '/#/orderHomepage?orderid=' + orderNumber
    }, '打开聊天的数据');
    jw.chartInit({
      id: orderNumber,
      name: name,
      users: data.join(','),
      type: 'num',
      mobileurl: window.location.origin + '/eps/#/orderHomepage?orderid=' + orderNumber
      // mobileurl: window.location.origin + '/#/orderHomepage?orderid=' + orderNumber
    }, {
        success: function (res) {
        }
      })
  })
}


export const openPic = (list) => {
  jw.previewImages({
    current: list[0], // 当前显示图片的http链接
    urls: list // 需要预览的图片http链接列表
  });
}

String.prototype.getFileIcon = function () {
  var filetype = this;
  var iconUrl = '';
  // if( $.inArray(filetype,['jpg','bmp','png','gif'] )>-1){
  // iconUrl=this;
  // iconUrl='photo.gif';
  if ($.inArray(filetype, ['doc', 'docx']) > -1) {
    iconUrl = 'file.png';
  } else if ($.inArray(filetype, ['xls', 'xlsx', '2']) > -1) {
    iconUrl = 'excel.png';
  } else if ($.inArray(filetype, ['ppt', 'pptx', 'pps', 'ppsx']) > -1) {
    iconUrl = 'ppt.png';
  } else if ($.inArray(filetype, ['pdf', '1']) > -1) {
    iconUrl = 'pdf.png';
  } else if ($.inArray(filetype, ['zip']) > -1) {
    iconUrl = 'pdf.png';
  } else if ($.inArray(filetype, ['txt', 'text']) > -1) {
    iconUrl = 'file.png';
  } else {
    iconUrl = 'file.png';
  }
  // console.log(filetype,typeof(filetype),'这个路径是什么ne ');
  return '../images/' + iconUrl;
}

window.replaceNnum = function (str) {
  return $.trim(str).replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/, '$1');
}

window.isEllipsis = function (dom) {
  var checkDom = dom.cloneNode(), parent, flag;
  checkDom.style.width = dom.offsetWidth + 'px';
  checkDom.style.height = dom.offsetHeight + 'px';
  checkDom.style.overflow = 'auto';
  checkDom.style.position = 'absolute';
  checkDom.style.zIndex = -1;
  checkDom.style.opacity = 0;
  checkDom.style.whiteSpace = "nowrap";
  checkDom.innerHTML = dom.innerHTML;

  parent = dom.parentNode;
  parent.appendChild(checkDom);
  flag = checkDom.scrollWidth > checkDom.offsetWidth;
  parent.removeChild(checkDom);
  return flag;
}

window.isEllipsisJQ = function (evt) {
  var checkDom = dom.cloneNode(), parent, flag;
  checkDom.style.width = dom.offsetWidth + 'px';
  checkDom.style.height = dom.offsetHeight + 'px';
  checkDom.style.overflow = 'auto';
  checkDom.style.position = 'absolute';
  checkDom.style.zIndex = -1;
  checkDom.style.opacity = 0;
  checkDom.style.whiteSpace = "nowrap";
  checkDom.innerHTML = dom.innerHTML;

  parent = dom.parentNode;
  parent.appendChild(checkDom);
  flag = checkDom.scrollWidth > checkDom.offsetWidth;
  parent.removeChild(checkDom);
  return flag;
}

// 显示ellipsis的详细内容
window.EpsNameInfo = function (name, evt) {
  let ellipsis = isEllipsisJQ(evt);
  console.log('evt----====:', evt, $(evt.target), name)
}

