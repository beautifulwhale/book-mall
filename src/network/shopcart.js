import { request } from './request'
//添加商品到购物车
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

//获取购物车商品
export function getCart(goods) {
    return request({
        url: "/api/carts?" + goods,
        method: "get"
    })
}

//改变购物车中商品的数量
export function changeNum(cart, num) {
    return request({
        url: `/api/carts/${cart}`,
        method: "put",
        data: {
            num
        }
    })
}

//改变是否选中状态
export function changeCheck(data) {
    return request({
        url: `/api/carts/checked`,
        method: "PATCH",
        data
    })
}

//从购物车中删除
export function deleteGoods(cart) {
    return request({
        url: `/api/carts/${cart}`,
        method: "DELETE",

    })
}