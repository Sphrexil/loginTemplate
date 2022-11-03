<template>


  <brain/>
  <div class="body_part">
    <bcg/>
    <q-card  class="my_card">
      <q-card-section>
        <div class="text-h4" style="font-weight: bolder ">OnlineJudge在线题库</div>
      </q-card-section>
      <q-separator size="0.1px"/>

      <div class="option">
        <el-select v-model="problem.option" placeholder="问题筛选" clearable size="large" @clear="showAll">

          <el-option-group
              v-for="group in problem.options"
              :key="group.label"
              :label="group.label"
          >
            <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @click="problemOption(item.value)"
            />
          </el-option-group>
        </el-select>
      </div>


      <div style="margin-top: 50px">
        <q-card-actions class="child_items"   style="padding-bottom: 20px">
          <label class="title_id" style="font-size: larger;font-weight: bolder ">#</label>
          <label class="title_name" style="font-size: larger;font-weight: bolder ">题目名称</label>
          <label class="title_pass" style="font-size: larger;font-weight: bolder ">通过率</label>
          <label class="title_difficulty" style="font-size: larger;font-weight: bolder ">难度</label>
        </q-card-actions>
        <q-separator size="3px"/>
        <div v-for="(item,index) in problem.list" :key="'article'+index">
          <div :style="'padding-bottom: 10px;' + (index % 2 == 0 ?'background-color: #FAF8F8FF':'')">
            <q-card-actions class="child_items">
              <label class="title_id" >{{index}}</label>
              <el-link class="title_name" style="padding-right: 20px" type="primary"
                       :href="'http://127.0.0.1:5173/#/content/' + item.id">
                {{ item.problemName }}</el-link>
              <label class="title_pass" style="margin-right: 15px;opacity: 0.5">100%</label>
              <el-tag :type="item.difficulty === 1?'success': item.difficulty === 2?'warning':'danger'" class="title_difficulty"
                      style="margin-right: -8px">
                {{ item.difficulty === 1?'简单': item.difficulty === 2?'中等':'困难'}}</el-tag>
              <!--              <label class="title_difficulty">{{ item.difficulty === 1?'简单': item.difficulty === 2?'中等':'困难'}}</label>-->
            </q-card-actions>
          </div>
          <q-separator size="1px"/>
        </div>
        <!--  分页-->

        <div class="q-pa-lg flex flex-center">
          <q-pagination
              v-model="problem.current"
              :max="problem.totalPage"
              direction-links
              @click="toAssignPage"
              :max-pages="5"
              :boundary-numbers="false"
          />
        </div>

      </div>

    </q-card>
  </div>

</template>

<script>
import header from '@/components/header.vue'
import background from '@/components/backgroud.vue'
import background2 from '@/components/backgroud2.vue'

import middle from '@/components/middle.vue'
import {reactive} from "vue";
import {listProblem} from "@/api/problem.ts";
export default {
  components:{brain : header, bcg : background, mid : middle},
  setup() {
    const problem = reactive({
      list: [],
      query: {
        pageNum: 1,
        pageSize: 50,
        difficulty: null,
        isDescByDifficulty: null
      },
      options: [
        {
          label: '按照难度查询',
          options: [
            {
              value: '简单', label: '简单'
            },
            {
              value: '中等', label: '中等'
            },
            {
              value: '困难', label: '困难'
            },
          ],
        },
        {
          label: '按照时间或者难度排序',
          options: [
            {
              value: '按照难度逆序', label: '按照难度逆序'
            }
          ]
        }
      ],
      option: '',
      current: 1,
      totalPage: 0
    })
    function toAssignPage() {
      localStorage.setItem("ProblemCurrentPage",problem.current)
      problem.query.pageNum = problem.current
      console.log(problem.current)
      getProblemList(problem.query)
    }
    function showAll() {
        problem.query.difficulty = null
      problem.query.isDescByDifficulty = null
        getProblemList(problem.query)
    }
    function problemOption(msg) {
      problem.current = problem.current
      if (msg === '简单') {
        problem.query.difficulty = 1
        getProblemList(problem.query)
      }else if (msg === '中等') {
        problem.query.difficulty = 2
        getProblemList(problem.query)
        console.log("查出的为:{}",problem.list )
      }else if (msg === '困难') {
        problem.query.difficulty = 3
        getProblemList(problem.query)
      }else if (msg === '按照难度逆序') {
        problem.query.isDescByDifficulty = true
        problem.query.difficulty = null
        getProblemList(problem.query)
      }
    }
    function getProblemList(query) {
      listProblem(query).then((res) => {
          problem.list = res.list
          problem.totalPage = res.totalPage
      })
    }
    return {
      problem,
      getProblemList,
      problemOption,
      showAll,
      toAssignPage
    }
  },
  created() {
    var count = localStorage.getItem("ProblemCurrentPage")
    console.log("存入的页码为:"+count)
    if (count) {
      this.problem.query.pageNum = count
    }
    this.getProblemList(this.problem.query)
    console.log('query:', this.problem.query.pageNum)
    this.problem.current = this.problem.totalPage < count ? 1 : count

  }

}

</script>

<style lang="scss" scoped>
.option{
  width: 100%;
  position: absolute;
  left: 330px;
  top: 80px;

}

.body_part{

}
.my_card{
  width: 250%;
  height: auto;
  padding: 0;
  margin-top: -650px;
  margin-left: -70%;
  overflow: visible;
}
.child_items{
  display: inline-block;
  width: 200px;
  padding-top: 20px;
  overflow: visible;
}
.title_id{
  overflow: visible;
  position: absolute;
  left: 100px;
  margin-top: -8px;
}
.title_name{
  position: absolute;
  left: 200px;
  margin-top: -8px;
  overflow: visible;
}
.title_difficulty{
  position: absolute;
  right: 100px;
  margin-top: -8px;
  overflow: visible;
}
.title_pass{
  position: absolute;
  right: 200px;
  margin-top: -8px;
  overflow: visible;
}
</style>
