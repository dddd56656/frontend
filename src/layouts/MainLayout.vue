<template>
  <el-container style="height: 100vh;">
    <el-header height="60px">
      <Navbar />
    </el-header>
    <el-main>
      <slot />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import Navbar from '@/components/AppNavbar.vue'
</script>
