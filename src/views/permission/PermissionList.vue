<script setup lang="ts">
/**
 * 权限管理页面 PermissionList
 * - 只负责 UI 渲染和事件分发，业务状态由 store 管理
 * - 极致通用组件复用，注释到每一行
 * - 谷歌CTO标准示例 Demo
 */

import { onMounted, ref } from 'vue'                    // 引入Vue响应式和生命周期
import { usePermissionStore } from '@/store/modules/permission' // 引入权限store
import DataTable from '@/components/DataTable.vue'      // 通用表格组件
import SearchBar from '@/components/SearchBar.vue'      // 通用搜索栏
import PaginationBar from '@/components/PaginationBar.vue' // 通用分页栏
import ModalForm from '@/components/ModalForm.vue'      // 通用弹窗表单

const store = usePermissionStore()                      // 实例化权限store

// 控制弹窗是否可见
const dialogVisible = ref(false)                        // 控制表单弹窗开关
// 控制弹窗模式：'create' 新增，'edit' 编辑
const dialogMode = ref<'create' | 'edit'>('create')     // 弹窗模式
// 当前编辑或新增的表单数据
const editRow = ref<any>({})                            // 编辑/新增表单数据

onMounted(() => {
  store.getList()                                       // 页面挂载自动拉取权限列表
})

// 打开新增权限弹窗
function handleCreate() {
  dialogMode.value = 'create'                           // 设置为新增模式
  editRow.value = {}                                    // 清空表单
  dialogVisible.value = true                            // 打开弹窗
}
// 打开编辑权限弹窗
function handleEdit(row: any) {
  dialogMode.value = 'edit'                             // 设置为编辑模式
  editRow.value = { ...row }                            // 填充当前行数据
  dialogVisible.value = true                            // 打开弹窗
}
// 删除权限
function handleDelete(row: any) {
  store.removePermission(row.id)                        // 调用store方法删除
}
// 弹窗表单提交
async function handleSubmit() {
  if (dialogMode.value === 'create') {                  // 判断模式
    await store.addPermission(editRow.value)            // 新增权限
  } else {
    await store.editPermission(editRow.value)           // 编辑权限
  }
  dialogVisible.value = false                           // 关闭弹窗
}
</script>

<template>
  <div>
    <h2>权限管理</h2> <!-- 页面标题 -->

    <!-- 搜索栏，支持v-model与按钮插槽 -->
    <SearchBar v-model="store.search" @search="store.getList">
      <el-button type="primary" @click="handleCreate">新增权限</el-button> <!-- 新增按钮 -->
    </SearchBar>

    <!-- 权限表格 -->
    <DataTable
      :columns="[
        { label: '权限名', prop: 'name' },      // 权限名
        { label: '编码', prop: 'code' },        // 权限编码
        { label: '描述', prop: 'desc' },        // 权限描述
        { label: '操作', prop: 'actions', slot: 'actions' } // 操作列（插槽）
      ]"
      :data="store.list"                       
      @edit="handleEdit"                       
      @delete="handleDelete"                 
    >
      <!-- 操作栏插槽：自定义操作按钮 -->
      <template #actions="{ row }">
        <el-button size="small" @click="handleEdit(row)">编辑</el-button> <!-- 编辑 -->
        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button> <!-- 删除 -->
      </template>
    </DataTable>

    <!-- 分页栏，响应页码与数量变更 -->
    <PaginationBar
      :currentPage="store.page"
      :pageSize="store.pageSize"
      :total="store.total"
      @update:currentPage="store.setPage"
      @update:pageSize="store.setPageSize"
    />

    <!-- 权限表单弹窗 -->
    <ModalForm
      :visible="dialogVisible"
      :title="dialogMode === 'create' ? '新增权限' : '编辑权限'"
      @close="() => (dialogVisible = false)"
      @submit="handleSubmit"
    >
      <!-- 权限表单内容：名称/编码/描述 -->
      <el-form :model="editRow">
        <el-form-item label="权限名">
          <el-input v-model="editRow.name" />
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="editRow.code" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editRow.desc" />
        </el-form-item>
      </el-form>
    </ModalForm>
  </div>
</template>
