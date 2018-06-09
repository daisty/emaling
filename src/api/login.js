import request from '@/utils/request'
export function loginByUsername(userAccount, password) {
  const data = {
    userAccount,
    password
  }
  return request({
    url: '/api/v1/auth/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/v1/auth/user/logout',
    method: 'get'
  })
}

export function getUserInfo() {
  return request({
    url: '/api/v1/auth/user/info',
    method: 'get'
  })
}

// export const login = data => fetch('/api/v1/auth/user/login', data, 'POST')
