import { createRouter, createWebHashHistory } from "vue-router";
const Home = () => import("../views/Home.vue")
const Cate = () => import("../views/Cate.vue")
const ShopCart = () => import("../views/ShopCart.vue")
const Profile = () => import('../views/Profile.vue')
const Login = () => import("../views/Login.vue")
const Detail = () => import('../views/Detail.vue')
const routes = [
    { path: "/", redirect: "/home" },
    {
        path: "/home",
        name: "home",
        component: Home,
        meta: {
            title: '首页'
        }
    },
    {
        path: "/cate",
        name: "cate",
        component: Cate,
        meta: {
            title: '分类详情'
        }
    },
    {
        path: "/shopcart",
        name: "shopcart",
        component: ShopCart,
        meta: {
            title: '购物车'
        }
    },
    {
        path: "/profile",
        name: "profile",
        component: Profile,
        meta: {
            title: '个人中心'
        }
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: '/detail',
        name: 'detail',
        component: Detail,
        meta: {
            title: '商品详情'
        }
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

//配置全局导航守卫
router.beforeEach((to, from, next) => {
    //to and from are Route Object,next() must be called to resolve the hook}
    next();
    document.title = to.meta.title

})