import { createRouter, createWebHistory } from 'vue-router'
import CarritoCompras from '@/views/CarritoCompras.vue'

const routes = [
    {
        path: '/',
        name: 'CarritoCompras',
        component: CarritoCompras
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
