<template>
    <div class="notify_box">
        <a class="ant-dropdown-link" @click.prevent>
            <div class="message_count">{{newMessageCount}}</div>
            <bell-outlined />
        </a>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { BellOutlined } from '@ant-design/icons-vue'
import axios from '@/plugin/axios'

export default defineComponent({
    components: {
        BellOutlined
    },

    setup() {
        const router = ref<any>(useRouter())
        const newMessageCount = ref<number>(99)
        const messageCountVisible = ref<boolean>(false)

        // ;(() => {
        //     axios.get('/notify/count').then((data: any) => {
        //         if (data.code === 0) {
        //             newMessageCount.value = data.total
        //         }
        //         if (newMessageCount.value > 0) {
        //             messageCountVisible.value = true
        //         }
        //     })
        // })()

        return {
            newMessageCount,
            messageCountVisible
        }
    }
})
</script>
