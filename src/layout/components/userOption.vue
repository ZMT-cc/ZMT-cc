<template>
    <a-dropdown @visibleChange="dropDownVisibleHandle" trigger="click" overlayClassName="user_option_dropdown">
        <a class="ant-dropdown-link" @click.prevent>
            <unordered-list-outlined style="fontSize:18px" />
        </a>
        <template #overlay>
            <a-menu>
                <a-menu-item @click="dropDownVisible = false">
                    <a href="javascript:;">修改密码</a>
                </a-menu-item>
                <a-menu-item @click="lockPage">
                    <a href="javascript:;">锁定页面</a>
                </a-menu-item>
                <a-menu-item @click="lockPage">
                    <a href="javascript:;">上传头像</a>
                </a-menu-item>
                <a-menu-item @click="logout">
                    <a href="javascript:;">退出</a>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
    <upload-face-image></upload-face-image>
</template>
<script lang="ts" >
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { UnorderedListOutlined } from '@ant-design/icons-vue'
import UploadFaceImage from '@/layout/components/uploadFaceImage.vue'
export default defineComponent({
    components: {
        UnorderedListOutlined,
        UploadFaceImage
    },
    setup() {
        const router = useRouter()
        const dropDownVisible = ref<boolean>(false)
        const dropDownVisibleHandle = (visible: boolean): void => {
            dropDownVisible.value = visible
        }
        const logout = (): void => {
            router.replace('/login')
        }
        const lockPage = (): void => {
            router.replace('/lock')
        }
        return {
            dropDownVisibleHandle,
            logout,
            lockPage,
            dropDownVisible
        }
    }
})
</script>
