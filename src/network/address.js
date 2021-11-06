import { request } from './request'
//获取所有的地址
export function getAllAddress() {
    return request({
        url: "/api/address",
        method: "get",
    })
}

//获取所有省市县
export function getCities(pid) {
    return request({
        url: "/api/city",
        method: "get",
        params: {
            pid
        }
    })
}

//添加地址
export function addAddress(name, address, phone, province, city, county, is_default) {
    return request({
        url: "/api/address",
        method: "post",
        data: {
            name, address, phone, province, city, county, is_default
        }
    })
}

//获取地址详情
export function getAddressDetail(address) {
    return request({
        url: `/api/address/${address}`,
        method: "get",
    })
}


//更新地址
export function updateAddress(addressId, name, address, phone, province, city, county, is_default) {
    return request({
        url: `/api/address/${addressId}`,
        method: "put",
        data: {
            name, address, phone, province, city, county, is_default
        }
    })
}

//删除地址
export function deleteAddress(address) {
    return request({
        url: `/api/address/${address}`,
        method: "DELETE",
    })
}

//设置为默认地址
export function setDefault(address) {
    return request({
        url: `/api/address/${address}/default`,
        method: "PATCH",
    })
}
