import { createVNode } from 'vue'
import * as $Ico from '@ant-design/icons-vue'
// eslint-disable-next-line
const $Icon = $Ico as any

export const Icon = (props: { icon: string }) => {
    const { icon } = props
    return createVNode($Icon[icon])
}
