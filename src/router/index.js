//引入vue_router
import { createRouter, createWebHistory } from 'vue-router'
//ES6  import输入  export 输出
// 模块化 默认私有，如何被别人使用？
// 通过export 输出
// 如何使用
// export default 默认输出
import Index from '@/views/static/login.vue'
//白名单
const whiteList = ['/', '/login']
import { useUserStore } from '../store/user'
import LayoutAdmin from '@/layout/admin/index.vue'

//路由表
const routes = [
  {
    path: '/', //访问路径 http://127.0.0.1:5173/cx/XfDGdOkjVo7deIxQjurcf8BEnNf
    name: 'home', //命名路由
    component: Index, //key:value  默认//页面组件 components 普通组件 页面组件和普通组件是一对多
  },
  
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/static/login.vue'), // 懒加载
  },
  {
    path: '/admin',
    name: 'admin',
    component: LayoutAdmin,//用到才加载
    children: [
       {
          path:'',
          name:'admin-index',
          component: () => import('@/views/admin/index.vue')
       },
       {
          path:'Info',
          name:'admin-Info',
          component: () => import('@/views/admin/Info.vue')
       },
       {
          path:'sms_flash_promotion_session',
          name:'admin-sms_flash_promotion_session',
          component: () => import('@/views/admin/sms_flash_promotion_session.vue')
       },
       {
        path:'oms_company_address',
        name:'admin-oms_company_address',
        component: () => import('@/views/admin/oms_company_address.vue')
     },
     {
      path:'sms_flash_promotion',
      name:'admin-sms_flash_promotion',
      component: () => import('@/views/admin/sms_flash_promotion.vue')
    },
    {
      path:'pms_album',
      name:'admin-pms_album',
      component: () => import('@/views/admin/pms_album.vue')
    },
  ]
    
 },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/404.vue'), // 懒加载
  },
]
const router = createRouter({
  //模式
  history: createWebHistory(),
  routes,
})
//前置路由守卫
//用户状态 user.js
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (whiteList.includes(to.path)) {
    // 在白名单中的路径可以无需验证直接访问
    next()
  } else {
    if (userStore.token && userStore.token.length > 0) {
      // 用户已经登录，允许访问请求的路径
      next()
    } else {
      // 用户未登录，重定向到登录页面
      next({ name: 'login' })
    }
  }
})

export default router
