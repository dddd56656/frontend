<script setup lang="ts">
/**
 * 通用表格组件 DataTable
 * - 仅负责接收数据并渲染，所有业务逻辑由外部处理
 * - 提供最大化插槽支持，适配任意业务场景
 * - 谷歌最佳实践：UI只负责渲染，零业务代码
 */
defineProps<{
  columns: Array<{ label: string; prop: string; slot?: string }>, // 加 slot?: string
  data: any[],                                     // 渲染数据
  loading?: boolean                                // loading 状态
}>()

// 事件抛出，供父组件监听并实现业务逻辑（如编辑、删除）
const emit = defineEmits<{
  (e: 'edit', row: any): void
  (e: 'delete', row: any): void
}>()
</script>

<template>
  <el-table :data="data" :loading="loading" border>
    <!-- 动态渲染所有列 -->
    <el-table-column
      v-for="col in columns"
      :key="col.prop"
      :prop="col.prop"
      :label="col.label"
    />
    <!-- 操作列插槽，最大化可扩展 -->
    <el-table-column label="操作" width="120">
      <template #default="{ row }">
        <slot name="actions" :row="row">
          <el-button size="small" @click="emit('edit', row)">编辑</el-button>
          <el-button size="small" type="danger" @click="emit('delete', row)">删除</el-button>
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>