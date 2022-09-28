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
        <div class="q-gutter-y-md" style="width: 900px;height: auto">
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

            <q-tab-panels v-model="tab" animated class="bg-white text-center" style="width: auto;height: auto">
              <q-tab-panel name="problemDetail" class="panel">
              </q-tab-panel>
              <q-tab-panel name="submission" class="bg-orange-1">
              </q-tab-panel>
            </q-tab-panels>

            <div class="problemAll">
<!--              <div>-->
<!--                <div v-for="(item,index) in problem.problemRow" :key="index">-->
<!--                  <div class="text" id="problemBody">-->
<!--                    <div class="article-content markdown-body" v-html="index === problem.problemRow.length - 1 ?item : item + '。'"></div>-->
<!--&lt;!&ndash;                    {{ index === problem.problemRow.length - 1 ?item : item + '。'}}&ndash;&gt;-->
<!--                  </div>-->
<!--                </div>-->

<!--                <span class="headline">输入格式</span>-->

<!--                <div v-for="(item,index) in problem.problemOutRow" :key="index">-->
<!--                  <div class="text" id="problemOutBody">-->
<!--                    {{ index === problem.problemOutRow.length - 1 ?item : item + '。'}}-->
<!--                  </div>-->
<!--                </div>-->
<!--                <span class="headline">输出格式</span>-->
<!--                <div v-for="(item,index) in problem.problemIntRow" :key="index">-->
<!--                  <div class="text" id="problemIntBody">-->
<!--                    {{ index === problem.problemIntRow.length - 1 ?item : item + '。'}}-->
<!--                  </div>-->
<!--                </div>-->
<!--                <span class="headline">数据范围</span>-->
<!--                <div v-for="(item,index) in problem.problemDataRow" :key="index">-->
<!--                  <div class="text" id="problemDataBody">-->
<!--                    {{ index === problem.problemDataRow.length - 1 ?item : item + ','}}-->
<!--                  </div>-->
<!--                </div>-->
<!--                <span class="headline">输入样例</span>-->
<!--                <div style="width: 100%;height: auto;background-color: #f3f0f0;margin-left: -70px;text-align: left;border-radius: 5px 5px 0 0">-->
<!--                  <div v-for="(item,index) in problem.problemCaIntRow" :key="index" style="margin-left: 75px">-->
<!--                    <div class="text" id="problemCaIntRowBody">-->
<!--                      {{ item }}-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <span class="headline">输出样例</span>-->
<!--                <div style="width: 100%;height: auto;background-color: #f3f0f0;margin-left: -70px;text-align: left;border-radius: 5px 5px 0 0">-->
<!--                  <div v-for="(item,index) in problem.problemCaOutRow" :key="index" style="margin-left: 75px">-->
<!--                    <div class="text" id="problemCaOutRowBody">-->
<!--                      {{ index === problem.problemCaOutRow.length - 1 ?item : item + ','}}-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
              <div class="article-content markdown-body" v-html="problem.problem" style="text-align: left;"></div>




              <q-card style="width: auto" class="problemPty">
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

            <q-separator size="1px" style="margin-top: 50px;width: 900px;"/>
            <q-separator size="0.7px" color="#e5dbdb"/>
            <div style="background-color: #f3f0f0;height: 50px">
              <q-card-section style="display: inline-block">
                <q-select outlined v-model="editor.content"
                          :options="editor.avaLanguage"
                          :display-value="editor.content"
                          class="language"
                          dense
                          bg-color="white"
                          options-dense
                />
                <el-button link class="chanllenge" ref="chanllenge" :onmousemove="colorChangeIn"
                           :onmouseout="colorChangeOut" :style="type">挑战模式</el-button>
                <q-btn round color="#f3f0f0" :icon="cleanIcon" class="clean" unelevated text-color="grey-9" @click="clearValue(1)"/>
                <q-btn round color="#f3f0f0" icon="settings" class="setting" unelevated text-color="grey-9" @click="editorSetting"/>
                <!--编辑器选项对话框-->
                <q-dialog v-model="editor.settings">
                  <q-card style="height: 450px;">
                    <q-card-section class="row items-center q-pb-none">
                      <div class="text-h6" style="margin-top: -15px">代码编辑器设置</div>
                      <q-space />
                      <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>
                    <q-separator size="0.1px"/>


                    <q-card-section>
                      <div v-for="(item,index) in editor.settingOptions">

                        <div style="padding-bottom: 10px">
                          <q-card-actions class="child_items">
                            <div style="width: 500px">
                              <div style="width: 100%">
                                <label class="problemPtyChildren" style="margin-right: 15px;font-size: 120%">{{item.title}}</label>
                              </div>
                              <div style="width: 330px;opacity: 0.7">
                                <label class="problemPtyChildren" style="margin-right: 15px;font-size: 10%">{{item.explain}}</label>
                              </div>
                            </div>
                          </q-card-actions>
                        </div>
                        <q-separator/>
                      </div>

                      <q-select
                          outlined
                          v-model="editor.settingOptions[0].value"
                          :options="editor.settingOptions[0].options"
                          :display-value="editor.settingOptions[0].value"
                          dense
                          options-dense
                          style="width: 150px;position: absolute;right: 10px;top: 25px;"
                      />
                      <q-select
                          outlined
                          v-model="editor.settingOptions[1].value"
                          :options="editor.settingOptions[1].options"
                          :display-value="editor.settingOptions[1].value"
                          dense
                          options-dense
                          style="width: 150px;position: absolute;right: 10px;top: 125px;"
                      />

                      <q-select
                          outlined
                          v-model="editor.settingOptions[2].value"
                          :options="editor.settingOptions[2].options"
                          :display-value="editor.settingOptions[2].value"
                          dense
                          options-dense
                          style="width: 150px;position: absolute;right: 10px;top: 225px;"
                      />

                      <q-select
                          outlined
                          v-model="editor.settingOptions[3].value"
                          :options="editor.settingOptions[3].options"
                          :display-value="editor.settingOptions[3].value"
                          dense
                          options-dense
                          style="width: 150px;position: absolute;right: 10px;top: 295px;"
                      />

                      <q-btn color="primary" size="sm" style="width: 56px;position: absolute;right: 10px;bottom: -20px;font-size: 8px"
                      @click="updateEditorSetting" v-close-popup>确定</q-btn>
                    </q-card-section>
                  </q-card>
                </q-dialog>
                <!--编辑器选项对话框-->

              </q-card-section>
            </div>
            <q-separator size="1px" />
            <q-separator size="0.7px" color="#e5dbdb"/>
            <div style="min-height: 300px;width: auto" >
              <div>
                <ace-editor
                    ref="addcodeform"
                    v-model:value="cmadd.value"
                    v-model:id="cmadd.id"
                    v-model:language="cmadd.language"
                    v-model:theme="cmadd.theme"
                    v-model:readonly="cmadd.readonly"
                    @update:value="cmadd.value = $event"
                    @update:language="cmadd.language = $event"
                />
                <q-card-actions align="right" style="margin-top: -500px">
                  <q-btn  rounded style="width: 130px;margin-right: 20px;"  outline>
                    <span class="material-icons" style="padding-right: 15px;font-size: large;">
                    play_circle
                    </span>
                    调试代码</q-btn>
                  <q-btn rounded style="width: 130px;margin-right: 20px;background-color: #13af13" outline>
                    <div style="background-color: #5CB85C;position: absolute;height: 100%;width: 100%;border-radius: 18px;">
                      <div style="margin-top: 5px;color: white">
                        <span class="material-icons" style="padding-right: 15px;font-size: large;" >
                          cloud_upload
                        </span>
                        提交答案
                      </div>
                    </div>
                  </q-btn>
                </q-card-actions>
