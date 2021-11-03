import { request } from './request'
//获取所有的商品列表
export function registerUser(name, email, password, password_confirmation) {
    return request({
        url: "/api/auth/register",
        method: "post",
        data: {
            name,
            email,
            password,
            password_confirmation
        }
    })
}