import request from '../utils/EpsRequest';
import { PAGE_SIZE } from '../constants';

// 获取税率
export function getTaxList() {
  return request(`/McdEpsApi/joywok/common/getTaxList`, {
  	method: 'POST',
  });
}

// 获取设备操作建议
export function getEquipmentOperation() {
  return request(`/McdEpsApi/joywok/common/getEquipmentOperation`, {
  	method: 'POST',
  });
}

// 获取配件操作建议
export function getFittingOperation() {
  return request(`/McdEpsApi/joywok/common/getFittingOperation`, {
  	method: 'POST',
  });
}

// 获取餐厅信息
export function getPRStoreInfo() {
  return request(`/McdEpsApi/joywok/noproject/getPRStoreInfo`, {
  	method: 'POST',
  	body: JSON.stringify({
  		param:{
  			eid: eid	
  		}
	  }),
  });
}

// 获取采购类型
export function getPRTypeInfo() {
  return request(`/McdEpsApi/joywok/noproject/getPRTypeInfo`, {
    method: 'POST',
    body: JSON.stringify({
      param:{
        eid: eid  
      }
    }),
  });
}

// 获取报废单号
export function getPRWriteoffInfo() {
  return request(`/McdEpsApi/joywok/noproject/getPRWriteoffInfo`, {
    method: 'POST',
    body: JSON.stringify({
      param:{
        eid: eid  
      }
    }),
  });
}


