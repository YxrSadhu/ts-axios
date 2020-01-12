import { isPlainObject } from './utill'
/**
 * 请求头的处理
 */

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any { // 处理请求头
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

export function parseHeaders(headers: string): any { // 解析响应头，字符串变为对象
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach((line) => { // 按回车符+换行符分割
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return // 在 forEach 中是跳到下次循环
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}