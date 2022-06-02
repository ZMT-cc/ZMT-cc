<template>
    <modal-form title="创建">
        <a-form ref="formRef" :model="formState" name="advanced_search" class="role_form">
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-item name="name" label="名称" :rules="[{ required: true, message: '请输入角色名称' }]">
                        <a-input v-model:value="formState.name"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item name="remark" label="备注">
                        <a-input v-model:value="formState.remark"></a-input>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-item name="permissions" label="权限" :rules="[{ required: true, message: '请选择权限' }]">
                        <a-tree v-model:expandedKeys="expandedKeys" v-model:selectedKeys="selectedKeys" v-model:checkedKeys="formState.permissions" checkable :tree-data="treeData">
                        </a-tree>
                    </a-form-item>
                </a-col>

            </a-row>
        </a-form>
    </modal-form>
</template>
<script lang="ts" >
import { defineComponent, ref, reactive, provide, inject, toRaw } from 'vue'
import type { TreeProps, FormInstance } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import ModalForm from '@/components/modalForm.vue'
import axios from '@/plugin/axios'

export default defineComponent({
    components: {
        ModalForm
    },
    props: {
        roleInfo: Object
    },
    setup(props: any) {
        interface form {
            name: string
            remark: string
            permissions: string[]
            id: string | undefined
        }
        const expandedKeys = ref<string[]>([])
        const selectedKeys = ref<string[]>([])
        const checkedKeys = ref<string[]>([])
        const formRef = ref<FormInstance | any>()
        const formState = reactive<form>(
            props.roleInfo.id
                ? { ...props.roleInfo }
                : {
                    name: '',
                    remark: '',
                    permissions: [],
                    id: ''
                }
        )
        const close = inject<any>('close')
        const submit = () => {
            formRef.value
                .validate()
                .then((state: boolean) => {
                    const path = formState.id ? '/updateRole' : '/createRole'
                    axios.post(path, formState).then((res: any) => {
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
        function getPermissions() {
            return new Promise((resolve, reject) => {
                axios.get('/getPermissionList').then((data: any) => {
                    resolve(data.permissionList)
                })
            })
        }
        getPermissions().then((data: any) => {
            treeData.value = [
                {
                    title: '全选',
                    key: '0-0',
                    children: [...data]
                }
            ]
        })
        provide('submit', submit)
        const treeData = ref<any[]>([])

        return {
            formState,
            treeData,
            expandedKeys,
            selectedKeys,
            checkedKeys,
            formRef
        }
    }
})
</script>
<style lang="scss" scoped>
.role_form {
    width: 800px;
}
</style>
