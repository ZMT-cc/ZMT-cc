<template>
    <div class="login_page">
        <div class="login_box">
            <div class="login_img">
                <img src="@/assets/logo.png" alt="">
            </div>
            <div class="login_info">
                <h1 class="system_title">欢迎使用办公系统</h1>
                <a-form :model="formState" name="basic" autocomplete="off" @finish="submit">
                    <a-form-item label="账号" labelAlign="left" name="username" :rules="[{ required: true, message: '请输入账号' }]">
                        <a-input v-model:value="formState.username">
                            <template #prefix>
                                <user-outlined class="site-form-item-icon" />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
                        <a-input-password v-model:value="formState.password">
                            <template #prefix>
                                <lock-outlined class="site-form-item-icon" />
                            </template>
                        </a-input-password>
                    </a-form-item>

                    <a-form-item>
                        <a-button type="primary" size="large" html-type="submit" class="login_button">登陆</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import router from '@/router'
import axios from '@/plugin/axios'
import { defineComponent, reactive } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useMutation } from '@/plugin/storeUtil/useMutation'
export default defineComponent({
    name: 'LoginView222',
    components: {
        UserOutlined,
        LockOutlined
    },
    setup() {
        interface form {
            username: string
            password: string
        }

        const formState = reactive<form>({
            username: '',
            password: ''
        })

        const submit = async () => {
            const res: any = await axios.post('/login', formState)
            if (res.code === 0) {
                const { setUserInfo } = useMutation('userModel', ['setUserInfo'])
                setUserInfo(res.userInfo)
                localStorage.setItem('token', res.token)
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
.login_page {
    background: radial-gradient(circle at right bottom, rgb(1, 141, 180), rgb(1, 184, 163));
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .login_box {
        width: 800px;
        height: 400px;
        border-radius: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        overflow: hidden;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
        .login_img {
            width: 400px;
            height: 400px;
            background: radial-gradient(circle at right bottom, rgb(1, 184, 163), rgb(1, 141, 180));
            position: absolute;
            left: 0;
            img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
            }
        }
        .login_info {
            width: 400px;
            height: 400px;
            position: absolute;
            right: 0;
            background: #fff;
            padding: 50px;
            .system_title {
                margin: 20px 0;
                text-align: center;
            }
            .login_button {
                width: 300px;
                margin: 20px 0;
            }
        }
    }
}
</style>
