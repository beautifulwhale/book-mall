import { getCart } from '../network/shopcart'

export default {
    //更新购物车数量
    updateCart({ commit }) {
        getCart().then(res => {
            commit('addCart', { count: res.data.length })
        })
    }
}