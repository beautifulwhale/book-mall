# book-mall
vue3搭建的图书管理系统
npm i 下载依赖 
npm run dev 启动
这里我没有进行打包 (可自行打包处理)
使用vite搭建的vue3 项目 
使用vite很快捷，启动很迅速，但是在引入文件时需要注意文件的全路径，编译器提示我们的可能发生错误
在使用vue3时 需要注意下载依赖的版本，要选择高版本的
在使用router和vuex时要先在setup中进行引用
本项目做了首页图书数据显示，分类显示，购物车和个人中心
购物车的创建订单之后，会产生支付的二维码，但是https://www.bilibili.com/video/BV1Pz4y1S7Uv?p=145&spm_id_from=pageDriver 视频中直接使用二维码并不是完整路径(这里需要添加上 "https://api.shop.eduwork.cn/")


支付软件使用的是沙箱版支付宝(仅适用于安卓手机)这篇博客介绍了沙箱支付宝，你只需要用自己的支付宝，扫码就可以下载，瞬间得到八百多万！！！
https://blog.csdn.net/qq_20179227/article/details/104031998?ops_request_misc=&request_id=&biz_id=102&utm_term=%E6%B2%99%E7%AE%B1%E7%89%88%E6%94%AF%E4%BB%98%E5%AE%9D%E4%B8%8B%E8%BD%BD&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-4-104031998.first_rank_v2_pc_rank_v29&spm=1018.2226.3001.4187
在我用沙箱支付宝支付之后然后订单状态还是处于1的刚下单状态   当我再次点支付显示支付二维码的时候  手机上显示的是已经支付的订单不允许二次支付  按照道理来讲应该是状态已经改变了啊
这是我没有解决的一个bug，希望可以得到大家指教

最后接口文档在这里:https://www.showdoc.com.cn/1207745568269674/6094279351627422

 
 
