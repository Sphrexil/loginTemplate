
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: () => import('@/pages/reception/reception.vue') ,
    meta: {
      auth: true
    },
    name: 'Home'
  },
  { path: '/login', component: () => import('@/pages/login/login.vue') }  ,
  {path: '/background', component: () => import('@/components/backgroud.vue')},
  {path: '/content/:id', props: true, component: () => import('@/components/problemDetails.vue')},
  {path: '/submission/:id', props: true, component: () => import('@/components/problemSub.vue')},
  {path: '/submission/:id/submissionDetail/:subId', props: true, component: () => import('@/components/problemSubDetail.vue')},
  {path: '/community', props: true, component: () => import('@/pages/article/articleReception.vue')},
  {path: '/404', props: true, component: () => import('@/pages/404.vue')},
  {
    path: '/userInfo/:id',
    props: true,
    component:  () => import('@/pages/person/userInfo.vue'),
    meta: {
      // requireLogin: true
    },
    children: [
      // {
      //   // path: '/personal/info/:id',
      //   path: '/userInfo/:id',
      //   name:'userInfo',
      //   component: () => import('@/pages/person/userInfo.vue')
      // },
      {
        // path: '/personal/info/:id',
        path: '/userInfo/info/:id',
        name:'info',
        component: () => import('@/pages/person/userInfo.vue')
      },
      {
        path:'/userInfo/myarticle/:id',
        name:'myarticle',
        component: () => import('@/pages/person/MyArticle.vue')
      },
      {
        path:'/userInfo/mycollect/:id',
        name:'mycollect',
        component:  () => import('@/pages/person/MyCollect.vue')
      },
      {
        path:'/userInfo/myfan/:id',
        name:'myfan',
        component:  () => import('@/pages/person/MyFanAndFollow.vue')
      },
      {
        path:'/userInfo/myfollow/:id',
        name:'myfollow',
        component:() => import('@/pages/person/MyFanAndFollow.vue')
      }
    ]
  }
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
