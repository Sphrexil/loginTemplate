<template>
  <brain/>
<bcg/>
  <div>
    <q-card  class="my_card">
      <div class="text-h4">
        <label style="font-weight: 10">{{problem.routerId}}</label>
        <label style="font-weight: 100">{{'.' +problem.problemName}}</label>
      </div>

      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="width: 850px;height: auto">
          <q-card >
            <q-tabs
                v-model="tab"
                class="bg-white text-grey"
                align="justify"
                narrow-indicator
                inline-label
            >
              <q-route-tab name="problemDetail" exact  label="题目" icon="today" to="/content/8" />
              <q-route-tab name="submission" exact  label="提交记录" icon="list" to="/content/7"/>

            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated class="bg-white text-center" style="width: auto;height: 1050px">
              <q-tab-panel name="problemDetail" class="panel">
                <div class="problemAll">
                  <div>
                    <div v-for="(item,index) in problem.problemRow" :key="index">
                      <div class="text" id="problemBody">
                        {{ index === problem.problemRow.length - 1 ?item : item + '。'}}
                      </div>
                    </div>

                    <span class="headline">输入格式</span>

                    <div v-for="(item,index) in problem.problemOutRow" :key="index">
                      <div class="text" id="problemOutBody">
                        {{ index === problem.problemOutRow.length - 1 ?item : item + '。'}}
                      </div>
                    </div>
                    <span class="headline">输出格式</span>
                    <div v-for="(item,index) in problem.problemIntRow" :key="index">
                      <div class="text" id="problemIntBody">
                        {{ index === problem.problemIntRow.length - 1 ?item : item + '。'}}
                      </div>
                    </div>
                    <span class="headline">数据范围</span>
                    <div v-for="(item,index) in problem.problemDataRow" :key="index">
                      <div class="text" id="problemDataBody">
                        {{ index === problem.problemDataRow.length - 1 ?item : item + ','}}
                      </div>
                    </div>
                    <span class="headline">输入样例</span>
                    <div style="width: 100%;height: auto;background-color: #f3f0f0;margin-left: -70px;text-align: left;border-radius: 5px 5px 0 0">
                      <div v-for="(item,index) in problem.problemCaIntRow" :key="index" style="margin-left: 75px">
                        <div class="text" id="problemCaIntRowBody">
                          {{ item }}
                        </div>
                      </div>
                    </div>
                    <span class="headline">输出样例</span>
                    <div style="width: 100%;height: auto;background-color: #f3f0f0;margin-left: -70px;text-align: left;border-radius: 5px 5px 0 0">
                      <div v-for="(item,index) in problem.problemCaOutRow" :key="index" style="margin-left: 75px">
                        <div class="text" id="problemCaOutRowBody">
                          {{ index === problem.problemCaOutRow.length - 1 ?item : item + ','}}
                        </div>
                      </div>
                    </div>


                  </div>


                  <q-card style="width: 250px" class="problemPty">
                    <div v-for="(item,index) in problem.problemPty">
                      <div :style="'padding-bottom: 10px;' + (index % 2 == 0 ?'background-color: #FAF8F8FF':'')">
                        <q-card-actions class="child_items">
                          <label class="problemPtyChildren" style="margin-right: 15px;opacity: 0.5">{{item}}</label>
                          <el-tag v-if="index === 0" :type="problem.difficulty === 1?'success': item.difficulty === 2?'warning':'danger'" class="problemDiy"
                                  style="margin-right: -8px">
                            {{ problem.difficulty === 1?'简单': problem.difficulty === 2?'中等':'困难'}}</el-tag>
                          <label v-if="index === 1" style="margin-right: 15px;opacity: 0.5">{{problem.timeLimit +'s'+ ' / ' +problem.memoryLimit+'MB'}}</label>
                          <label v-if="index === 2" style="margin-right: 15px;opacity: 0.5">{{problem.timeLimit +'s'+ ' / ' +problem.memoryLimit+'MB'}}</label>
                          <label v-if="index === 3" style="margin-right: 15px;opacity: 0.5">{{problem.timeLimit +'s'+ ' / ' +problem.memoryLimit+'MB'}}</label>
                          <!--              <label class="title_difficulty">{{ item.difficulty === 1?'简单': item.difficulty === 2?'中等':'困难'}}</label>-->
                        </q-card-actions>
                      </div>
                      <q-separator size="2px" v-if="index !== problem.problemPty.length - 1"/>
                    </div>
                  </q-card>
                </div>
                <q-separator size="1px" style="margin-top: 50px;width: 840px;margin-left: -10px"/>
                <div class="editor">
                  <editor ref="myQuillEditor"
                          theme="snow"
                          v-model="editor.content"
                          :options="editor.editorOption"
                          style="height: 250px"
                  />
                </div>
              </q-tab-panel>

              <q-tab-panel name="submission" class="bg-orange-1">
                <div class="text-h6">Alarms</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
import { useRoute } from "vue-router";
import bcg from '@/components/backgroud.vue'
import {getProblem} from '@/api/problem'
import {reactive, ref} from "vue";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
export default {

  components: {brain, bcg, editor : QuillEditor},
  setup() {
    const problem = reactive({
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
    const editor = reactive({
      content: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{'size': ['small', false, 'large', 'huge']}],
            [{'font': []}],
            [{'align': []}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'header': 1}, {'header': 2}],
            ['image'],
            [{'direction': 'rtl' }],    //文字编辑方向，从左到右还是从右到左
            [{ 'color': [] }, { 'background': [] }]
          ]
        },
        placeholder: '请输入内容...'
      }
    })

    function getProblemDetails(id) {
      getProblem(id).then((res) => {
        console.log("res为:{}",res)
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
        problem.problemRow = res.problem.split('。')
        problem.problemOutRow = res.outputDescribe.split('。')
        problem.problemIntRow = res.inputDescribe.split('。')
        problem.problemDataRow = res.dataRange.split(',')
        problem.problemCaIntRow = JSON.parse(res.sample).in.split(',')
        problem.problemCaOutRow = JSON.parse(res.sample).out.split(',')
      })
    }

    return{
      problem,
      getProblemDetails,
      tab: ref(""),
      editor
    }
  },
created() {
  console.log("该问题的id为:"+useRoute().params.id)
  this.getProblemDetails(useRoute().params.id)
}
}
</script>

<style scoped>
.editor{
  padding-top: 20px;
  height: auto;
}

.headline{
  font-weight: bold;
  text-align: left;
  margin-left: -510px;
  line-height: 50px;
}
.panel{
  width: 600px;
  height: 500px;
}
.my_card{
  width: auto;
  height: auto;
  padding: 0;

  margin-top: -650px;
  margin-left: auto;
  margin-right: auto;
  overflow: visible;

}
.problemPty{
  position: absolute;
  right: 20px;
  top: 10px;
  width: auto;
}
.problemAll{
  display: inline-block;
  width: auto;
}
.text-h4{
  padding-top: 30px;
  padding-bottom: 10px;
  text-align: left;
  margin-left: 20px;
}
#problemBody,#problemOutBody,#problemIntBody,#problemDataBody,#problemCaOutRowBody,#problemCaIntRowBody{
  width: 500px;
  height: auto;
  text-align: left;
  line-height: 30px;
  margin-left: -70px;
}
.q-gutter-y-md{
  height: auto;
  width: auto;
}
</style>
