import { createRouter, createWebHashHistory } from "vue-router";
const Home = () => import("../views/Home.vue")
const Cate = () => import("../views/Cate.vue")
const ShopCart = () => import("../views/ShopCart.vue")
const Profile = () => import('../views/Profile.vue')
const Login = () => import("../views/Login.vue")
const Detail = () => import('../views/Detail.vue')
const Register = () => import('../views/Register.vue')
const Order = () => import('../views/Order.vue')
const Account = () => import('../views/Account.vue')
const Address = () => import('../views/Address.vue')
const Collect = () => import('../views/Collect.vue')
const ChangeName = () => import('../views/ChangeName.vue')
const ChangeEmail = () => import('../views/ChangeEmail.vue')
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
            title: '个人中心',
            isAuthorization: true
        }
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            title: '注册 '
        }
    },
    {
        path: '/detail',
        name: 'detail',
        component: Detail,
        meta: {
            title: '商品详情'
        }
    },
    {
        path: '/order',
        name: 'order',
        component: Order,
        meta: {
            title: '支付订单'
        }
    },
    {
        path: '/account',
        name: 'account',
        component: Account,
        meta: {
            title: '账号管理'
        }
    },
    {
        path: '/address',
        name: 'address',
        component: Address,
        meta: {
            title: '地址管理'
        }
    },
    {
        path: '/collect',
        name: 'collect',
        component: Collect,
        meta: {
            title: '我的收藏'
        }
    },
    {
        path: '/changename',
        name: 'changename',
        component: ChangeName,
        meta: {
            title: '修改昵称'
        }
    },
    {
        path: '/changeemail',
        name: 'changeemail',
        component: ChangeEmail,
        meta: {
            title: '修改邮箱'
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
    let token = window.localStorage.getItem('token');
    if (to.meta.isAuthorization && token == null) {
        next('/login')
    } else {
        next()
    }
    document.title = to.meta.title

})