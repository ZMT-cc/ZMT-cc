import { computed } from 'vue'
import store from '@/store'

export function useStateMapper(mapper: string | string[], mapState: any) {
    if (typeof mapper === 'string') {
        const state = mapState({
            [mapper]: (state: any) => state[mapper]
        })
        return computed(state[mapper].bind({ $store: store }))
    } else {
        let storeState: any = {}
        mapper.forEach((key) => {
            storeState[key] = (state: any) => state[key]
        })
        storeState = mapState(storeState)
        Object.keys(storeState).forEach(key => {
            storeState[key] = computed(storeState[key].bind({ $store: store }))
        })
        return storeState
    }
}

export function useActionMapper(mapper: string[], mapFn: any) {
    const storeActionsFns = mapFn(mapper)
    const storeAction: any = {}
    Object.keys(storeActionsFns).forEach((key) => {
        storeAction[key] = storeActionsFns[key].bind({ $store: store })
    })
    return storeAction
}

export function useMutationMapper(mapper: string[], mapMutations: any) {
    const storeMutationFns = mapMutations(mapper)
    const storeMutation: any = {}
    Object.keys(storeMutationFns).forEach((key) => {
        storeMutation[key] = storeMutationFns[key].bind({ $store: store })
    })
    return storeMutation
}
