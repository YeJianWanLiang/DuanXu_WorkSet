import { request } from '@/network/request'

export function addUserInfo(data) {
  return request({
    url: '/User_management/addUser',
    method: 'post',
    data: data,
  })
}

export function updateUser(data) {
  return request({
    url: '/User_management/updateUser',
    method: 'post',
    data: data,
  })
}
export function changeUserIsUse(data) {
  return request({
    url: '/User_management/User_changeIsUse',
    method: 'post',
    data: data,
  })
}

export function getAllUser(params) {
  return request({
    url: '/User_management/getAllUser',
    method: 'get',
    params: params,
  })
}
export function searchUser(params) {
  return request({
    url: '/User_management/searchUser',
    method: 'get',
    params: params,
  })
}
export function deleteUser(params) {
  return request({
    url: '/User_management/deleteUser',
    method: 'get',
    params: params,
  })
}
