<template>
    <modal-form title="上传">
        <a-upload-dragger list-type="picture-card" v-model:fileList="fileList" name="file" action="/uploadFaceImage"  :customRequest="customRequest" @change="handleChange" @drop="handleDrop">
            <p class="ant-upload-drag-icon">
                <inbox-outlined></inbox-outlined>
            </p>
            <p class="ant-upload-text">点击选择或拖住图片到这里上传</p>
            <p class="ant-upload-hint">
                支持png/jpg/gif/other 图片大小不超过2MB
            </p>
        </a-upload-dragger>
    </modal-form>
</template>
<script lang="ts">
import { InboxOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import type { UploadChangeParam } from 'ant-design-vue'
import ModalForm from '@/components/modalForm.vue'
import axios from '@/plugin/axios'
export default defineComponent({
    components: {
        InboxOutlined,
        ModalForm
    },
    setup() {
        const HandleAction = (info: any) => {
            console.log(456465456)
            return new Promise((resolve) => {
                resolve(info)
            })
        }
        const customRequest = ({
            action,
            data,
            file,
            filename,
            headers,
            onError,
            onProgress,
            onSuccess,
            withCredentials
        }: any) => {
            console.log(withCredentials, headers)
            // EXAMPLE: post form-data with 'axios'
            // eslint-disable-next-line no-undef
            const formData = new FormData()
            if (data) {
                Object.keys(data).forEach((key) => {
                    formData.append(key, data[key])
                })
            }
            formData.append(filename, file)

            axios
                .post(action, formData, {
                    onUploadProgress: ({ total, loaded }) => {
                        onProgress({ percent: Math.round((loaded / total) * 100).toFixed(2) }, file)
                    }
                })
                .then(({ data: response }) => {
                    onSuccess(response, file)
                })
                .catch(onError)

            return {
                abort() {
                    console.log('upload progress is aborted.')
                }
            }
        }
        const handleChange = (info: UploadChangeParam) => {
            const status = info.file.status
            console.log(info)
            if (status !== 'uploading') {
                console.log(info.file, info.fileList)
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`)
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
            }
        }
        return {
            customRequest,
            handleChange,
            fileList: ref([]),
            HandleAction,
            handleDrop: (e: DragEvent) => {
                console.log(e)
            }
        }
    }
})
</script>
