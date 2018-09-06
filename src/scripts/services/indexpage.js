// 待办接口
import request from '../utils/EpsRequest';

window.basurl="https://www.easy-mock.com/mock/5994f61b059b9c566dc0ffe8/eps";
import qs from 'qs';

// 获取菜单


export function getMenu(parame) {
  return request(`/jmis/JmisApiService?${qs.stringify(parame)}`, {
    method: 'GET',
  });
}


//获取待办件数
export function getToDoListCount(parame) {
  console.log(parame,"parame")
  return request('/McdEpsApi/joywok'+'/common/getToDoListCount', {
    method: 'POST',
    body: JSON.stringify(parame),
  });
}