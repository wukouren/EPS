// 对象搜索接口 设备，工程，配件，餐厅，IT设备,IT设备配件
import request from '../utils/EpsRequest';
import { PAGE_SIZE } from '../constants';

// 获取餐厅列表
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
export function searchStoreList(params) {
	console.log('searchStoreList  eid:====',eid);
	
  return request(`/McdEpsApi/joywok/repair/searchStoreList`, {
    method: 'POST',
    body: JSON.stringify({
  		param:_.extend({
  			eid:eid	
  		},params)
	  }),
  });
}


// 获取IT设备列表
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
export function searchITEquipment(params) {
  console.log('searchITEquipment  eid:====',eid);
  
  return request(`/McdEpsApi/joywok/repair/searchITEquipment`, {
    method: 'POST',
    body: JSON.stringify({
      param:_.extend({
        eid:eid 
      },params)
    }),
  });
}

// 获取IT设备配件列表
// {
//     ""eid"": ""用户id"",
//     ""condition"": {
//          ""keys"": ""关键字"",
//          ""typeCode"":""型号代码""
//     },
//     ""pager"": {
//         ""pageNum"": ""当前页"",
//         ""pageSize"": ""每页条数""
//     }
// }
export function searchITFitting(params) {
  console.log('searchITFitting  eid:====',eid);
  
  return request(`/McdEpsApi/joywok/repair/searchITFitting`, {
    method: 'POST',
    body: JSON.stringify({
      param:_.extend({
        eid:eid 
      },params)
    }),
  });
}

// 获取设备配件列表
// "{
//     ""eid"": ""用户id"",
//     ""condition"": {
//         ""deviceNumber"": ""设备名称"",
//         ""partName"":""封条"",
//         ""vendorNumber"":""维修商编号""
//     },
//     ""pager"": {
//         ""pageNum"": ""当前页"",
//         ""pageSize"": ""每页条数""
//     }
// }"
export function getFittingList(params) {
  console.log('getFittingList  eid:====',eid);
  
  return request(`/McdEpsApi/joywok/repair/getFittingList`, {
    method: 'POST',
    body: JSON.stringify({
      param:_.extend({
        eid:eid 
      },params)
    }),
  });
}

// 获取设备列表
// "{
//     ""eid"": ""用户id"",
//     ""condition"": {
//         ""deviceName"": ""设备名称""
//     },
//     ""pager"": {
//         ""pageNum"": ""当前页"",
//         ""pageSize"": ""每页条数""
//     }
// }"
export function searchEquipmentList(params) {
  console.log('searchEquipmentList  eid:====',eid);

  return request(`/McdEpsApi/joywok/repair/searchEquipmentList`, {
    method: 'POST',
    body: JSON.stringify({
      param:_.extend({
        eid:eid 
      },params)
    }),
  });
}


// 获取供应商列表
// {
 //    "eid": "用户id",
 //    "condition":{
 //          "keys":"关键字",
 //     },
 //     "pager": {
 //        "pageNum": "当前页",
 //        "pageSize": "每页条数"
 //     }
  // }
export function searchMaintainerList(params) {
  console.log('searchMaintainerList  eid:====',eid);
  
  return request(`/McdEpsApi/joywok/repair/getMaintainerList`, {
    method: 'POST',
    body: JSON.stringify({
      param:_.extend({
        eid:eid 
      },params)
    }),
  });
}

export function searchScrappedList(params) {
  console.log('searchMaintainerList  eid:====', eid,params);
  return request(`/McdEpsApi/joywok/repair/getEqChooseScrapList`, {
    method: 'POST',
    body: JSON.stringify({
      param: _.extend({
        eid: eid
      }, params)
    }),
  });
}