<script setup lang="ts">
/**
 * 权限规则管理页面 RuleList
 * - 只负责渲染UI和交互，业务数据全部交给store
 * - 复用所有通用组件，代码极致简洁，最大注释
 */

import { onMounted, ref } from 'vue'               // 引入 vue API
import { useRuleStore } from '@/store/modules/rule'// 引入 store
import DataTable from '@/components/DataTable.vue' // 通用表格组件
import SearchBar from '@/components/SearchBar.vue' // 通用搜索栏
import PaginationBar from '@/components/PaginationBar.vue' // 通用分页栏
import ModalForm from '@/components/ModalForm.vue' // 通用弹窗表单

const store = useRuleStore()                      // 实例化 rule store

// 控制弹窗显示
const dialogVisible = ref(false)                  // 弹窗显示状态
const dialogMode = ref<'create' | 'edit'>('create')// 弹窗模式（新增/编辑）
const editRow = ref<any>({})                      // 当前编辑行数据

onMounted(() => {
  store.getList()                                 // 页面初始化时拉取规则数据
})

// 打开新增规则弹窗
function handleCreate() {
  dialogMode.value = 'create'                     // 设置为创建模式
  editRow.value = {}                              // 清空表单
  dialogVisible.value = true                      // 显示弹窗
}
// 打开编辑规则弹窗
function handleEdit(row: any) {
  dialogMode.value = 'edit'                       // 设置为编辑模式
  editRow.value = { ...row }                      // 拷贝行数据到表单
  dialogVisible.value = true                      // 显示弹窗
}
// 删除规则
function handleDelete(row: any) {
  store.removeRule(row.id)                        // 调用store删除
}
// 弹窗表单提交
async function handleSubmit() {
  if (dialogMode.value === 'create') {            // 判断模式
    await store.addRule(editRow.value)            // 新增规则
  } else {
    await store.editRule(editRow.value)           // 编辑规则
  }
  dialogVisible.value = false                     // 关闭弹窗
}
</script>

<template>
  <div>
    <h2>权限规则管理</h2> <!-- 页面标题 -->

    <!-- 搜索栏组件，插槽用于扩展按钮 -->
    <SearchBar v-model="store.search" @search="store.getList">
      <el-button type="primary" @click="handleCreate">新增规则</el-button>
    </SearchBar>

    <!-- 通用表格组件，传递列定义、数据源、事件 -->
    <DataTable
      :columns="[
        { label: '规则名', prop: 'name' },       // 规则名称
        { label: '描述', prop: 'desc' },         // 规则描述
        { label: '表达式', prop: 'expression' }, // 规则表达式
        { label: '操作', prop: 'actions', slot: 'actions' } // 操作列插槽
      ]"
      :data="store.list"                       
      @edit="handleEdit"                        
      @delete="handleDelete"                   
    >
      <!-- 操作列插槽（插入表格操作按钮） -->
      <template #actions="{ row }">
        <el-button size="small" @click="handleEdit(row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
      </template>
    </DataTable>

    <!-- 通用分页组件 -->
    <PaginationBar
      :currentPage="store.page"               
      :pageSize="store.pageSize"               
      :total="store.total"                      
      @update:currentPage="store.setPage"      
      @update:pageSize="store.setPageSize"     
    />

    <!-- 通用弹窗表单组件 -->
    <ModalForm
      :visible="dialogVisible"               
      :title="dialogMode === 'create' ? '新增规则' : '编辑规则'"
      @close="() => (dialogVisible = false)"    
      @submit="handleSubmit"                   
    >
      <el-form :model="editRow">                <!-- 表单绑定数据 -->
        <el-form-item label="规则名">
          <el-input v-model="editRow.name" />   <!-- 规则名输入 -->
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editRow.desc" />   <!-- 描述输入 -->
        </el-form-item>
        <el-form-item label="表达式">
          <el-input v-model="editRow.expression" /> <!-- 表达式输入 -->
        </el-form-item>
      </el-form>
    </ModalForm>
  </div>
</template>
