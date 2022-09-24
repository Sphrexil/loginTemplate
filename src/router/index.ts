
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  { path: '/', component: () => import('@/pages/reception/reception.vue') ,
    meta: {
      auth: true
    },
    name: 'Home'
  },
  { path: '/login', component: () => import('@/pages/login/login.vue') }  ,
]

const scrollBehavior = (to, from, savePosition) => { // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
  if (savePosition) {
    return savePosition;
  } else {
    var top;
    if (window.innerWidth >= 700) {
      top = 676
    } else {
      top = 267
    }
    return {
      x: 0,
      y: top
    }
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
