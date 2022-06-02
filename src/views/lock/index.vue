<template>
    <div class="lock_page">
        <div class="lock_overlay"> </div>
        <div class="content">
            <div class="portrait">
                <img src="@/assets/daliu.png" class="portrait" alt="">
            </div>
            <a-form :model="formState" name="basic" autocomplete="off" @finish="submit">
                <a-input-password class="unlock_input" placeholder="输入密码解锁" v-model:value="formState.password"></a-input-password>
            </a-form>
        </div>

    </div>
</template>

<script lang="ts">
import router from '@/router'
import axios from '@/plugin/axios'
import { defineComponent, reactive } from 'vue'
import { message } from 'ant-design-vue'

export default defineComponent({
    name: 'LoginView222',
    setup() {
        const formState = reactive<{ password: string }>({
            password: ''
        })
        const submit = async () => {
            const res: any = await axios.post('/unlock', formState)
            if (res.code === 0) {
                router.push('/')
            } else {
                message.error(res.msg)
            }
        }
        return {
            submit,
            formState
        }
    }
})
</script>

<style lang="scss" scoped>
.lock_page {
    background: url(@/assets/full-screen-image-1.jpg);
    background-size: cover;
    background-position: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .lock_overlay {
        background: #000;
        opacity: 0.8;
        display: block;
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .content {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translateX(-50%);
        .portrait {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            overflow: hidden;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
        .unlock_input {
            position: absolute;
            top: 200px;
            width: 200px;
            transform: translateX(-50%);
        }
    }
}
</style>