<!--                <div class="ace-toolbar">-->
<!--                  <button v-on:click="codeComplete">代码完成</button>-->
<!--                  <button v-on:click="cancelCodeComplete">取消代码完成</button>-->
<!--                </div>-->
<!--                <div class="ace-toolbar">-->
<!--                  <button v-on:click="fillValue">填充值</button>-->
<!--                  <button v-on:click="clearValue">清空值</button>-->
<!--                </div>-->
<!--                <div class="ace-toolbar">-->
<!--                  <button v-on:click="getSelectText">获取选中文本</button>-->
<!--                  <button v-on:click="insert">光标处插入hello</button>-->
<!--                  <button v-on:click="getLineNum">获取总行数</button>-->
<!--                  <button v-on:click="getLineAndRow">获取光标所在行与列</button>-->
<!--                  <button v-on:click="gotoLine">光标跳转到1行1列</button>-->
<!--                </div>-->
<!--                <div class="ace-toolbar">-->
<!--                  <button v-on:click="setReadOnly(true)">编辑器只读</button>-->
<!--                  <button v-on:click="setReadOnly(false)">编辑器可编辑</button>-->
<!--                </div>-->
<!--                <div class="ace-toolbar">-->
<!--                  <button v-on:click="openSearchBox">打开编辑器搜素框</button>-->
<!--                  <button v-on:click="openReplaceBox">打开编辑器替换框</button>-->
<!--                </div>-->
<!--                <div class="ace-toolbar">-->
<!--                  <button v-on:click="updateEditorLanguage('ace/mode/json5')">更改编辑器语言：json</button>-->
<!--                  <button v-on:click="updateEditorLanguage('ace/mode/xml')">更改编辑器语言：xml</button>-->
<!--                  <button v-on:click="updateEditorLanguage('ace/mode/javascript')">更改编辑器语言：javascript</button>-->
<!--                </div>-->
<!--                <div class="ace-toolbar">-->
<!--                  <button v-on:click="updateEditorTheme('ace/theme/kuroir')">更改编辑器主题：kuroir</button>-->
<!--                  <button v-on:click="updateEditorTheme('ace/theme/one_dark')">更改编辑器主题：one_dark</button>-->
<!--                  <button v-on:click="updateEditorTheme('ace/theme/github')">更改编辑器主题：github</button>-->
<!--                </div>-->
              </div>
            </div>
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
import {getCurrentInstance, onMounted, reactive, ref, watch} from "vue";
//ace-editor
import aceEditor from "./AceEditor.vue";
// ace 检索框
import 'ace-builds/src-min-noconflict/ext-searchbox'
import { VMarkdownView } from 'vue3-markdown'
import { mavonEditor } from 'mavon-editor'
import {toHTML} from '@/utils/markdown.ts'
import 'vue3-markdown/dist/style.css'

