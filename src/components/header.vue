<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
            flat
            dense
            round
            @click="toggleLeftDrawer"
            aria-label="Menu"
            icon="menu"
        />
        <!--图标-->
        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-icon name="img:icon.png" color="red" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">
            OnlineJudge
          </q-toolbar-title>
        </q-btn>

        <!--路由页-->
        <q-tabs align="left">
          <q-route-tab to="/" label="题库" />
          <q-route-tab to="/community" label="社区" />
          <q-route-tab to="/background" label="Page Three" />
        </q-tabs>


        <q-space />
        <!--搜索栏-->
        <div class="YL__toolbar-input-container row no-wrap">
          <q-input dense rounded outlined v-model="search" placeholder="搜索题目或者文章" class="bg-white col" />
          <q-btn color="grey-8" text-color="grey-8"  round flat icon="search" unelevated >
            <q-tooltip>search</q-tooltip>
          </q-btn>
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="grey-8" icon="video_call" v-if="$q.screen.gt.sm">
            <q-tooltip>Create a video or post</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="apps" v-if="$q.screen.gt.sm">
            <q-tooltip>Apps</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="message" v-if="$q.screen.gt.sm">
            <q-tooltip>Messages</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <!-- 头像-->
          <q-btn round flat @click="user.hasLogin?toLoginOrUserInfo: ''">

            <div v-if="user.hasLogin" class="haslogin">
              <q-avatar size="26px">
                <q-avatar>
                  <img :src="user.userInfo.avatar">
                </q-avatar>
                <q-menu :style="{ backgroundColor: '#eee', color: 'blue'}" context-menu:false>
                  <q-list style="min-width: 100px">
                    <q-item clickable @click="toLoginOrUserInfo">
                      <q-item-section >个人中心</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable @click="userlogout">
                      <q-item-section>退出登录</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
                <q-tooltip>
                Account
                </q-tooltip>
              </q-avatar>
            </div>


            <div v-else>
              <el-link type="primary" href="http://127.0.0.1:5173/#/login">登录</el-link>
            </div>
          </q-btn>

        </div>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref,reactive } from 'vue'
// import { fabYoutube } from '@quasar/extras/fontawesome-v6'
import {userLogout} from '@/api/user.ts'
import { useRouter } from "vue-router";
import {removeToken, getToken} from '@/utils/auth.js'
import {ElMessageBox, ElMessage} from 'element-plus'
export default {

  setup () {
    const that = this
    const leftDrawerOpen = ref(false)
    const router = useRouter();
    const search = ref('')
    const user = reactive({
      hasLogin: false,
      userInfo: ''
    })
    function userlogout() {

      ElMessageBox.confirm('是否确认退出?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(that.$route.path);
        if (!getToken()) {
          localStorage.removeItem('userInfo');
          user.haslogin = false;
          ElMessage.success('退出成功!')
          router.push({path: '/'})
          window.location.reload();
        }
        userLogout().then((response)=>{
          removeToken()
          localStorage.removeItem('userInfo');
          user.haslogin = false;
          ElMessage.success('退出成功!')
          router.push({path: '/'})
          window.location.reload();
        })
      }).catch(() => {
        //
      });

    }
    function toLoginOrUserInfo () {
      if (!user.hasLogin) {
        router.push({path:"/login"})
      }else {
        var userInfo = JSON.parse(localStorage.getItem('userInfo'))
        router.push({path:"/userInfo/" + userInfo.id})
      }
    }
    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    function routerChange() {
      this.activeIndex = router.path === '/' ? '/Home' : router.path;
      if (localStorage.getItem('userInfo')) { //存储用户信息
        user.haslogin = true
        user.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        // console.log(that.userInfo);
      } else {
        user.haslogin = false;
      }
    }

    return {

      user,
      leftDrawerOpen,
      search,
      toLoginOrUserInfo,
      toggleLeftDrawer,
      routerChange,
      userlogout,

      links1: [
        { icon: 'home', text: 'Home' },
        { icon: 'whatshot', text: 'Trending' },
        { icon: 'subscriptions', text: 'Subscriptions' }
      ],
      links2: [
        { icon: 'folder', text: 'Library' },
        { icon: 'restore', text: 'History' },
        { icon: 'watch_later', text: 'Watch later' },
        { icon: 'thumb_up_alt', text: 'Liked videos' }
      ],
      links3: [
        // { icon: fabYoutube, text: 'YouTube Premium' },
        { icon: 'local_movies', text: 'Movies & Shows' },
        { icon: 'videogame_asset', text: 'Gaming' },
        { icon: 'live_tv', text: 'Live' }
      ],
      links4: [
        { icon: 'settings', text: 'Settings' },
        { icon: 'flag', text: 'Report history' },
        { icon: 'help', text: 'Help' },
        { icon: 'feedback', text: 'Send feedback' }
      ],
      buttons1: [
        { text: 'About' },
        { text: 'Press' },
        { text: 'Copyright' },
        { text: 'Contact us' },
        { text: 'Creators' },
        { text: 'Advertise' },
        { text: 'Developers' }
      ],
      buttons2: [
        { text: 'Terms' },
        { text: 'Privacy' },
        { text: 'Policy & Safety' },
        { text: 'Test new features' }
      ]
    }
  },
  created() {
    var that = this
    var hiddenProperty = 'hidden' in document ? 'hidden' :
        'webkitHidden' in document ? 'webkitHidden' :
            'mozHidden' in document ? 'mozHidden' :
                null;
    var router = useRouter()
    var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');

       //被隐藏

          if (localStorage.getItem('userInfo')) {

            that.user.hasLogin = true;
            console.log(that.user.hasLogin)
          } else {
            that.user.hasLogin = false;
          }




    console.log(localStorage.getItem('userInfo')+"---"+that.user.hasLogin)

    this.routerChange()
  }
}
</script>

<style lang="sass">
.YL

  &__toolbar-input-container
    min-width: 50px
    width: 20%
    margin-left: 500px

  //&__toolbar-input-btn
  //  border-radius: 0
  //  border-style: solid
  //  border-width: 1px 1px 1px 0
  //  border-color: rgba(0,0,0,.24)
  //  max-width: 60px
  //  width: 100%

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #faf8f8
</style>
