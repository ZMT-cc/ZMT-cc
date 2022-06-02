<template>
    <div class="theme_setting" @click="themeSettingVisibleHandle">
        <setting-outlined class="setting_icon" />
        <div class="setting_dialog" v-if="themeSettingVisible" @click="preventHandle">
            <div class="setting_item_flex">
                <div class="setting_title">
                    背景图开关
                </div>
                <div class="setting_switch">
                    <a-switch v-model:checked="backgroundImageSwitch" checked-children="开" un-checked-children="关" @change="siderBackgroundImageSwitchHandle" />
                </div>
            </div>
            <div class="setting_item_flex">
                <div class="setting_title">
                    滤镜开关
                </div>
                <div class="setting_switch">
                    <a-switch v-model:checked="filterSwitch" checked-children="开" un-checked-children="关" @change="siderFilterSwitchHandle" />
                </div>
            </div>
            <div class="setting_item_flex">
                <div class="setting_title">
                    滤镜
                </div>
                <div class="setting_switch">
                    <span v-for="(item,index) in backgroundColorList" @click="$emit('setTheme',{color: item})" :class="{'color_select':true,'selected':siderBackgroundColor.includes(item)}" :style="`background:${item}`" :key="index"></span>
                </div>
            </div>
            <div class="select_img">
                <span class="setting_title">背景图</span>
                <div class="setting_item_flex ">
                    <img :class="{'sider_background_image':true,'selected':siderBackgroundImg.includes(item)} " v-for="(item,index)  in imageUrlList" @click="$emit('setTheme',{url: `url(${item})`})" :src="item" alt="" :key="index">
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" >
import { defineComponent, ref, watch } from 'vue'
import { SettingOutlined } from '@ant-design/icons-vue'
export default defineComponent({
    components: {
        SettingOutlined
    },
    props: ['siderBackgroundColor', 'siderBackgroundImg'],
    emits: ['setTheme'],
    setup(props: any, ctx: any) {
        const imageUrlList: string[] = [
            require('@/assets/sidebar-1.jpg'),
            require('@/assets/sidebar-3.jpg'),
            require('@/assets/sidebar-4.jpg'),
            require('@/assets/sidebar-5.jpg')
        ]

        const backgroundColorList: string[] = [
            'linear-gradient(180deg,#292929 0,#0e0e0e)',
            'linear-gradient(180deg,#23ccef 0,rgba(64,145,255,.7))',
            'linear-gradient(180deg,#87cb16 0,rgba(109,192,48,.7))',
            'linear-gradient(180deg,#447df7 0,rgba(83,60,225,.7))',
            'linear-gradient(180deg,#ffa534 0,rgba(255,82,33,.7))',
            'linear-gradient(180deg,#fb404b 0,rgba(187,5,2,.7))',
            'linear-gradient(180deg,#9368e9 0,rgba(148,59,234,.7))'
        ]

        const dropDownVisible = ref<boolean>(false)
        const themeSettingVisible = ref<boolean>(false)
        const backgroundImageSwitch = ref<boolean>(props.siderBackgroundImg !== 'none')
        const filterSwitch = ref<boolean>(props.siderBackgroundColor !== 'none')
        const dropDownVisibleHandle = (visible: boolean): void => {
            dropDownVisible.value = visible
        }

        const themeSettingVisibleHandle = (event: any): void => {
            event.preventDefault()
            event.stopPropagation()
            themeSettingVisible.value = !themeSettingVisible.value
        }

        const preventHandle = (event: any): void => {
            event.preventDefault()
            event.stopPropagation()
        }

        const siderBackgroundImageSwitchHandle = (checked: boolean): void => {
            if (!checked) {
                ctx.emit('setTheme', { url: 'none' })
            } else {
                ctx.emit('setTheme', { url: `url(${imageUrlList[0]})` })
            }
        }
        const siderFilterSwitchHandle = (checked: boolean): void => {
            if (!checked) {
                ctx.emit('setTheme', { color: 'none' })
            } else {
                ctx.emit('setTheme', { color: backgroundColorList[0] })
            }
        }

        document.addEventListener('click', (): void => {
            themeSettingVisible.value = false
        })

        watch(props, () => {
            backgroundImageSwitch.value = props.siderBackgroundImg !== 'none'
            filterSwitch.value = props.siderBackgroundColor !== 'none'
        })
        return {
            siderBackgroundImageSwitchHandle,
            siderFilterSwitchHandle,
            dropDownVisibleHandle,
            themeSettingVisibleHandle,
            preventHandle,

            backgroundImageSwitch,
            filterSwitch,
            imageUrlList,
            backgroundColorList,
            themeSettingVisible
        }
    }
})
</script>
