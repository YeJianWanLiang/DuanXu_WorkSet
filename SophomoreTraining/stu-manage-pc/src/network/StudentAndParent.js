import { request } from '@/network/request'
export function getAllStuInfo(params) {
  return request({
    url: '/Student_and_parents_management/getAllStu',
    method: 'get',
    params: params,
  })
}

export function searchStuInfo(params) {
  return request({
    url: '/Student_and_parents_management/search_stu',
    method: 'get',
    params: params,
  })
}

export function getAllPrtInfo(params) {
  return request({
    url: '/Student_and_parents_management/ getAllPrtInfo',
    method: 'get',
    params: params,
  })
}

export function searchPrtInfo(params) {
  return request({
    url: '/Student_and_parents_management/search_prt',
    method: 'get',
    params: params,
  })
}

export function changeIsUse(data) {
  return request({
    url: '/Student_and_parents_management/changebutton/stu_changeIsUse',
    method: 'post',
    data: data,
  })
}

export function changeIsCommittee(data) {
  return request({
    url: '/Student_and_parents_management/changebutton/changeIsCommittee',
    method: 'post',
    data: data,
  })
}

export function changepIsUse(data) {
  return request({
    url: '/Student_and_parents_management/changebutton/changepIsUse',
    method: 'post',
    data: data,
  })
}
