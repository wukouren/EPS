// 维修接口
import request from '../utils/EpsRequest';
import { PAGE_SIZE } from '../constants';

export function fetch( payload ) {
  payload = _.extend({pagesize: PAGE_SIZE,pageno: 0},payload);

  return request(`/api2/goods`, {
  	method: 'GET',
  	body: payload
  });
}

export function fetchByID(id) {
  return request(`/api2/goods/${id}`, {
    method: 'GET',
  });
}

export function remove(id) {
  return request(`/api2/goods/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/api2/goods/${id}`, {
    method: 'PATCH',	
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('/api2/goods', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}