import { createStore } from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
// 引入插件
import createPersistedState from "vuex-persistedstate";
const state = {
    cartCount: 0
}
export default createStore({
    state,
    getters,
    mutations,
    actions,
    /* vuex数据持久化配置 */
    plugins: [
        createPersistedState({
            // 存储方式：localStorage、sessionStorage、cookies
            storage: window.sessionStorage,
            // 存储的 key 的key值
            key: "store",
            render(state) {
                // 要存储的数据：本项目采用es6扩展运算符的方式存储了state中所有的数据
                return { ...state };
            }
        })
    ]
})