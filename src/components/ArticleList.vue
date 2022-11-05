<template>
  <div style="width: 1000px;position: absolute;top: 80px;right: 15%;" align="center"  v-if="isMounted">
    <ul
        v-infinite-scroll="load"
        class="sharelistBox"
        style="overflow: hidden"
        :infinite-scroll-disabled="!hasMore"
    >
<!--      :infinite-scroll-disabled="disabled"-->
      <li v-for="(item,index) in list.list" :key="'article'+index" class="sharelistBox-item">
        <el-col :span="24" class="s-item tcommonBox" >
          <q-card style="margin-top: 20px;width: 800px;background-color: aliceblue" bordered>
           <span class="s-round-date">
              <span class="month" v-html="showInitDate(item.createTime,'month')+'月'"></span>
              <span class="day" v-html="showInitDate(item.createTime,'date')"></span>
          </span>
            <header>
              <h4>
                <a :href="'#/DetailArticle?aid='+item.id" target="_blank">
                  {{ item.title }}
                </a>
              </h4>
              <h5>

                <i class="fa fa-fw fa-user"></i>
                <img id="avatar" :src="item.avatar">
                <label class="flow">{{ item.nickName }}</label>
                发表于
                <i class="fa fa-fw fa-clock-o"></i>
                <span>{{ showInitDate(item.createTime, 'all') }}</span> •
                <i class="fa fa-fw fa-eye"></i>{{ item.viewCount }} 次围观 •

              </h5>
              <div class="ui label">
                <el-tag>
                  <a :href="'#/Share?classId='+item.class_id">{{ item.categoryName }}</a>
                </el-tag>
              </div>
            </header>
            <div class="article-content">
              <p style="text-indent:2em;">
                {{ item.summary }}
              </p>
              <p style="max-height:300px;overflow:hidden;text-align:center;">
                <img :src="item.thumbnail" alt="" class="maxW">
              </p>
            </div>
            <div class="viewdetail">
              <a class="tcolors-bg" :href="'#/DetailArticle?aid='+item.id" target="_blank">
                阅读全文>>
              </a>
            </div>
          </q-card>
        </el-col>
        <el-col class="viewmore">
          <!--          <a v-show="hasMore" class="tcolors-bg" href="javascript:void(0);" @click="addMoreFun">点击加载更多</a>-->

        </el-col>
      </li>
<!--        <el-row class="sharelistBox">-->
<!--          -->
<!--        </el-row>-->
    </ul>
    <!--      <template v-slot:loading>-->
    <!--        <div class="row justify-center q-my-md">-->
    <!--          <q-spinner-dots color="primary" size="40px" />-->
    <!--        </div>-->
    <!--      </template>-->
    <div class="row justify-center q-my-md" v-if="loading">
      <q-spinner-dots color="primary" size="40px" />
    </div>
    <p v-show="!hasMore" style="color: white;font-weight: bolder;" >暂无更多数据</p>
  </div>
  <el-backtop :right="100" :bottom="100"/>
</template>

<script>
import {articleList} from '../api/article'
import {initDate} from '../utils/server.js'
import {computed, onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {debounce} from "quasar";


export default {
  setup() {
    const queryParams = reactive({
      pageNum: 1,
      pageSize: 5,
      categoryId: 0
    })

    const list = reactive({
      list: []
    })

    function showInitDate(oldDate, full) {
      return initDate(oldDate, full)
    }

    let hasMore = ref(true)
    function getList() {
      articleList(queryParams).then((res) => {
        console.log(res, '666')
        list.list = list.list.concat(res.list)
        console.log("list:", list)
        if (res.totalCount <= list.list.length) {
          hasMore.value = false
        } else {
          hasMore.value = true
          queryParams.pageNum++
        }
      })
    }

    function showSearchShowList(initData) {//展示数据
      if (initData) {
        list.list = []

      }
      getList()
    }

    function addMoreFun() {//查看更多
      showSearchShowList(false);
    }

    function routeChange() {
      var that = this;
      queryParams.categoryId = (useRoute().query.classId == undefined ? 0 : parseInt(useRoute().query.classId));//获取传参的classId
      showSearchShowList(true);
    }
    const isMounted = ref(false);
    onMounted(() => {
      isMounted.value = true;
      routeChange();
    })

    function test(obj) {
      console.log("item:", obj)
    }

    // const disabled = computed(() => loading.value || !hasMore.value)
    const loading = ref(false)
    const load = debounce(() => {
      console.log("66699999")
      loading.value = true
      setTimeout(() => {
        addMoreFun()
        loading.value = false
      }, 2000)
    })
    return {
      queryParams,
      list,
      hasMore,
      getList,
      showInitDate,
      showSearchShowList,
      addMoreFun,
      test,
      loading,
      isMounted,
      load
    }
  },

}


</script>

<style>
.flow {
  height: 120px;
  background: linear-gradient(to right, red, orange, yellow, green, cyan, blue, purple);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: hue 3s linear infinite;
  font-weight: bold;
  padding: 20px;
}

@keyframes hue {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

#avatar {
  width: 28px;
  height: 28px;
  padding: 3px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 600% 600%;
  animation: gradientBG 5s ease infinite;
  border-radius: 50%;
  margin-bottom: -10px;
  margin-left: 5px;
  margin-right: -20px;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/*分享标题*/
.shareTitle {
  margin-bottom: 40px;
  position: relative;
  border-radius: 5px;
  background: #fff;
  padding: 15px;
}

.shareclassTwo {
  width: 100%;
}

.shareclassTwo li {
  display: inline-block;
}

.shareclassTwo li a {
  display: inline-block;
  padding: 3px 7px;
  margin: 5px 10px;
  color: #fff;
  border-radius: 4px;
  background: #64609E;
  border: 1px solid #64609E;
  transition: transform 0.2s linear;
  -webkit-transition: transform 0.2s linear;
}

.shareclassTwo li a:hover {
  transform: translate(0, -3px);
  -webkit-transform: translate(0, -3px);
}

.shareclassTwo li a.active {
  background: #fff;
  color: #64609E;

}

/*文章列表*/
.sharelistBox {
  transition: all 0.5s ease-out;
  font-size: 15px;
}

.s-round-date {
  position: absolute;
  top: -20px;
  left: -35px;
  height: 60px;
  width: 70px;
  padding-top: 10px;
  border-radius: 100px;
  color: #fff;
  background: rebeccapurple;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
}

.s-round-date span {
  text-align: center;
  display: block;
}

.s-round-date .day .month {
  font-size: 30px;
  font-weight: 700;
}

.ui.label {
  left: -18px !important;
  padding-left: 18px !important;
}

.ui.label::after {
  border: none !important;
}

</style>