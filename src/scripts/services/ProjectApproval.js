// 项目型采购接口
import request from '../utils/EpsRequest';
import { PAGE_SIZE } from '../constants';

// 获取餐厅评价信息 && DOA审批信息
// {
 //    "eid": "用户id",
 //    "condition":{
 //          "keys":"关键字",
 //          "vendorNumber":"供应商id"
 //     },
 //     "pager": {
 //        "pageNum": "当前页",
 //        "pageSize": "每页条数"
 //     }
	// }
export function getStoreInfo(params) {
	console.log('getStoreInfo  eid:====',eid);
	
  return request(`/McdEpsApi/joywok/project/getStoreInfo`, {
    method: 'POST',
    body: JSON.stringify({
  		param:_.extend({
  			eid:eid	
  		},params)
	  }),
  });
}

// 获取供应商BY餐厅列表
// {
//   "eid": "E5001179",
//   "condition: {
//     "orderNumber": "PP171674",
//     "vendorNumber": "451",
//     "vendorType": "1"
//   },
//   "pager": {
//     "pageNum": 1,
//     "pageSize": 200
//   }
// }
export function getStoreListByVendor(params) {
  console.log('getStoreListByVendor  eid:====',eid);
  
  return request(`/McdEpsApi/joywok/project/getStoreListByVendor`, {
    method: 'POST',
    body: JSON.stringify({
      param:_.extend({
        eid:eid 
      },params)
    }),
  });
}

// 获取餐厅BY设备列表
// {
//   "eid": "E5001179",
//   "condition: {
//     "orderNumber": "PP171674",
//     "vendorNumber": "451",
//     "storeNumber": "451",
//     "vendorType": "1"
//   },
//   "pager": {
//     "pageNum": 1,
//     "pageSize": 200
//   }
// }
export function getDeviceListByStore(params) {
  console.log('getDeviceListByStore  eid:====',eid);
  
  return request(`/McdEpsApi/joywok/project/getDeviceListByStore`, {
    method: 'POST',
    body: JSON.stringify({
      param:_.extend({
        eid:eid 
      },params)
    }),
  });
}

