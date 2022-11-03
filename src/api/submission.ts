import request from '@/utils/requestSub.js'

// 查询问题列表
export function addSubmission(data) {
  return request({
    url: '/submission/submit',
    method: 'post',
    data: data
  })
}

// 查询问题列表
export function listSubmission(query) {
  return request({
    url: '/submission/list',
    method: 'get',
    params: query
  })
}

// 删除问题
export function delSubmission(id) {
  return request({
    url: '/submission/delete/' + id,
    method: 'delete'
  })
}

// 查询分类详细
export function getSubmission(id) {
  return request({
    url: '/submission/info/' + id,
    method: 'get'
  })
}

// 修改分类
export function updateSubmission(data) {
  return request({
    url: '/submission/update',
    method: 'put',
    data: data
  })
}
