<template>
  <div class="bg-gradient-to-r from-blue-100 via-orange-100 to-blue-100 ">
    <navbar-component />
    <router-view />
  </div>
</template>
<script setup>
import NavbarComponent from '@/components/Navbar/NavbarComponent.vue';
</script>
