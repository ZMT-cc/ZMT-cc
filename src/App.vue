<template>
    <a-config-provider :locale="zhCN">
        <div class="app_warp">
            <router-view />
        </div>
    </a-config-provider>
</template>

<script lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { defineComponent } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale(zhCN.locale)
export default defineComponent({
    setup() {
        return {
            zhCN
        }
    }
})
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    user-select: none;
}
body {
    background: #ccc !important;
}
.app_warp {
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    border-radius: 20px;
    overflow: hidden;
    box-sizing: border-box;
}
* {
    box-sizing: border-box;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
    // background: rgba(255, 0, 0, 0.4);
    // display: none;
}
</style>
