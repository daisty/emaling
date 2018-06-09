import request from '@/utils/NewRequest';

//获取首页统计数据
export function fetchHomeData() {
    return request({
        url: '/api/v1/index/stat',
        method: 'get'
    });
}
//export const fetchHomeData = () => fetch('/api/v1/index/stat', 'GET')

//获取首页当月销售日报
export function fetchHomeSalesData() {
    return request({
        url: '/api/v1/index/saleStat',
        method: 'get'
    });
}
//export const fetchHomeSalesData = () => fetch('/api/v1/index/saleStat', 'GET')