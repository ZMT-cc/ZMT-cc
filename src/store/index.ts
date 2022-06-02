import { createStore } from 'vuex'
import userModel from '@/store/userModel'
export default createStore({
    modules: {
        userModel: userModel
    }
})
