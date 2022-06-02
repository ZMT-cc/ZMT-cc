<template>
    <div class="menu_box">
        <div v-for="item in menuList" @click="routerTo(item.path)" :class="{'menu_item':true,'selected_menu':route.path === item.path}" :key="item.name">
            <a-tooltip placement="right">
                <div class="icon_box">
                    <Icon class="menu_icon" :icon="item.icon" />
                </div>
                <template #title v-if="collapsed">
                    <span>{{item.title}}</span>
                </template>
            </a-tooltip>
            <div class="menu_name" v-if="!collapsed">{{item.title}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from './icon'
import { useMutation } from '@/plugin/storeUtil/useMutation'
import axios from '@/plugin/axios'
export default defineComponent({
    components: {
        Icon
    },
    props: {
        collapsed: {
            type: Boolean,
            required: true
        }
    },
    setup() {
        const menuList = ref<any[]>([])
        function getPermissions() {
            return new Promise((resolve) => {
                axios.get('/getPermissions').then((res: any) => {
                    if (res.code === 0) {
                        resolve(res.menuList)
                        setStore(res)
                    } else {
                        resolve([])
                    }
                })
            })
        }

        function setStore(data: any) {
            const { setUserInfo, setPermissionsKeyList, setMenuPathList } = useMutation(
                'userModel',
                ['setUserInfo', 'setPermissionsKeyList', 'setMenuPathList']
            )
            const menuPathList = data.menuList.map((item: { path: string }) => {
                return item.path
            })
            setUserInfo(data.userInfo)
            setPermissionsKeyList(data.permissionsKeyList)
            setMenuPathList(menuPathList)
        }

        getPermissions().then((menus: any) => {
            menuList.value = [...menus]
        })
        function routerTo(path: string): void {
            router.replace(path)
        }
        const route = ref<any>(useRoute())
        const router = reactive<any>(useRouter())
        return {
            menuList,
            route,
            routerTo
        }
    }
})
</script>
