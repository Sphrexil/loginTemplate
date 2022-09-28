import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import { Quasar } from 'quasar'
import quasarUserOptions from '../quasar-user-options'
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App).use(Quasar, quasarUserOptions);
app.config.globalProperties.emitter = mitt()

app.use(router);
app.use(elementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app');