export default {

  components: {brain, bcg, aceEditor},
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
    const type = ref('')
    const cleanIcon = ref('cached')
    const editor = reactive({
      avaLanguage : ['Java','C++','C','Python','Go','JavaScript'],
      content: 'C++',
      text: '',
      settings: ref(false),
      settingOptions: [
        {
          title: '界面风格',
          explain: '对白色界面感到厌倦了吗？可以尝试其他的背景和代码高亮风格。',
          value: 'github',
          options: [
             'one_dark',
             'github',
             'chaos',
             'eclipse',
             'sqlserver',
             'terminal'
          ]
        },
        {
          title: '编辑类型',
          explain: '更喜欢Vim或者Emacs的输入方式吗？我们也为你提供了这些选项。',
          value: 'Standard',
          options: [
             'Standard',
             'Vim',
             'Emacs',
          ]
        },
        {
          title: '缩进长度',
          explain: '选择代码缩进的长度。默认是4个空格。',
          value: '2个空格',
          options: [
             '2个空格',
             '4个空格',
             '8个空格',
          ]
        },
        {
          title: '代码补全',
          explain: '写代码疲惫了吗？让我们来帮你一把。唤醒词列表在这里。',
          value: '无补全',
          options: [
             '无补全',
             '单词级补全',
             '模板级补全',
          ]
        }
      ]
    })
    const cmadd = reactive({
      value: "",
      id: 0,
      readonly: false,
      language: 'java',
      theme: 'eclipse'
    });

    watch(() => editor.settingOptions[0].value, (newValue, oldValue) => {
      if (newValue === null) {
        newValue = oldValue
        editor.settingOptions[0].value = oldValue
      }
    })
    watch(() => editor.settingOptions[1].value, (newValue, oldValue) => {
      if (newValue === null) {
        newValue = oldValue
        editor.settingOptions[1].value = oldValue
      }
    })
    watch(() => editor.settingOptions[2].value, (newValue, oldValue) => {
      if (newValue === null) {
        newValue = oldValue
        editor.settingOptions[2].value = oldValue
      }
    })
    watch(() => editor.settingOptions[3].value, (newValue, oldValue) => {
      if (newValue === null) {
        newValue = oldValue
        editor.settingOptions[3].value = oldValue
      }
    })

    watch(() => editor.content, (newValue, oldValue) => {
      if (newValue === null) {
        newValue = 'C++'
        editor.content = 'C++'
      }

      cmadd.language = languageName(newValue)

      console.log(cmadd.language)
      localStorage.setItem("chooseLanguage",newValue)
    })

    function updateEditorSetting() {
      cmadd.theme = editor.settingOptions[0].value
      localStorage.setItem("editorTheme", cmadd.theme)
    }

    function colorChangeIn() {
        type.value = 'color:#3CB2D5'
    }
    function colorChangeOut() {
        type.value = ''
    }


    let wait = null
    function cleanCode(count) {
      if (count === 1 && wait !== null) {
        clearTimeout(wait)
      }
      if (count === 1) {
        cleanIcon.value = 'autorenew'
        count ++
      } else {
        cleanIcon.value = 'cached'
        clearTimeout(wait)
      }
      wait = setTimeout(function () {
        cleanCode(count)
      },300)
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
        const markdownIt = mavonEditor.getMarkdownIt()

        // problem.problem = markdownIt.render(res.problem)
        problem.problem = toHTML(res.problem)
        problem.problemRow = markdownIt.render(res.problem).split('。')
        problem.problemOutRow = markdownIt.render(res.outputDescribe).split('。')
        problem.problemIntRow = markdownIt.render(res.inputDescribe).split('。')
        problem.problemDataRow = markdownIt.render(res.dataRange).split(',')
        problem.problemCaIntRow = markdownIt.render(JSON.parse(res.sample).in).split(',')
        problem.problemCaOutRow = markdownIt.render(JSON.parse(res.sample).out).split(',')
      })
    }
    let testEditor = reactive(null)

    const ace = ref(null)
    onMounted(() => {
      // Ace.config.set("basePath", "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/");
      // //快速开始-demo
      // testEditor = Ace.edit(ace.value, {
      //   maxLines: 90, // 最大行数，超过会自动出现滚动条
      //   minLines: 24, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
      //   fontSize: 14, // 编辑器内字体大小
      //   theme: 'ace/theme/kuroir', // 默认设置的主题
      //   mode: 'ace/mode/java', // 默认设置的语言模式
      //   tabSize: 4,// 制表符设置为 4 个空格大小
      //   readOnly: false, //只读
      //   highlightActiveLine: true
      // });

      var name = localStorage.getItem('chooseLanguage')
      editor.content = name
      if (name) {
        name = languageName(name)
        // updateEditorLanguage('ace/mode/'+name)
      } else {
        name = languageName(editor.content)
        // updateEditorLanguage('ace/mode/'+name)
      }
      var theme = localStorage.getItem("editorTheme")
      editor.settingOptions[0].value = theme?theme:editor.settingOptions[0].value

console.log("5665656",name)
    })

    function editorSetting() {
        editor.settings = true
    }
    function codeComplete () {
      testEditor.setOptions({
        enableBasicAutocompletion: true, //启动基本自动完成
        enableLiveAutocompletion: true, //启动实时自动完成
      })
    }
   function cancelCodeComplete() {
      testEditor.setOptions({
        autoScrollEditorIntoView: false,
        copyWithEmptySelection: false,
      })
    }
  function fillValue() {
    testEditor.setValue("hello world", -1)
    }
    function clearValue (count) {
      if (count === 1 && wait !== null) {
        clearTimeout(wait)
      }
      if (count === 1) {
        cleanIcon.value = 'autorenew'
        count ++
      } else {
        cleanIcon.value = 'cached'
        clearTimeout(wait)
      }
      wait = setTimeout(function () {
        cleanCode(count)
      },300)
      // testEditor.setValue("")
      cmadd.value = ''
    }
    function getSelectText () {
      // let text = testEditor.getSelectedText()
      alert("选中文本为:" + text)
    }
    function insert () {
      // testEditor.insert("hello");
    }
    function getLineNum () {
      // let lineNum = testEditor.session.getLength();
      alert("总行数为:" + lineNum)
    }
    function getLineAndRow () {
      // let cursor = testEditor.selection.getCursor();
      alert("当前光标所在行列:" + JSON.stringify(cursor))
    }
    function gotoLine () {
      // testEditor.gotoLine(1, 1);
    }
    function setReadOnly (readOnly) {
      // testEditor.setReadOnly(readOnly)
    }
    function openSearchBox () {
      // testEditor.execCommand('find');
    }
    function openReplaceBox () {
      // testEditor.execCommand('replace');
    }
    function updateEditorLanguage (language) {
      console.log("666666"+language)
      // testEditor.setOption("mode", language);
    }
    function updateEditorTheme (theme) {
      // testEditor.setTheme(theme);
    }



    return{
      problem,
      editor,
      cmadd,
      getProblemDetails,
      colorChangeIn,
      colorChangeOut,
      editorSetting,
      updateEditorSetting,
      cleanCode,
      updateEditorLanguage,
      updateEditorTheme,
      openReplaceBox,
      openSearchBox,
      setReadOnly,
      gotoLine,
      getLineNum,
      getLineAndRow,
      insert,
      getSelectText,
      fillValue,
      codeComplete,
      clearValue,
      cancelCodeComplete,
      ace,
      tab: ref(""),
      type,
      cleanIcon,

    }
  },
created() {
  console.log("该问题的id为:"+useRoute().params.id)
  this.getProblemDetails(useRoute().params.id)
}
}
</script>

<style scoped>


.ace-editor {
  margin-bottom: 500px;
}
.ace-toolbar {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.ace-toolbar > button {
  margin-left: 20px;
}
.chanllenge{
  position: absolute;
  left: -420px;
  top: 16px;
}
.clean{
  position: absolute;
  right: -350px;
  top: 5px;
}
.setting{
  position: absolute;
  right: -400px;
  top: 5px;
}
.language{
  position: absolute;
  width: 200px;
  top: 5px;
  right: -290px;
}
.headline{
  font-weight: bold;
  text-align: left;
  margin-left: -510px;
  line-height: 50px;
}
.panel{
  width: 600px;
  height: auto;
}
.my_card{
  width: auto;
  height: auto;
  padding: 0;
  margin-top: -600px;
  margin-left: auto;
  margin-right: auto;
  overflow: visible;

}
.problemPty{
  position: absolute;
  right: 40px;
  top: 60px;
  width: auto;
}
.problemAll{
  display: inline-block;
  width: auto;
  margin-left: -300px;
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

</style>
