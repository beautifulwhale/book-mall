import { request } from './request'
export function getHomeData() {
    return request({
        url: "/api/index",
        method: "get",
    })
}

export function getHomeCateData(type, page) {
    return request({
        url: "/api/index?" + type + "=1&page=" + page,
        method: "get",
    })
}