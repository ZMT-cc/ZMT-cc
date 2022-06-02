import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useState } from '@/plugin/storeUtil/useState'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/lock',
        name: 'lock',
        component: () => import('@/views/lock/index.vue')
    },
    {
        path: '/',
        name: '/',
        component: () => import('@/layout/index.vue'),
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/home/index.vue')
            },
            {
                name: 'order',
                path: 'order',
                component: () => import('@/views/order/index.vue')
            },
            {
                name: 'abnormal',
                path: 'abnormal',
                component: () => import('@/views/abnormal/index.vue')
            },
            {
                name: 'task',
                path: 'task',
                component: () => import('@/views/task/index.vue')
            },
            {
                name: 'user',
                path: 'user',
                component: () => import('@/views/user/index.vue')
            },
            {
                name: 'finance',
                path: 'finance',
                component: () => import('@/views/finance/index.vue')
            },
            {
                name: 'users',
                path: '/users',
                component: () => import('@/views/users/index.vue')
            },
            {
                name: 'role',
                path: 'role',
                component: () => import('@/views/role/index.vue')
            },
            {
                name: 'system',
                path: 'system',
                component: () => import('@/views/system/index.vue')
            },
            {
                name: 'product',
                path: 'product',
                component: () => import('@/views/product/index.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const menuPathList = useState('userModel', 'menuPathList')
router.beforeEach((to, from, next) => {
    if (menuPathList.value[0]) {
        if (menuPathList.value.includes(to.path)) {
            next()
        } else {
            next(menuPathList.value[0])
        }
        return
    }
    next()
})

export default router
