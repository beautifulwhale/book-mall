import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index'
import 'vant/lib/index.css'
import './assets/css/base.css'
import Vant from 'vant'
import { Lazyload } from 'vant';
const app = createApp(App)


// 注册时可以配置额外的选项
app.use(Lazyload, {
  lazyComponent: true,
});
app.use(router).use(Vant)
app.mount('#app')

