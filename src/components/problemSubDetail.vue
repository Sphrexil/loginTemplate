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
            <ace-editor
                ref="addcodeform"
                v-model:value="cmadd.value"
                v-model:id="cmadd.id"
                v-model:language="cmadd.language"
                v-model:theme="cmadd.theme"
                v-model:readonly="cmadd.readonly"
                v-model:keyBinding="cmadd.keyBinding"
                v-model:tabSize="cmadd.tabSize"
                @update:value="cmadd.value = $event"
                @update:language="cmadd.language = $event"
            />
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
import {getSubmission} from '@/api/submission'
import {ElMessageBox} from 'element-plus'
import {getCurrentInstance, onMounted, reactive, ref, watch} from "vue";
//ace-editor
// ace 检索框
import aceEditor from "./AceEditor.vue";
export default {

  components: {brain, bcg, aceEditor},
  setup() {
    const router = useRouter()
    const problemId = useRoute().params.id
    const submissionId = useRoute().params.subId
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


    const cmadd = reactive({
      value: "",
      id: 0,
      readonly: true,
      language: 'java',
      theme: 'eclipse',
      keyBinding: 'vscode',
      tabSize: 2
    });
    function setUrl() {
      localStorage.setItem('logUrl', useRoute().path);
    }
    function languageName(msg){
      if (msg) {
        if (msg === 'C++') {
          return 'c_cpp'
        } else if (msg === 'Go') {
          return 'golang'
        } else if (msg === 'Java') {
          return 'java'
        } else if (msg === 'Python') {
          return 'python'
        } else if (msg === 'C'){
          return 'c_cpp'
        } else {
          return 'javascript'
        }
      }
    }
    onMounted(() => {
      getProblemDetails(problemId)
      getSubmission(submissionId).then((res) => {
        cmadd.value = res.code
        cmadd.language = languageName(res.language)
      })
      console.log("submissionId:",submissionId)
    })



    return{
      problem,
      setUrl,
      problemId,
      cmadd
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
