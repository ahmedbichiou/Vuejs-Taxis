<script setup>
import { useLayout } from '@/layout/composables/layout';

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <div class="layout-topbar">
       
            <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
                <i class="pi pi-bars"></i>
            </button>
            <router-link to="/" class="layout-topbar-logo"></router-link>
        

        <!-- Add Taxi Transfers title -->
        <h1 class="layout-topbar-title">Taxi Transfers</h1> <!-- Title Element -->

     
    </div>
</template>

<style>
.layout-topbar {
    display: flex;
    align-items: center; /* Vertically align items */
    justify-content: space-between; /* Space between menu button, title, and actions */
}

.layout-topbar-title {
    flex: 1; /* Allow the title to take up remaining space */
    text-align: center; /* Center the title text */
    font-size: 1.5rem; /* Adjust font size as needed */
    font-weight: bold; /* Make it bold for emphasis */
    color: #333; /* Change color as needed */
}
</style>
