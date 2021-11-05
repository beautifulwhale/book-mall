import { request } from './request'
//用户详情
export function getUser() {
    return request({
        url: "/api/user",
        method: "get",
    })
}

//修改用户头像
export function changeAvatar(avatar) {
    return request({
        url: "/api/user/avatar",
        method: "patch",
        avatar
    })
}

//修改用户昵称
export function changeName(name) {
    return request({
        url: "/api/user",
        method: "put",
        data: {
            name
        }
    })
}

//修改用户邮箱获取验证码
export function getEmailCode(email) {
    return request({
        url: "/api/auth/email/code",
        method: "post",
        data: {
            email
        }
    })
}

//修改邮箱
export function changeEmail(code, email) {
    return request({
        url: "/api/auth/email/update",
        method: "PATCH",
        data: {
            code,
            email
        }
    })
}
