<template>
  <brain/>
  <bcg/>
  <div>
    <q-card  class="my_card">
      <div class="text-h4" id="header">
        <label style="font-weight: 10">{{problem.routerId}}</label>
        <label style="font-weight: 100">{{'.' +problem.problemName}}</label>
      </div>

      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="width: 900px;height: auto">
          <q-card >
            <q-tabs
                v-model="tab"
                class="bg-white text-grey"
                align="justify"
                narrow-indicator
                inline-label
            >
              <q-route-tab name="problemDetail" exact  label="题目" icon="today" :to="'/content/' + problemId"/>
              <q-route-tab name="submission" exact  label="提交记录" icon="list" :to="'/submission/' + problemId"/>

            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated class="bg-white text-center" style="width: auto;height: auto">
              <q-tab-panel name="submission">
                <div class="q-pa-md">
                  <q-table
                      :rows="rows"
                      :columns="columns"
                      row-key="name"
                  >
                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td key="creteTime" :props="props">
                          {{ timeHandle(props.row.creteTime) }}
                        </q-td>

                        <q-td key="status" :props="props">
                          <el-link :style="props.row.status === 'Accepted' ? 'color: green' : 'color: red'"
                                   :href="'http://127.0.0.1:5173/#/submission/' + problemId + '/submissionDetail/' + props.row.id"
                          >{{ props.row.status }}</el-link>
                        </q-td>

                        <q-td key="runTime" :props="props">
                          {{ props.row.runTime }}
                        </q-td>

                        <q-td key="language" :props="props">
                          {{ props.row.language }}
                        </q-td>

                        <q-td key="mode" :props="props">
                          {{ props.row.mode }}
                        </q-td>
                      </q-tr>

                    </template>
                  </q-table>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import brain from './header.vue'
import { useRoute,useRouter } from "vue-router";
import bcg from '@/components/backgroud.vue'
import {getProblem} from '@/api/problem'
import {listSubmission} from '@/api/submission'
import {ElMessageBox} from 'element-plus'
import {getCurrentInstance, onMounted, reactive, ref, watch} from "vue";
//ace-editor
// ace 检索框

export default {

  components: {brain, bcg,},
  setup() {
    const router = useRouter()
    const problemId = useRoute().params.id
    const problem = reactive({
      outVal : '',
      inVal: '',
      problemName : '',
      problem: '',
      outputDescribe: '',
      inputDescribe: '',
      sample: '',
      tag: '',
      difficulty: 0,
      dataRange: '',
      memoryLimit: '',
      timeLimit: '',
      routerId: useRoute().params.id,
      problemRow: [],
      problemOutRow: [],
      problemIntRow: [],
      problemDataRow: [],
      problemCaOutRow: [],
      problemCaIntRow: [],
      problemPty: ['难度：', '时/空限制：', '总通过数：', '总尝试数：', '来源：', '算法标签']
    })
    const columns = reactive([
      {
        name: 'creteTime',
        label: '提交时间',
        align: 'left',
        field: 'creteTime',
        headerStyle: 'font-weight: bolder'
      },
      {
        name: 'status',
        label: '状态',
        align: 'center',
        field: 'status',
        headerStyle: 'font-weight: bolder',
      },
      {
        name: 'runTime',
        label: '运行时间',
        field: 'runTime',
        align: 'center',
        headerStyle: 'font-weight: bolder'
      },
      {
        name: 'language',
        label: '语言',
        field: 'language',
        align: 'center',
        headerStyle: 'font-weight: bolder'
      },
      {
        name: 'mode',
        label: '模式',
        field: 'mode',
        headerStyle: 'font-weight: bolder'
      }
    ])

    const rows =  reactive([

    ])

    function getProblemDetails(id) {
      getProblem(id).then((res) => {
        problem.problemName = res.problemName
        problem.problem = res.problem
        problem.outputDescribe = res.outputDescribe
        problem.inputDescribe = res.inputDescribe
        problem.sample = res.sample
        problem.tag = res.tag
        problem.difficulty = res.difficulty
        problem.dataRange = res.dataRange
        problem.memoryLimit = res.memoryLimit
        problem.timeLimit = res.timeLimit
      })
    }

    function toLogin(){
      router.push({path: '/login'});
    }

    function setUrl() {
      localStorage.setItem('logUrl', useRoute().path);
    }

    function timeHandle(time) {
      var handledTime = time.replace(new RegExp("-","gm"),"/");
      var timeMile = (new Date(handledTime)).getTime();
      var toNowMile = Date.now() - timeMile
      if (toNowMile < 60000 ) {
        if (toNowMile < 1000) {
          return "1秒前"
        }
        return Math.round(toNowMile / 1000) +"秒前"
      } else if (toNowMile < 3600000) {
        return Math.round(toNowMile / 60000) +"分钟前"
      } else if (toNowMile < 86400000) {
        return Math.round(toNowMile / 3600000) +"小时前"
      } else if (toNowMile < 2592000000) {
        return Math.round(toNowMile / 86400000) +"天前"
      } else if (toNowMile < 31104000000) {
        return Math.round(toNowMile / 2592000000) +"个月前"
      }
    }

    onMounted(() => {
      console.log(useRoute().path)
      console.log("该问题的id为:"+useRoute().params.id)
      getProblemDetails(useRoute().params.id)
      if (localStorage.getItem('userInfo')) {
        var userInfo = JSON.parse(localStorage.getItem('userInfo'))
        console.log("userinfo",userInfo)
        listSubmission({
          relatedUser: Number(userInfo.id),
          problemId: useRoute().params.id,
          language: null,
        }).then((res) => {
          var list = res
          console.log("list：",list)
          for (var i = 0;i < list.length; i ++) {
            var oneRecord = {
              creteTime: list[i].createTime,
              status: list[i].status,
              runTime: list[i].timeUsage,
              language: list[i].language,
              mode: '普通',
              id: list[i].id
            }
            console.log("oneRecord",oneRecord)
            rows.push(oneRecord)
          }
         console.log("rows：",rows)
        })
      } else {

        ElMessageBox.confirm('登录后即可查看自己的提交记录，是否前往登录页面?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//确定，跳转至登录页面
          //储存当前页面路径，登录成功后跳回来
          console.log('6666666')
          toLogin()
          setUrl()
        }).catch(() => {

        });
      }
    })



    return{
      problem,
      columns,
      rows,
      setUrl,
      problemId,
      getProblemDetails,
      timeHandle
    }
  },
  created() {
  }
}
</script>

<style scoped>
.my_card{
  width: auto;
  height: auto;
  padding: 0;
  margin-top: -650px;
  margin-left: auto;
  margin-right: auto;
  overflow: visible;
}
#header{
  padding-top: 30px;
  padding-bottom: 10px;
  text-align: left;
  margin-left: 20px;

}
</style>
