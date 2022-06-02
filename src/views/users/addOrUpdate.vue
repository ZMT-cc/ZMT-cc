<template>
    <modal-form title="创建">
        <a-form ref="formRef" validateTrigger="blur" :model="formState" :labelCol="{span:5}" labelAlign="right" name="advanced_search" class="role_form">
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-item name="user" label="账号" :rules="[{ required: true, message: '请输入账号' },{pattern:/^\w{2,20}$/, message:'请不用使用中文或特殊符号'}]">
                        <a-input v-model:value="formState.user"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item name="password" label="密码" :rules="[{ required: true, message: '请输入密码' },{pattern:/^\w{2,20}$/, message:'请不用使用中文或特殊符号'}]">
                        <a-input v-model:value="formState.password"></a-input>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-item name="realName" label="姓名" :rules="[{ required: true, message: '请输入真实姓名' }]">
                        <a-input maxlength="20" v-model:value="formState.realName"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item name="roleId" label="角色" :rules="[{ required: true, message: '请选择角色' }]">
                        <a-select @change="roleSelectHandle" v-model:value="formState.roleId" :options="roleList" style="width: 100%" :fieldNames="{label:'name',value:'id'}"></a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-item name="phone" label="手机号码" :rules="[{ required: true, message: '请输入手机号' },{pattern:/^[1]\d{10}$/,message:'请输入正确的手机号'}]">
                        <a-input maxlength="11" v-model:value="formState.phone"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item name="email" label="邮箱" :rules="[{pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,message:'请输入正确的邮箱'}]">
                        <a-input v-model:value=" formState.email">
                        </a-input>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-item name="entryDate" label="入职时间" width="100%" :rules="[{ required: true, message: '请选择入职时间' }]">
                        <a-date-picker v-model:value="formState.entryDate" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item name="remark" label="备注">
                        <a-textarea maxlength="300"  show-count v-model:value="formState.remark" rows="1"></a-textarea>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </modal-form>
</template>
<script lang="ts" >
import { defineComponent, ref, reactive, provide, inject, toRaw } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import ModalForm from '@/components/modalForm.vue'
import axios from '@/plugin/axios'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

export default defineComponent({
    components: {
        ModalForm
    },
    props: {
        userInfo: Object
    },
    setup(props: any) {
        interface form {
            user: string
            name: string
            remark: string
            realName: string
            password: string
            roleId: string
            roleName: string
            phone: string
            email: string
            id: string | undefined
            entryDate: Dayjs
        }
        const expandedKeys = ref<string[]>([])
        const selectedKeys = ref<string[]>([])
        const checkedKeys = ref<string[]>([])
        const roleList = ref<any[]>([])
        const formRef = ref<FormInstance | any>()
        const formState = ref<form>(props.userInfo.id ? { ...props.userInfo } : {})
        formState.value.entryDate = dayjs(formState.value.entryDate)
        const close = inject<any>('close')

        const submit = () => {
            formRef.value
                .validate()
                .then(() => {
                    const path = formState.value.id ? '/updateUser' : '/createUser'
                    axios.post(path, formState.value).then((res: any) => {
                        if (res.code === 0) {
                            message.success(res.msg)
                            close()
                            return
                        }
                        message.error(res.msg)
                    })
                })
                .catch(() => {
                    message.error('请设置必要选项')
                })
        }

        provide('submit', submit)

        const getRoleList = function () {
            axios.post('/getRole').then((res: any) => {
                if (res.code === 0) {
                    roleList.value = res.dataList
                }
            })
        }
        const roleSelectHandle = function (value: string) {
            roleList.value.find((item) => {
                console.log(item.name)
                if (item.id === value) {
                    formState.value.roleName = item.name
                    return item.name
                }
                return false
            })
        }
        getRoleList()

        return {
            roleSelectHandle,
            formState,
            expandedKeys,
            selectedKeys,
            checkedKeys,
            formRef,
            roleList
        }
    }
})
</script>
<style lang="scss" scoped>
.role_form {
    width: 800px;
}
</style>
