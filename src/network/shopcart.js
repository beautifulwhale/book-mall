import { request } from './request'
export function addShopCart(goods_id, num) {
    return request({
        url: "/api/carts",
        method: "post",
        data: {
            goods_id,
            num
        }
    })
}

export function getCart(goods) {
    return request({
        url: "/api/carts?" + goods,
        method: "get"
    })
}