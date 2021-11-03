import { request } from './request'
//获取所有的商品列表
export function loginUser(email, password) {
    return request({
        url: "/api/auth/login",
        method: "post",
        data: {
            email,
            password
        }
    })
}