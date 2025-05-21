<template>
  <el-menu mode="horizontal" :default-active="activeIndex" @select="onSelect">
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/about">关于我们</el-menu-item>
    <el-menu-item index="/contact">联系</el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const activeIndex = ref(route.path)

watch(
  () => route.path,
  (val) => (activeIndex.value = val)
)

const onSelect = (index: string) => {
  router.push(index)
}
</script>
