// 待办接口
import request from '../utils/EpsRequest';
import { PAGE_SIZE } from '../constants';

window.basurl="/McdEpsApi/joywok";


// 获取待办列表
export function TodoList(param) {
  return request(window.basurl+'/common/getToDoList', {
    method: 'POST',
    body: JSON.stringify(param),
  });
}

//获取途中订单列表
export function UnfinishedList(param) {
  return request(window.basurl+'/common/getUnfinishedList', {
    method: 'POST',
    body: JSON.stringify(param),
  });
}

// 获取历史订单列表
export function HistoryList(param) {
  return request(window.basurl+'/common/getFinishedList', {
    method: 'POST',
    body: JSON.stringify(param),
  });
}

//获取图中订单件数
// export function UnfinishedListCount(parame) {
//   return request(window.basurl+'/common/getUnfinishedListCount', {
//     method: 'POST',
//     body: JSON.stringify(parame),
//   });
// }