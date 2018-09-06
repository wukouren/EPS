// 维修流程－IT 接口
import request from '../utils/EpsRequest';
import { PAGE_SIZE } from '../constants';

// 获取TSI信息
export function getTSIInfo() {
	console.log('getTSIInfo  eid:====',eid);
  return request(`/McdEpsApi/joywok/repair/getTSIInfo`, {
    method: 'POST',
    body: JSON.stringify({
  		param:{
  			eid:eid	
  		}
	  }),
  });
}

// TSI确认订单&填写订单维修明细 获取订单信息   http://ssi.mcd.com.cn:8080/McdEpsApi/joywok/repair/getITOrderInfo   
// "{
//     ""eid"": ""用户id"",
//     ""condition"": {
//         ""orderNumber"": ""订单编号""
//     },
//     ""pager"": {
//         ""pageNum"": ""当前页"",
//         ""pageSize"": ""每页条数""
//     }
// }"
export function getITOrderInfo(params) {
	console.log('getITOrderInfo eid:====',eid, params);
  return request(`/McdEpsApi/joywok/repair/getITOrderInfo`, {
    method: 'POST',
	  body: JSON.stringify({
  		param:_.extend({
  			eid:eid	
  		},params)
	  }),
  });
}

