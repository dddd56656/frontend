<script setup lang="ts">
/**
 * 通用弹窗表单组件 ModalForm
 * - 完全通用，只负责弹窗/表单渲染
 * - 提供插槽让业务自定义字段
 */
defineProps<{
  visible: boolean
  title: string
  loading?: boolean
}>()
const emit = defineEmits(['close', 'submit'])
</script>

<template>
  <el-dialog :visible="visible" :title="title" @close="emit('close')">
    <el-form @submit.prevent="emit('submit')">
      <!-- 业务表单插槽 -->
      <slot />
    </el-form>
    <template #footer>
      <el-button @click="emit('close')">取消</el-button>
      <el-button type="primary" :loading="loading" @click="emit('submit')">确定</el-button>
    </template>
  </el-dialog>
</template>
