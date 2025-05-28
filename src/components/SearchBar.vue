<script setup lang="ts">
/**
 * 通用搜索栏组件 SearchBar
 * - 兼容所有 Vue3，建议这种
 */
const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue', 'search'])

// 内部用一个响应式变量
import { computed } from 'vue'
const value = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})
</script>

<template>
  <el-input
    v-model="value"
    placeholder="输入关键字搜索"
    clearable
    @keyup.enter="() => emit('search')"
    style="width: 240px"
  />
  <el-button type="primary" @click="emit('search')">搜索</el-button>
  <slot />
</template>
