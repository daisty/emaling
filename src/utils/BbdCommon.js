 /*
  *   时间戳 转 日期
  *   str  时间戳   1492999262
  *   返回 2017-04-25 10:10:20
  *   多传一个值 决定返回的类型 （传的值必须是 1）    2017-04-25  或者  2017-04-25 10:10:20
  */
export const timeToDateFn = (str,i) => {
  let date = new Date(parseInt(str) * 1000)
  let Y = date.getFullYear() + '-',
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
    D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()),
    h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':',
    m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':',
    s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds()),
    strReA = Y + M + D + ' ' + h + m + s,
    strReT = Y + M + D
  if (i && i === 1) {
    return strReT
  } else {
    return strReA
  }
}

 /*
  *   获取当前时间
  */
export const timeNow = (i) => {
  let date = new Date()
  let Y = date.getFullYear() + '-',
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
    D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()),
    h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':',
    m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':',
    s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds()),
    strReA = Y + M + D + ' ' + h + m + s,
    strReT = Y + M + D
  if (i && i === 1) {
    return strReT
  } else {
    return strReA
  }
}

// 当天
export const dateNow = () => {
  return timeNow(1)
}

// 当前月第一天
export const monthFirstDay = () => {
  let date = new Date()
  let Y = date.getFullYear() + '-',
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
    D = '1',
    strReD = Y + M + D
  return strReD
}
// 当前年第一天
export const yearFirstDay = () => {
  let date = new Date()
  let Y = date.getFullYear() + '-',
    M = '01' + '-',
    D = '1',
    strReY = Y + M + D
  return strReY
}
// 获取系统昨天的日期
export const yesterday = () => {
  let date= new Date();
  let newDate = new Date(date.getTime() - 1*24*60*60*1000);//利用时间戳的方法
  let month = newDate.getMonth()+1;//取得月份
  let cur_data = newDate.getDate();//取得几号
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (cur_data >= 0 && cur_data <= 9) {
    cur_data = "0" + cur_data;
  }
  let time = newDate.getFullYear()+"-"+ month +"-"+ cur_data;
  return time
}

// 获取上个自然周的日期
export const weekBeforeLast = () => {
  let num = 7;
  let date= new Date();
  let week = new Date().getDay();//取得今天星期几，周天返回0
  if(week == 0){//周天的时候
      num += 7;
      week = 7;
  }else{
      num = num + week - 1;
  }
  let newDate = new Date(date.getTime() - num*24*60*60*1000);//获得上周一的时间戳
  let month = newDate.getMonth()+1;
  let cur_data = newDate.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (cur_data >= 0 && cur_data <= 9) {
      cur_data = "0" + cur_data;
  }
  let time1 = newDate.getFullYear()+"-"+ month +"-"+ cur_data;//上一周的开始日期

  let newDate2 = new Date(date.getTime() - week*24*60*60*1000);//获得上周周末的时间戳
  let month2 = newDate2.getMonth() + 1;
  let cur_data2 = newDate2.getDate();
  if(month2 >= 1 && month2 <= 9) {
      month2 = "0" + month2;
  }
  if(cur_data2 >= "0" && cur_data2 <= 9){
      cur_data2 = "0" + cur_data2;
  }
  let time2 = newDate2.getFullYear()+"-"+ month2 +"-"+ cur_data2;//上一周的结束日期
  return {weekFirst:time1, weekLast:time2}
}
// 上一周的开始日期
export const weekFirstDay = () => {
  return weekBeforeLast().weekFirst
}
// 上一周的结束日期
export const weekLastDay = () => {
  return weekBeforeLast().weekLast
}

// 获取本周一的日期
export const thisWeek = () => {
  var d=new Date(),
    day=d.getDay(),
    date=d.getDate()
    if(day==1){
      return d
    }
    if(day==0){
      d.setDate(date-6)
    }
    else{
      d.setDate(date-day+1)
    }
    let date1 = new Date(d)
    let date1_value=date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate()
    return date1_value
}
// 获取上个自然月的日期
export const monthBeforeLast = () => {
  Date.prototype.format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }

  let date= new Date();
  let month = date.getMonth() - 1;
  date.setMonth(month);
  date.setDate(1);
  let s1 = date.format("yyyy-MM-dd");

  let date2 = new Date();
  let month2 = date2.getMonth();
  date2.setMonth(month2);
  date2.setDate(0);
  let s2 = date2.format("yyyy-MM-dd");
  return {monthFirst:s1, monthLast:s2}
}
// 上月开始
export const beforeMonthFirstDay = () => {
  return monthBeforeLast().monthFirst
}
// 上月最后一天
export const  beforeMonthLastDay = () => {
  return monthBeforeLast().monthLast
}
// 获取最近三个月时间
export const threeMonthFirstDay = () => {
  let date = new Date()
  let Y = date.getFullYear()
  let M = date.getMonth() + 1 // 获取当前月
  let D1 = '01'
  let Y1
  let M1
  if(M <= 2){
    Y1 = Y - 1 + '-'
    M1 = ( M - 2 + 12 ) + '-'
  } else {
    Y1 = Y + '-'
    M1 = ( M - 2 < 10 ? '0' + ( M - 2 ) : ( M - 2 )) + '-'
  }
  let threeMonth = Y1 + M1 + D1
  return threeMonth
}

// 设置本地存储session
export const setSessionStorage = (name, item) => {
  return window.sessionStorage.setItem(name, item)
}
// 获取本地存储session
export const getSessionStorage = (name) => {
  return window.sessionStorage.getItem(name)
}
// 删除本地存储
export const delSessionStorage = (name) => {
  window.sessionStorage.removeItem(name)
}
