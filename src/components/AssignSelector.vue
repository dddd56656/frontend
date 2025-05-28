<!-- components/AssignSelector.vue -->
<script setup lang="ts">
/**
 * AssignSelector 通用分配/多选器
 * - 适用于“分配角色/权限/规则”等场景
 * - 高度可配置，最大化注释
 * - v-model 绑定选中ID数组
 */

import { computed } from 'vue'

const props = defineProps<{
  modelValue: string[]           // 选中的id数组（双向绑定）
  allOptions: any[]              // 所有可选项（如权限/角色/规则列表）
  optionLabel: string            // 可选项的显示字段名（如 name/title）
  optionValue: string            // 可选项的id字段名（如 id/key）
  disabled?: boolean             // 是否禁用
}>()
const emits = defineEmits(['update:modelValue']) // 支持v-model

// 内部双向绑定，支持父子同步
const selected = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue', val)
})
</script>

<template>
  <div>
    <!-- 可多选的选项列表，element-plus风格 -->
    <el-checkbox-group v-model="selected" :disabled="props.disabled">
      <el-checkbox
        v-for="item in allOptions"
        :key="item[optionValue]"
        :label="item[optionValue]"
      >
        {{ item[optionLabel] }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
