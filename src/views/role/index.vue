<template>
    <div class="role_page content">
        <div class="content_header">
            <a-button class="header_left_button" @click="addOrUpdateVisible = true" type="primary">创建角色</a-button>
            <a-button class="header_right_button" @click="removeRoles(selectedList)" v-if="selectedList[0]" type="primary" danger>批量删除</a-button>
        </div>
        <div class="content_body">
            <a-table :pagination="pagination" @change="tableChangeHandle" :columns="columns" :rowKey="setKey" :data-source="data" bordered :row-selection="rowSelection">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'option'">
                        <a-button type="primary" class="update_button" @click="updateRole(record)">
                            修改
                        </a-button>
                        <a-popconfirm placement="topLeft" :bodyStyle="{borderRadios:'10px',background:'red'}" ok-text="是" cancel-text="否" @confirm="removeRole(record)">
                            <template #title>
                                <p>是否删除该角色？</p>
                            </template>
                            <a-button type="primary" danger>
                                删除
                            </a-button>
                        </a-popconfirm>
                    </template>
                </template>
            </a-table>
        </div>
        <add-or-update v-if="addOrUpdateVisible" :roleInfo="updateRoleInfo"></add-or-update>>
    </div>
</template>
<script lang="ts" >
import { defineComponent, ref, reactive, provide } from 'vue'
import type { TableColumnType } from 'ant-design-vue'
import AddOrUpdate from '@/views/role/addOrUpdate.vue'
import axios from '@/plugin/axios'
import { message } from 'ant-design-vue'

export default defineComponent({
    components: {
        AddOrUpdate
    },
    setup() {
        provide('close', () => {
            addOrUpdateVisible.value = false
            updateRoleInfo.value = {}
            getRoleList()
        })

        interface form {
            name: string
            remark: string
            permissions: string[] | []
        }
        interface paginationFace {
            current: number
            pagesize: number
            pageSizeOptions: string[]
            showSizeChanger: boolean
            hideOnSinglePage: boolean
            total: number
        }

        const pagination = ref<paginationFace>({
            current: 1,
            pagesize: 20,
            pageSizeOptions: ['30', '50', '100'],
            showSizeChanger: true,
            hideOnSinglePage: true,
            total: 100
        })
        const addOrUpdateVisible = ref<boolean>(false)
        const selectedList = ref<string[]>([])
        const updateRoleInfo = ref<any>({
            name: '',
            remark: '',
            permissions: []
        })
        const data = ref<any[]>([])
        const columns = reactive<TableColumnType[]>([
            {
                title: '名称',
                dataIndex: 'name',
                width: 200
            },
            {
                title: '备注',
                className: 'column-remark',
                dataIndex: 'remark'
            },
            {
                title: '操作',
                className: 'column-option',
                dataIndex: 'option',
                width: 220,
                key: 'option'
            }
        ])
        const formState = reactive<form>({
            name: '',
            remark: '',
            permissions: []
        })

        const setKey = function (record: any): string {
            return record.id
        }
        const tableChangeHandle = function (page: paginationFace) {
            pagination.value = page
        }

        const rowSelection = ref({
            checkStrictly: true,
            onChange: (selectedRowKeys: string[]) => {
                selectedList.value = selectedRowKeys
            }
        })

        const getRoleList = function () {
            axios
                .post('/getRole', {
                    pageIndex: pagination.value.current,
                    pagesize: pagination.value.pagesize
                })
                .then((res: any) => {
                    if (res.code === 0) {
                        data.value = res.dataList as any[]
                        pagination.value.total = res.total
                    }
                })
        }
        const removeRoles = function (roleList: string[]) {
            if (roleList[0]) {
                axios.post('/removeRole', roleList).then((res: any) => {
                    if (res.code === 0) {
                        selectedList.value = []
                        getRoleList()
                    }
                })
            }
        }

        const updateRole = function (data: form) {
            addOrUpdateVisible.value = true
            updateRoleInfo.value = data
        }
        const removeRole = function (data: any) {
            removeRoles([data.id])
        }
        getRoleList()

        return {
            addOrUpdateVisible,
            columns,
            data,
            formState,
            rowSelection,
            selectedList,
            updateRoleInfo,
            pagination,
            tableChangeHandle,
            removeRoles,
            setKey,
            updateRole,
            removeRole
        }
    }
})
</script>
<style lang="scss" scoped>
.update_button {
    margin-right: 10px;
}
</style>
