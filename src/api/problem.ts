// @ts-ignore
import request from '@/utils/requestProblem'

// 查询问题列表
export function addProblem(data) {
  return request({
    url: '/problem/save',
    method: 'post',
    data: data
  })
}

// 查询问题列表
export function listProblem(query) {
  return request({
    url: '/problem/list',
    method: 'get',
    params: query
  })
}

// 删除问题
export function delProblem(id) {
  return request({
    url: '/problem/delete/' + id,
    method: 'delete'
  })
}

// 查询分类详细
export function getProblem(id) {
  return request({
    url: '/problem/info/' + id,
    method: 'get'
  })
}

// 查询分类详细
export function getProblemByShowId(id) {
  return request({
    url: '/problem/showInfo/' + id,
    method: 'get'
  })
}

// 修改分类
export function updateProblem(data) {
  return request({
    url: '/problem/update',
    method: 'put',
    data: data
  })
}
