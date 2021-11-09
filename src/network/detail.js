import { request } from './request'
//获取所有的商品列表
export function getGoodsDetail(good) {
    return request({
        url: `/api/goods/${good}`,
        method: "get",
    })
}

//收藏商品
export function collectGoods(goods) {
    return request({
        url: `/api/collects/goods/${goods}`,
        method: "POST",
    })
}

//我的收藏
export function myCollect() {
    return request({
        url: "/api/collects",
    })
}