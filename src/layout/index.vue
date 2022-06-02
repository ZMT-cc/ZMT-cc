<template>
    <a-layout class="layout">
        <a-layout>
            <a-layout-sider width="260" class="side_menu" v-model:collapsed="collapsed">
                <div class="side_back">
                </div>
                <div class="side_box">
                    <div class="side_menu_title">
                        <div class="img_box">
                            <img class="user_img" src="@/assets/daliu.png" alt="">
                        </div>
                        <span class="user_hello" v-show="!collapsed">晚上好 {{userInfo.realName}}</span>
                    </div>
                    <div>
                        <menu-item :collapsed="collapsed" />
                    </div>
                </div>

            </a-layout-sider>
            <a-layout>
                <div class="page_header">
                    <div class="collapsed_icon" @click="() => (collapsed = !collapsed)">
                        <menu-unfold-outlined v-if="collapsed" class="trigger" />
                        <menu-fold-outlined v-else class="trigger" />
                    </div>
                    <div class="header_box">
                        <notify-message />
                        <user-option />
                    </div>
                </div>
                <a-layout-content class="page_content">
                    <transition name="component-fade" mode="out-in">
                        <router-view />
                    </transition>
                </a-layout-content>
            </a-layout>
            <theme-setting @setTheme="setThemeHandle" :siderBackgroundColor="siderBackgroundColor" :siderBackgroundImg="siderBackgroundImg" />
        </a-layout>
    </a-layout>
</template>

<script lang="ts" >
import { defineComponent, ref } from 'vue'
import UserOption from '@/layout/components/userOption.vue'
import NotifyMessage from '@/layout/components/notifyMessage.vue'
import themeSetting from '@/layout/components/themeSetting.vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import MenuItem from './components/menuItem.vue'
import { useState } from '@/plugin/storeUtil/useState'
export default defineComponent({
    components: {
        MenuUnfoldOutlined,
        MenuFoldOutlined,
        UserOption,
        NotifyMessage,
        themeSetting,
        MenuItem
    },

    setup() {
        const userInfo = useState('userModel', 'userInfo')
        const dropDownVisible = ref<boolean>(false)
        const themeSettingVisible = ref<boolean>(false)
        const siderBackgroundColor = ref<string>('linear-gradient(180deg,#292929 0,#0e0e0e)')
        const siderBackgroundImg = ref<string>(`url(${require('@/assets/sidebar-1.jpg')})`)
        const dropDownVisibleHandle = (visible: boolean): void => {
            dropDownVisible.value = visible
        }

        const themeSettingVisibleHandle = (event: any): void => {
            event.preventDefault()
            event.stopPropagation()
            themeSettingVisible.value = !themeSettingVisible.value
        }

        const setThemeHandle = (themInfo: any) => {
            if (themInfo.color) {
                siderBackgroundColor.value = themInfo.color
            } else {
                siderBackgroundImg.value = themInfo.url
            }

            localStorage.setItem(
                'theme',
                JSON.stringify({ color: siderBackgroundColor.value, img: siderBackgroundImg.value })
            )
        }

        ;(() => {
            let themeInfo: any = localStorage.getItem('theme')
            if (themeInfo) {
                themeInfo = JSON.parse(themeInfo)
                if (themeInfo.color) {
                    siderBackgroundColor.value = themeInfo.color
                }
                if (themeInfo.img) {
                    siderBackgroundImg.value = themeInfo.img
                }
            }
        })()

        document.addEventListener('click', (): void => {
            themeSettingVisible.value = false
        })
        return {
            dropDownVisibleHandle,
            themeSettingVisibleHandle,
            setThemeHandle,
            userInfo,
            siderBackgroundColor,
            siderBackgroundImg,
            themeSettingVisible,
            dropDownVisible,
            selectedKeys1: ref<string[]>(['2']),
            selectedKeys2: ref<string[]>(['1']),
            collapsed: ref<boolean>(false),
            openKeys: ref<string[]>(['sub1'])
        }
    }
})
</script>

<style lang="scss" >
//如果使用scoped  该导致部分样式将失效
@import '@/assets/layout.scss';

.side_menu {
    background-image: v-bind(siderBackgroundImg);
    .side_back {
        background: v-bind(siderBackgroundColor);
    }
}
.component-fade-enter-active,
.component-fade-leave-active {
    animation: route_change_animation 0.3s;
}

.component-fade-enter-from,
.component-fade-leave-to {
    transition: opacity transform 0.5s;
    opacity: 0;
    transform: translateX(10%);
}

@keyframes route_change_animation {
    0% {
        transform: translateX(-10%);
        opacity: 0;
    }

    100% {
        opacity: 1;
        transform: translateX(0%);
    }
}
</style>
