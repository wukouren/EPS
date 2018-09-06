import request from '../utils/EpsRequest';

//获取设备订单详情


//获取供应商设备报价列表
export function getDeviceList(parame) {
  return request(parame.requestUrl1, {
    method: 'POST',
    body: JSON.stringify(parame.payload),
  });
}



export function getDOAOrderInfo(parame) {
  console.log(parame,"parame")
  return request(parame.requestUrl2, {
    method: 'POST',
    body: JSON.stringify(parame.payload),
  });
}