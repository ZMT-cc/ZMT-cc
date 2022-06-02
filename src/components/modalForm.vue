<template>
    <div class="modal_box">
        <a-modal :title="title" width="auto" style="top:-30px" wrapClassName="my_modal" centered @ok="submit" :afterClose="close" v-model:visible="modalText" :confirm-loading="confirmLoading">
            <slot></slot>
        </a-modal>
    </div>
</template>
<script lang="ts" >
import { defineComponent, ref, inject } from 'vue'

export default defineComponent({
    props: {
        title: String
    },
    setup() {
        const close = inject('close')
        const submit = inject('submit')
        const modalText = ref<string>('123131')
        const confirmLoading = ref<boolean>(false)
        return {
            modalText,
            confirmLoading,
            close,
            submit
        }
    }
})
</script>
<style lang="scss" >
.my_modal {
    .ant-modal-content {
        border-radius: 10px;
        overflow: hidden;
        max-width: 1000px;
        min-width: 500px;
        .ant-modal-body {
            max-height: 900px;
            overflow: auto;
        }
    }
}
.modal_box {
    background: red;
}
.ant-picker {
    width: 100%;
    .ant-picker-input {
        input {
            text-align: center;
        }
    }
}
</style>
