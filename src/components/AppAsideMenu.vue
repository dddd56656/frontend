<template>
  <el-menu
    :default-openeds="['1', '3']"
    class="el-menu-vertical-demo"
    @select="onSelect"
    router
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Message /></el-icon>
        功能一
      </template>
      <el-menu-item-group>
        <template #title>分组 1</template>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/about">关于我们</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><IconMenu /></el-icon>
        功能二
      </template>
      <el-menu-item-group>
        <el-menu-item index="/featureA">功能A</el-menu-item>
        <el-menu-item index="/featureB">功能B</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><Setting /></el-icon>
        系统设置
      </template>
      <el-menu-item-group>
        <el-menu-item index="/settings">个人设置</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { Message, Setting, Menu as IconMenu } from '@element-plus/icons-vue'
const emit = defineEmits(['select'])
function onSelect(index: string) {
  emit('select', index)
}
</script>
