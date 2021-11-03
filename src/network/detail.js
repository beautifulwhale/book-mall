import { request } from './request'
//获取所有的商品列表
export function getGoodsDetail(good) {
    return request({
        url: `/api/goods/${good}`,
        method: "get",
    })
}