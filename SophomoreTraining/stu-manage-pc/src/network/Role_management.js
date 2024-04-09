import { request } from '@/network/request'

export function addRoleInfo(data) {
  return request({
    url: '/Role_management_table/addRole',
    method: 'post',
    data: data,
  })
}

export function updateRoleInfo(data) {
  return request({
    url: '/Role_management_table/updateRole',
    method: 'post',
    data: data,
  })
}
export function changeIsUse(data) {
  return request({
    url: '/Role_management_table/changeIsUse',
    method: 'post',
    data: data,
  })
}
export function getAllRoleInfo(params) {
  return request({
    url: '/Role_management_table/searchAllRole',
    method: 'get',
    params: params,
  })
}
export function searchRoleInfo(params) {
  return request({
    url: '/Role_management_table/serachRoleByNameOrUse',
    method: 'get',
    params: params,
  })
}
export function deleteRoleInfo(params) {
  return request({
    url: '/Role_management_table/deleteRole',
    method: 'get',
    params: params,
  })
}
