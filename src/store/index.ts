// @ts-ignore
import Vuex from 'vuex'
// import * as getters from './getters.js'
import { createApp } from 'vue'
import App from '@/App.vue'
const app = createApp(App);
app.use(Vuex)

/** 状态定义 */
export const state = {
    loading: false,
    themeObj: 0,//主题
    keywords:'',//关键词
    baseURL:'http://localhost:11000',
    problemBaseURL: 'http://localhost:9000'
}

export default new Vuex.Store({
    state,
})
