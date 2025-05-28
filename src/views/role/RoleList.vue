<!-- views/role/RoleList.vue -->
<script setup lang="ts">
/**
 * 角色管理页面
 * —— 只负责UI和事件分发，所有数据全部由store集中管理
 * —— 采用最大化注释，谷歌CTO最佳实践
 */

import { onMounted, ref } from 'vue'                             // 引入vue核心api
import { useRoleStore } from '@/store/modules/role'              // 角色store
import DataTable from '@/components/DataTable.vue'               // 通用表格组件
import SearchBar from '@/components/SearchBar.vue'               // 通用搜索栏
import PaginationBar from '@/components/PaginationBar.vue'       // 通用分页栏
import ModalForm from '@/components/ModalForm.vue'               // 通用弹窗表单
import AssignSelector from '@/components/AssignSelector.vue'     // 通用分配弹窗（多选权限）

const store = useRoleStore()                                     // 初始化store

// 弹窗及表单相关状态
const dialogVisible = ref(false)                                 // 控制新增/编辑弹窗显隐
const dialogMode = ref<'create' | 'edit'>('create')              // 弹窗模式
const editRow = ref<any>({})                                     // 当前编辑的数据

const assignDialogVisible = ref(false)                           // 分配权限弹窗显隐
const assignRoleId = ref<string>('')                             // 当前分配的角色ID

onMounted(() => {
  store.getList()                                                // 页面挂载自动拉取角色列表
})

/**
 * 打开新增弹窗
 */
function handleCreate() {
  dialogMode.value = 'create'                                    // 设置为新增模式
  editRow.value = {}                                             // 清空表单
  dialogVisible.value = true                                     // 打开弹窗
}

/**
 * 打开编辑弹窗
 * @param row 被编辑行
 */
function handleEdit(row: any) {
  dialogMode.value = 'edit'                                      // 编辑模式
  editRow.value = { ...row }                                     // 填充被编辑行
  dialogVisible.value = true                                     // 打开弹窗
}

/**
 * 删除角色
 * @param row 被删行
 */
function handleDelete(row: any) {
  store.removeRole(row.id)                                       // 调用store删除
}

/**
 * 弹窗表单提交（新增/编辑）
 */
async function handleSubmit() {
  if (dialogMode.value === 'create') {
    await store.addRole(editRow.value)                           // 新增
  } else {
    await store.editRole(editRow.value)                          // 编辑
  }
  dialogVisible.value = false                                    // 关闭弹窗
}

/**
 * 打开分配权限弹窗
 * @param row 当前角色
 */
async function handleAssign(row: any) {
  assignRoleId.value = row.id                                    // 记录当前操作角色
  await store.getRolePermissions(row.id)                         // 拉取当前已分配权限
  assignDialogVisible.value = true                               // 打开弹窗
}

/**
 * 分配权限提交
 * @param permissionIds 选中的权限ID数组
 */
async function handleAssignSubmit(permissionIds: string[]) {
  await store.assignPermissions(assignRoleId.value, permissionIds) // 调用分配接口
  assignDialogVisible.value = false                              // 关闭弹窗
}
</script>

<template>
  <div>
    <h2>角色管理</h2>                                            <!-- 页面标题 -->

    <!-- 搜索栏（支持v-model和插槽按钮） -->
    <SearchBar v-model="store.search" @search="store.getList">
      <el-button type="primary" @click="handleCreate">新增角色</el-button> <!-- 新增按钮 -->
    </SearchBar>

    <!-- 通用表格，columns支持插槽操作 -->
    <DataTable
      :columns="[
        { label: '角色名', prop: 'name' },                        // 角色名
        { label: '描述', prop: 'desc' },                          // 描述
        { label: '操作', prop: 'actions', slot: 'actions' }       // 操作栏
      ]"
      :data="store.list"                                         
      @edit="handleEdit"                                         
      @delete="handleDelete"                                     
    >
      <!-- 操作栏插槽 -->
      <template #actions="{ row }">
        <el-button size="small" @click="handleEdit(row)">编辑</el-button>       <!-- 编辑 -->
        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button> <!-- 删除 -->
        <el-button size="small" type="primary" @click="handleAssign(row)">分配权限</el-button> <!-- 分配权限 -->
      </template>
    </DataTable>

    <!-- 分页栏，支持当前页/每页数同步store -->
    <PaginationBar
      :currentPage="store.page"
      :pageSize="store.pageSize"
      :total="store.total"
      @update:currentPage="store.setPage"
      @update:pageSize="store.setPageSize"
    />

    <!-- 通用表单弹窗，支持新增/编辑 -->
    <ModalForm
      :visible="dialogVisible"
      :title="dialogMode === 'create' ? '新增角色' : '编辑角色'"
      @close="() => (dialogVisible = false)"
      @submit="handleSubmit"
    >
      <el-form :model="editRow">
        <el-form-item label="角色名">
          <el-input v-model="editRow.name" />                            <!-- 名称输入 -->
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editRow.desc" />                            <!-- 描述输入 -->
        </el-form-item>
      </el-form>
    </ModalForm>

    <!-- 通用分配权限弹窗（多选器） -->
    <ModalForm
      :visible="assignDialogVisible"
      title="分配权限"
      @close="() => (assignDialogVisible = false)"
      @submit="() => handleAssignSubmit(store.assignedPermissionIds)"
    >
      <!-- 多选器，v-model同步store状态，all-permissions为全部权限 -->
      <AssignSelector
        v-model="store.assignedPermissionIds"
        :all-options="[]"       
        option-label="name"     
        option-value="id"        
      />
    </ModalForm>
  </div>
</template>
