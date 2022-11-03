<template>
  <div ref="editorform" style="min-height: 300px;" class="ace-editor"></div>
</template>
<script>
import {watch, onMounted, onBeforeUnmount, ref, reactive} from "vue";
import ace from "ace-builds";

// 主题
import 'ace-builds/src-min-noconflict/theme-one_dark'
import 'ace-builds/src-min-noconflict/theme-github'
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-sqlserver";
import "ace-builds/src-noconflict/theme-terminal";


import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-emmet";

import "ace-builds/src-noconflict/keybinding-vscode";
import "ace-builds/src-noconflict/keybinding-emacs";
// 语言
import "ace-builds/src-noconflict/snippets/c_cpp";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/snippets/yaml";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/golang";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/mode-python";

// keyBinding
import "ace-builds/src-min-noconflict/keybinding-vim";
import "ace-builds/src-min-noconflict/keybinding-emacs";
import "ace-builds/src-min-noconflict/keybinding-sublime";
import "ace-builds/src-min-noconflict/keybinding-vscode";


export default {
  name: "CodeEditor",
  emits: ["update:value"],
  props: {
    id: {
      type: Number,
      default: 0,
    },
    // 外部传入的内容，用于实现双向绑定
    value: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    // 外部传入的语法类型
    language: {
      type: String,
      default: "c_cpp",
    },
    // 编辑器主题色
    theme: {
      type: String,
      default: "github",
    },
    keyBinding: {
      type: String,
      default: "vscode",
    },
    tabSize: {
      type: Number,
      default: 2,
    }
  },
  setup(props, { emit }) {
    let editor = null;
    const editorform = ref(null);
    let options = reactive({
      theme: "ace/theme/" + (props.theme ? props.theme : "github"),
      mode: "ace/mode/" + (props.language ? props.language : "c_cpp"),
      tabSize: 2,
      maxLines: 200,
      minLines: 25,
      showPrintMargin: false,
      fontSize: 14,
      readOnly: props.readonly ? props.readonly : false,
      keyboardHandler: "ace/keyboard/" + (props.keyBinding ? props.keyBinding : "vscode")
    })
    //切换语言
    //editor.getSession().setMode(modelPath)


    function initialize() {
      if (editor) {
        //实例销毁
        editor.destroy();
      }
      //初始化

      ace.config.set("basePath", "https://cdnjs.cloudflare.com/ajax/libs/ace/1.9.6/");
      var theme = localStorage.getItem("editorTheme")
      var keyBoard = localStorage.getItem('editorKeyBinding')
      var language = localStorage.getItem('LanguageNam')
      if (theme) {
        options.theme = "ace/theme/" + theme
      }
      if (keyBoard) {
        options.keyboardHandler = "ace/keyboard/" + keyBoard
      }
      if (language) {
        options.mode = "ace/mode/" + language
      }
      editor = ace.edit(editorform.value, options);
      console.log("propsLan:",options.mode)
      console.log("keybing:",editor.getKeyboardHandler())
      console.log("language:", props.language)
      //代码提示和自动补全
      editor.setOptions({
        enableSnippets: true,
        enableLiveAutocompletion: true,
        enableBasicAutocompletion: true,
      });
      // editor.setKeyboardHandler('ace/keyboard/vim')
      editor.getSession().setUseWrapMode(true);
      // 支持双向绑定
      editor.on("change", () => {
        if (emit) {
          emit("update:value", editor.getValue());
        }
      });
      //快捷键
      editor.commands.addCommand({
        name: 'formatter',
        bindKey: { win: 'Ctrl-Shift-F', mac: 'Command-Shift-F' },
        exec: () => emit('formatter', editor)
      })

      editor.setValue(props.value ? props.value : "");
    }
    watch(
        () => props.id,
        () => {
          console.log(options.mode)
          initialize();
        }
    );
    watch(() => props.language, (newValue,oldValue) => {
      options.mode = "ace/mode/" + newValue
      editor.getSession().setMode(options.mode)
      console.log("propsLan2222:",options.mode)
    })
    watch(() => props.theme, (newValue,oldValue) => {
      options.theme = "ace/theme/" + newValue
      editor.setTheme(options.theme)
      initialize()
    })
    watch(() => props.keyBinding, (newValue,oldValue) => {

      options.keyboardHandler =  "ace/keyboard/" + newValue
      editor.setKeyboardHandler(options.keyboardHandler)
      console.log("keybing:",editor.getKeyboardHandler())
    })
    watch(() => props.tabSize, (newValue,oldValue) => {
      options.tabSize =  newValue
      initialize()
      console.log("tabsize:",editor.getSession().getTabSize())
    })
    watch(
        () => props.value,
        (newProps) => {
          //解决光标移动问题
          const position = editor.getCursorPosition();
          editor.getSession().setValue(newProps);
          editor.clearSelection();
          editor.moveCursorToPosition(position);
        }
    );
    onMounted(() => {
      initialize();
    });
    onBeforeUnmount(() => {
      editor.destroy();
    });
    return {
      editorform,
    };
  },
};
</script>
<style lang="scss" scoped>
.ace-chaos .ace_meta.ace_tag{
  color:#53a7e6 !important;
}
.ace-chaos .ace_string{
  color:#c58854 !important;
}
.ace-chaos .ace_keyword{
  color:#e0e0e0 !important;
}
.ace-chaos .ace_constant.ace_numeric{
  color:#c5c454 !important;
}
</style>
