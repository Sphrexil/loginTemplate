<template>
  <transition name="fade">
    <!--登录-->
    <div class="login-box" v-if="mod.LoginFlag" key="login">
      <h4>OnlineJudge登录界面</h4>
      <form>
        <div class="user-box">
          <input type="text" name="" required="" v-model="user.userName" @focus="animate('focusUserName')">
          <label :style="mod.userNameColor">{{ mod.userNameLabel }}</label>
        </div>
        <div class="user-box">
          <input type="password" name="" required="" v-model="user.password" @focus="animate('focusPassword')">
          <label :style="mod.passwordColor">{{ mod.passwordLabel }}</label>
        </div>
        <q-btn class="forget" @click="toForgetPwd">忘记密码?</q-btn>
        <q-btn class="register" @click="toRegister">注册</q-btn>
        <q-btn @click="commit('loginValidate')">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </q-btn>
      </form>
    </div>
    <!--忘记密码-->
    <div class="login-box" v-else-if="mod.forgetPwdFlag" key="forget">
      <h4>邮箱验证找回</h4>
      <form>
        <div class="user-box">
          <input type="text" name="" required="" v-model="user.email" @focus="animate('focusEmail')"
                 ref="forgetPwd" :placeholder="mod.forgetPwdMsg" @blur="blur">
          <label :style="mod.emailColor">{{ mod.emailLabel }}</label>
        </div>
        <div class="user-box">
          <input type="text" name="" required="" v-model="user.verificationCode"
                 @focus="animate('focusVerificationCode')"
                 ref="forgetPwdCode">
          <label :style="mod.verificationCodeColor">{{ mod.verificationCodeLabel }}</label>
          <q-btn :style="mod.forgetInterval" @click="sendMailTo('forget')">{{ mod.sendMailForgetMsg }}</q-btn>
        </div>
        <q-btn class="register-commit" @click="commit('forget')">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </q-btn>
        <q-btn @click="toLogin">
          取消
        </q-btn>
      </form>
    </div>
    <!--登录邮箱验证-->
    <div class="login-box" v-else-if="mod.loginValidateFlag" key="login-validate">
      <h4>登录验证</h4>
      <form>
        <div class="user-box">
          <input type="text" name="" required="" v-model="user.verificationCode" ref="loginValidate">
          <label :style="mod.verificationCodeColor">{{ mod.verificationCodeLabel }}</label>
          <q-btn @click="sendMailTo('loginValidate', mod.userEmail)" :style="mod.loginValidateInterval">{{
              mod.sendMailLoginValidateMsg
            }}
          </q-btn>
        </div>
        <q-btn class="register-commit" @click="commit('login')">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          验证
        </q-btn>
        <q-btn @click="toLogin">
          取消
        </q-btn>
      </form>
    </div>
    <!--注册-->
    <div class="login-box" v-else key="register">
      <h4>OnlineJudge注册界面</h4>
      <form>
        <div class="user-box">
          <input type="text" name="" required="" v-model="user.userName" @focus="animate('focusUserName')">
          <label :style="mod.userNameColor">{{ mod.userNameLabel }}</label>
        </div>
        <div class="user-box">
          <input type="password" name="" required="" v-model="user.password" @focus="animate('focusPassword')">
          <label :style="mod.passwordColor">{{ mod.passwordLabel }}</label>
        </div>
        <div class="user-box">
          <input type="text" name="" required="" v-model="user.email" @focus="animate('focusEmail')">
          <label :style="mod.emailColor">{{ mod.emailLabel }}</label>
        </div>
        <div class="user-box">
          <input type="text" name="" required="" v-model="user.verificationCode"
                 @focus="animate('focusVerificationCode')"
                 ref="registerCode">
          <label :style="mod.verificationCodeColor">{{ mod.verificationCodeLabel }}</label>
          <q-btn @click="sendMailTo('register')" :style="mod.registerInterval">{{ mod.sendMailRegisterMsg }}</q-btn>
        </div>
        <q-btn class="register-commit" @click="commit('register')">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          提交
        </q-btn>
        <q-btn @click="toLogin">
          取消
        </q-btn>
      </form>
    </div>
  </transition>

