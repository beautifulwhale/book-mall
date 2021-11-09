import { request } from './request'
//登录
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

//退出登录
export function logOut() {
    return request({
        url: "/api/auth/logout",
        method: "post",
    })
}