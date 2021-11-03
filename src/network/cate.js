import { request } from './request'
//获取所有的商品列表
export function getAllGoodsList() {
    return request({
        url: "/api/goods",
        method: "get",
    })
}

//分类搜索商品

export function getGoodsCate(type, category_id, page) {
    return request({
        url: "/api/goods?" + type + "=1&category_id=" + category_id + "&page=" + page,
        method: "get",
    })
}