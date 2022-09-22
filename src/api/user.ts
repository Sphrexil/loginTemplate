import request from '../utils/request'

// 查询用户列表
export function sendMail(to) {
  return request({
    url: '/sendMail',
    method: 'post',
    params: {to: to}
  })
}

// 查询用户列表
export function userLogin(userName, password, code, uuid) {
  const data = {
    userName,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 删除用户
export function userLogout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 查询分类详细
export function userRegister(data) {
  return request({
    url: '/user/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getCurrentUserInfo() {
  return request({
    url: '/user/userInfo',
    method: 'post'
  })
}

// 获取用户详细信息
export function updateUserInfo(data) {
  return request({
    url: '/user/userInfo',
    method: 'put',
    data: data
  })
}
