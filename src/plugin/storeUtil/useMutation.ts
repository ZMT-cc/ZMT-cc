import { createNamespacedHelpers } from 'vuex'
import { useMutationMapper } from '@/plugin/storeUtil/useMapper'

export function useMutation(moduleName: string, mapper: string[]) {
    try {
        const { mapMutations } = createNamespacedHelpers(moduleName)
        return useMutationMapper(mapper, mapMutations)
    } catch (err: any) {
        throw new Error(err)
    }
}
