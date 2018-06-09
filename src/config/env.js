/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 */
var baseUrl = ''
var routerMode = 'history'
var baseImgPath

if (process.env.NODE_ENV === 'development') {
  // baseUrl = 'http://120.78.151.112:6677'
  baseUrl = 'http://120.78.151.112:6677'
  // baseUrl = 'http://10.0.0.12:6677'
  // baseImgPath = 'http://localhost:8002/img/'
} else {
  baseUrl = 'http://120.78.151.112:6677'
  // baseUrl = 'http://10.0.0.17:6677'
  // baseImgPath = 'http://cangdu.org:8001/img/'
}

export {
  baseUrl,
  routerMode,
  baseImgPath
}