</template>

<script>
import {ref, reactive, watch, nextTick} from 'vue';
import {userRegister, sendMail, userLogin, userLoginValidate} from '@/api/user';
import {ElMessage} from 'element-plus'
import {setToken} from '@/utils/auth.js'
import {useRouter} from "vue-router";

export default {
  setup() {
    let userNameReg = /^[A-Za-z]{6,10}$/;
    let passwordReg = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,16}$/
    let emailRef = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
    const router = useRouter();
    let user = reactive({
      userName: '',
      password: '',
      email: '',
      verificationCode: ''
    })
    let mod = reactive({
      // 组件可视
      LoginFlag: true,
      forgetPwdFlag: false,
      loginValidateFlag: false,
      // 各组件内容
      sendMailForgetMsg: '发送验证码',
      sendMailRegisterMsg: '发送验证码',
      sendMailLoginValidateMsg: '再次发送',
      userNameLabel: 'Username',
      passwordLabel: 'Password',
      emailLabel: 'Email',
      verificationCodeLabel: '验证码',
      // 组件变色
      userNameColor: '',
      passwordColor: '',
      emailColor: '',
      verificationCodeColor: '',
      // 验证码间隔
      forgetInterval: '',
      forgetWait: 0,
      registerWait: 0,
      registerInterval: '',
      loginValidateWait: 0,
      loginValidateInterval: '',
      // 组件默认消息
      forgetPwdMsg: '',
      userId: '',
      userEmail: '',
      localExist: false
    })
    watch(() => user.verificationCode, (newValue, oldValue) => {
      if (newValue.length > 4) {
        user.verificationCode = oldValue;
      }
      if (newValue.charCodeAt(newValue.length - 1) <= 47 || newValue.charCodeAt(newValue.length - 1) >= 58) {
        console.log("newValue" + newValue + "," + "oldValue" + oldValue + "," + "最新一个字符:" + newValue.charCodeAt(newValue.length - 1))
        user.verificationCode = oldValue;
      }
    })

    // 提交
    function commit(msg) {
      if (user.userName === '') {
        mod.userNameLabel = '账号不能为空！！'
        mod.userNameColor = 'color: #F1082CFF'
      } else if (!userNameReg.test(user.userName)) {
        mod.userNameLabel = '账号必须是字母且在6-10个字符之间！！'
        mod.userNameColor = 'color: #F1082CFF'
      }

      if (user.password === '') {
        mod.passwordLabel = '密码不能为空！！'
        mod.passwordColor = 'color: #F1082CFF'
      } else if (!passwordReg.test(user.password)) {
        mod.passwordLabel = '密码必须至少为字母加数字且在6-16个字符之间！！'
        mod.passwordColor = 'color: #F1082CFF'
      }
      if (msg === 'loginValidate' && user.userName !== '' && user.password !== ''
          && userNameReg.test(user.userName) && passwordReg.test(user.password)) {
        var flag = null
        if (!localStorage.getItem("userInfo")) {
          flag = mod.localExist
        }
        userLogin(user.userName, user.password, null,flag).then((res) => {

          if (res === null) {
            return;
          }
          toLoginValidate()
          sendMailTo('loginValidate', res.mail)
          console.log("id:{}", res.id)
          mod.userId = res.id
          mod.userEmail = res.mail
        })

        if (validate.value !== null) {
          clearTimeout(validate)
        }
        // sendMailTo('loginValidate')
      }
      if (msg === 'register') {
        if (!testEmail()) return;
        if (user.verificationCode === '') {
          mod.verificationCodeLabel = '验证码不能为空！！'
          mod.verificationCodeColor = 'color: #F1082CFF'
        }
        if (user.userName !== '' && user.password !== ''
            && userNameReg.test(user.userName) && passwordReg.test(user.password)
            && user.email !== '' && emailRef.test(user.email) && user.verificationCode !== '') {

          userRegister({
            userName: user.userName,
            nickName: user.userName, password: user.password, email: user.email,
            code: user.verificationCode
          }).then((res) => {
            console.log(res)
            ElMessage.success('注册成功')
            toLogin()
          })
        }
      }
      if (msg === 'forget') {
        if (user.verificationCode === '') {
          mod.verificationCodeLabel = '验证码不能为空！！'
          mod.verificationCodeColor = 'color: #F1082CFF'
          return;
        }
      }
      if (msg === 'login') {
        if (user.verificationCode === '') {
          mod.verificationCodeLabel = '验证码不能为空！！'
          mod.verificationCodeColor = 'color: #F1082CFF'
          return;
        }
        console.log("userId:" + mod.userId)
        userLoginValidate(user.verificationCode, mod.userId).then((res) => {
          console.log(res)
          setToken(res.token)
          ElMessage.success('登陆成功')
          console.log(res.userInfo)
          localStorage.setItem("userInfo", JSON.stringify(res.userInfo))
          router.push({path: localStorage.getItem('logUrl')?localStorage.getItem('logUrl'):'/'});
          console.log("登录结果:{}", res)
        })
      }
    }

    // 邮件发送
    const forgetPwdCode = ref(null)
    const registerCode = ref(null)

    function sendMailTo(msg, mail) {
      if (msg === 'register') {
        if (!testEmail()) {
          return;
        }
        nextTick(() => {
          registerCode.value.focus()
        })
        let reg = /\%40/;
        let result = user.email.replace(reg, '@');
        sendMail(result)
        mod.registerWait = 60
        setRegisterTime()
      } else if (msg === 'loginValidate') {
        mod.loginValidateWait = 60
        var str = mail
        for (var i = 2; i < mail.length - 8; i++) {
          str = replaceStr(str, i, 'x')
        }
        sendMail(mail).catch((e) => {
        })
        setLoginValidateTime(str)
      } else {
        if (!testEmail()) {
          return;
        }
        nextTick(() => {
          forgetPwdCode.value.focus()
        })
        mod.forgetWait = 60
        setForgetTime()
      }
    }

    function replaceStr(str, index, char) {
      return str.substring(0, index) + char + str.substring(index + 1);
    }

    function testEmail() {
      if (user.email === '') {
        mod.emailLabel = '邮箱不能为空！！'
        mod.emailColor = 'color: #F1082CFF'
        return false;
      } else if (!emailRef.test(user.email)) {
        mod.emailLabel = '邮箱格式错误！！'
        mod.emailColor = 'color: #F1082CFF'
        return false;
      }
      return true
    }

    // 验证码时间限制
    //#region
    function setForgetTime() {
      if (mod.forgetWait === 0) {
        mod.forgetInterval = ''
        mod.forgetWait = 60;
        mod.sendMailForgetMsg = '发送验证码'
      } else {
        mod.forgetInterval = 'pointer-events: none;'
        mod.sendMailForgetMsg = '重新发送' + mod.forgetWait + 's'
        mod.forgetWait--;
        setTimeout(function () {
          setForgetTime()
        }, 1000)
      }
    }

    function setRegisterTime() {
      if (mod.registerWait === 0) {
        mod.registerInterval = ''
        mod.registerWait = 60;
        mod.sendMailRegisterMsg = '发送验证码'
      } else {
        mod.registerInterval = 'pointer-events: none;'
        mod.sendMailRegisterMsg = '重新发送' + mod.registerWait + 's'
        mod.registerWait--;
        setTimeout(function () {
          setRegisterTime()
        }, 1000)
      }
    }

    let validate = ref(null)

    function setLoginValidateTime(str) {
      if (mod.loginValidateWait === 0) {
        mod.loginValidateInterval = ''
        mod.loginValidateWait = 60;
        mod.sendMailLoginValidateMsg = '发送验证码'
      } else {
        mod.loginValidateInterval = 'pointer-events: none;'
        mod.sendMailLoginValidateMsg = '已发送至密保邮箱' + str + "  " + mod.loginValidateWait + 's'
        mod.loginValidateWait--;

        validate = setTimeout(function () {
          setLoginValidateTime(str)
        }, 1000)
      }
    }

//#endregion

    // 组件的获焦与失焦
    //#region
    function animate(msg) {
      if (msg === 'focusUserName') {
        cleanUserName()
      } else if (msg === 'focusPassword') {
        cleanPassword()
      } else if (msg === 'focusEmail') {
        cleanEmail()
      } else if (msg === 'focusVerificationCode') {
        cleanVerificationCode()
      }
    }

    function blur() {
      mod.forgetPwdMsg = ''
    }

//#endregion

    // 登录注册找回之间的切换
    //#region
    function toRegister() {
      mod.LoginFlag = false
      mod.forgetPwdFlag = false
      mod.loginValidateFlag = false
      cleanUserName()
      cleanPassword()
      cleanAll()
    }

    function toLogin() {
      mod.forgetPwdFlag = false
      mod.loginValidateFlag = false
      mod.LoginFlag = true
      cleanUserName()
      cleanPassword()
      cleanEmail()
      cleanVerificationCode()
      cleanAll()
    }

    const forgetPwd = ref(null)

    function toForgetPwd() {
      mod.forgetPwdMsg = '请输入绑定的邮箱'
      mod.LoginFlag = false
      mod.loginValidateFlag = false
      mod.forgetPwdFlag = true
      nextTick(() => {
        forgetPwd.value.focus()
      })
    }

    // let that = this
    const loginValidate = ref(null)

    function toLoginValidate() {
      mod.LoginFlag = false
      mod.forgetPwdFlag = false
      mod.loginValidateFlag = true
      cleanAll()
      cleanVerificationCode()
      nextTick(() => {
        loginValidate.value.focus()
      })
      // that.$nextTick(() => {this.$refs.loginValidate.focus()})
    }

//#endregion

    // 组件间切换的数据还原
    //#region
    function cleanAll() {
      user.verificationCode = ''
      user.userName = ''
      user.password = ''
      user.email = ''
    }

    function cleanUserName() {
      mod.userNameLabel = 'Username'
      mod.userNameColor = ''
    }

    function cleanPassword() {
      mod.passwordLabel = 'Password'
      mod.passwordColor = ''
    }

    function cleanEmail() {
      mod.emailLabel = 'Email'
      mod.emailColor = ''
    }

    function cleanVerificationCode() {
      mod.verificationCodeLabel = '验证码'
      mod.verificationCodeColor = ''
    }

//#endregion
    return {
      toRegister,
      animate,
      blur,
      user,
      mod,
      toLogin,
      commit,
      toForgetPwd,
      sendMailTo,
      loginValidate,
      forgetPwd,
      forgetPwdCode,
      registerCode
    }
  }
}

</script>

<style scoped>
.register-commit {
  margin-right: 50px;
}

/** 动画进行时的class **/
.fade-enter-active {
  transition: opacity .5s;
}

.fade-enter {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity .5s;
}

.fade-leave-to {
  opacity: 0;
}

.forget {
  margin-right: 124px;
  margin-left: -15px;
}

.register {
  margin-right: -17px;
}

html {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, .5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
  border-radius: 10px;
}

.login-box h4 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form button {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}

.login-box button:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
  0 0 25px #03e9f4,
  0 0 50px #03e9f4,
  0 0 100px #03e9f4;
}

.login-box button span {
  position: absolute;
  display: block;
}

.login-box button span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 100%;
  }
}

.login-box button span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%, 100% {
    top: 100%;
  }
}

.login-box button span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%, 100% {
    right: 100%;
  }
}

.login-box button span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%, 100% {
    bottom: 100%;
  }
}

</style>
