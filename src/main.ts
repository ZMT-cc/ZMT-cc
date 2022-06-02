import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugin/axios'
import VueAxios from 'vue-axios'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import 'ant-design-vue/dist/antd.dark.css'
createApp(App)
    .use(store)
    .use(router)
    .use(Antd)
    .use(VueAxios, axios)
    .mount('#app')
