import { request } from './request'
//从购物车进入预览，在预览中提交订单
export function previewOrder() {
    return request({
        url: "/api/orders/preview",
        method: "get",
    })
}

//生成订单
export function commitOrder(address_id) {
    return request({
        url: "/api/orders",
        method: "post",
        data: {
            address_id
        }
    })
}

//订单详情  可以添加include
export function orderDetail(order) {
    return request({
        url: `/api/orders/${order}`,
        method: "get",
        params: {
            include: 'user,orderDetails.goods'
        }
    })
}

//订单列表  
/**
  page	否	int	分页
  title	否	string	标题模糊搜索
  status	否	int	订单状态: 1下单 2支付 3发货 4收货 5过期
  include	否	string	包含额外的数据： goods 商品，user 用户 ，orderDetails订单详情 
 *
 */
export function orderList(params) {
    return request({
        url: `/api/orders`,
        method: "get",
        params
    })
}


//物流详情
export function expressDetail(order) {
    return request({
        url: `/api/orders/${order}/express`,
        method: "get",
    })
}

//确认收货
export function confirmGoods(order) {
    return request({
        url: `/api/orders/${order}/confirm`,
        method: "PATCH",
    })
}

//评论
export function commentGoods(order, goods_id, content, rate, star) {
    return request({
        url: `/api/orders/${order}/comment`,
        method: "post",
        data: {
            goods_id,
            content,
            rate,
            star
        }
    })
}


//获取支付二维码
export function getPay(order, type) {
    return request({
        url: `/api/orders/${order}/pay`,
        method: "GET",
        params: {
            type
        }
    })
}


//获取支付状态
export function getPayStatus(order) {
    return request({
        url: `/api/orders/${order}/status`,
        method: "GET",
    })
}