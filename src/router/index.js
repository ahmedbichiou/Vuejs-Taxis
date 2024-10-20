import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
//keep nav bar
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'Main Menu',
                    component: () => import('@/views/pages/Reservations/MainMenu.vue')
                },
                {
                    path: '/AboutUs',
                    name: 'About Us',
                    component: () => import('@/views/pages/Reservations/AboutUs.vue')
                },
                {
                    path: '/ReservationDetails',
                    name: 'Reservation Details',
                    component: () => import('@/views/pages/Reservations/ReservationDetails.vue')
                },
               
               
            ]  
        },
    ]     
});         

export default router;
