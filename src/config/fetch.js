import { baseUrl } from './env'
import { Message } from 'element-ui'
export default async(url = '', data = {}, type = 'GET') => {
  type = type.toUpperCase()
  url = baseUrl + url
  if (type === 'GET') {
    let dataStr = ''// 数据拼接字符串
    Object.keys(data).forEach(key => {
      if (data[key] !== ''){
        dataStr += key + '=' + data[key] + '&'
      }
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }

  return new Promise((resolve, reject) => {
    var requestObj
    requestObj = new XMLHttpRequest()
    requestObj.withCredentials = true
    let sendData = ''
    if (type !== 'GET') {
      sendData = JSON.stringify(data)
    }
    requestObj.open(type, url, true)
    requestObj.timeout = 5000
    requestObj.setRequestHeader('Content-type', 'application/json')
    requestObj.send(sendData)
    requestObj.onreadystatechange = () => {
      if (requestObj.readyState === 4) {
        if (requestObj.status === 200) {
          let obj = requestObj.response
          if (typeof obj !== 'object') {
            obj = JSON.parse(obj)
          }
          resolve(obj)
        } else {
          requestObj.ontimeout = function(e) {
            Message({
              type: 'error',
              message: '请求超时'
            })
          }
          reject(requestObj)
        }
      }
    }
  })
}
