<script setup lang="ts">
/**
 * 通用分页组件 PaginationBar
 * - 接收当前分页参数
 * - 变更事件均外抛，零业务耦合
 */
defineProps<{
  currentPage: number
  pageSize: number
  total: number
}>()
const emit = defineEmits(['update:currentPage', 'update:pageSize'])
</script>

<template>
  <el-pagination
    background
    :current-page="currentPage"
    :page-size="pageSize"
    :total="total"
    @current-change="emit('update:currentPage', $event)"
    @size-change="emit('update:pageSize', $event)"
    layout="total, sizes, prev, pager, next, jumper"
    :page-sizes="[10, 20, 50, 100]"
  />
</template>
