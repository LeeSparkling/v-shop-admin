import Vue from 'vue'
import VueRouter from "vue-router";
const Home = ()=>import("../views/home/Home")
const Login = ()=>import("../views/login/Login")
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next)=>{
  //如果将访问login不需身份的页面 放行
  if(to.path == "/login") return next()
  //获取token值
  const tokenStr = window.sessionStorage.getItem("token")
  //如果身份对不上 强制跳转
  if(!tokenStr) {
    return next('/login')
  }
  //有token令牌 放行
  next()
})


export default router
