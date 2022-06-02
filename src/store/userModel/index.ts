
export default {
    namespaced: true,
    state: () => {
        return {
            userInfo: {
                realName: 'ghost'
            },
            permissionsKeyList: [],
            menuPathList: []
        }
    },
    mutations: {
        setUserInfo(state: any, data: any) {
            state.userInfo = data
        },
        setPermissionsKeyList(state: any, list: any) {
            state.permissionsKeyList = list
        },
        setMenuPathList(state: any, list: any) {
            list.push('/', '/lock', '/login', '/404')
            state.menuPathList = list
        }
    }
}
