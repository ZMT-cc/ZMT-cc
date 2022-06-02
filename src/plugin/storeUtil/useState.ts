import { createNamespacedHelpers } from 'vuex'
import { useStateMapper } from '@/plugin/storeUtil/useMapper'
// mapper:string => single   mapper:string[] => object
export function useState(moduleName: string, mapper: string | string[]) {
    try {
        const { mapState } = createNamespacedHelpers(moduleName)
        return useStateMapper(mapper, mapState)
    } catch (err: any) {
        throw new Error(err)
    }
}
