import request from '../utils/EpsRequest';

//获取设备订单详情


//获取待办件数
export function getITOrderList(parame) {
  return request('/McdEpsApi/joywok'+'/repair/getITOrderInfo', {
    method: 'POST',
    body: JSON.stringify(parame),
  });
}