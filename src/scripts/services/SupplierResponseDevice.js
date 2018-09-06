// 待办接口
import request from '../utils/EpsRequest';

import qs from 'qs';



//获取更多设备列表
export function getEQOrderInfo(parame) {
  console.log(parame,"parame")
  return request('/McdEpsApi/joywok/repair/getEQOrderInfo', {
    method: 'POST',
    body: JSON.stringify(parame),
  });
}