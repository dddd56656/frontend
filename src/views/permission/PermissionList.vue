<script setup lang="ts">
/**
 * 权限管理页面 PermissionList
 * - 业务零耦合，只负责调用store和渲染UI
 * - 所有状态/数据全部由store管理
 * - 极致注释，谷歌CTO标准
 */
import { onMounted, ref } from 'vue'
import { usePermissionStore } from '@/store/modules/permission'
import DataTable from '@/components/DataTable.vue'
import SearchBar from '@/components/SearchBar.vue'
import PaginationBar from '@/components/PaginationBar.vue'
import ModalForm from '@/components/ModalForm.vue'

const store = usePermissionStore()

// 弹窗及表单状态
const dialogVisible = ref(false)
const dialogMode = ref<'create' | 'edit'>('create')
const editRow = ref<any>({}) // 编辑/新增数据

onMounted(() => {
    store.getList() // 挂载拉取数据
})

// 打开新增弹窗
function handleCreate() {
    dialogMode.value = 'create'
    editRow.value = {}
    dialogVisible.value = true
}
// 打开编辑弹窗
function handleEdit(row: any) {
    dialogMode.value = 'edit'
    editRow.value = { ...row }
    dialogVisible.value = true
}
// 删除权限
function handleDelete(row: any) {
    store.removePermission(row.id)
}
// 弹窗表单提交
async function handleSubmit() {
    if (dialogMode.value === 'create') {
        await store.addPermission(editRow.value)
    } else {
        await store.editPermission(editRow.value)
    }
    dialogVisible.value = false
}
</script>

<template>
    <div>
        <h2>权限管理</h2>
        <!-- 搜索栏 -->
        <!-- 搜索栏（推荐写法，主流、类型安全、极致复用） -->
        <SearchBar v-model="store.search" @search="store.getList">
            <el-button type="primary" @click="handleCreate">新增权限</el-button>
        </SearchBar>

        <!-- 权限表格 -->
        <DataTable :columns="[
            { label: '权限名', prop: 'name' },
            { label: '描述', prop: 'desc' }
        ]" :data="store.list" :loading="store.loading" @edit="handleEdit" @delete="handleDelete" />
        <!-- 分页栏 -->
        <PaginationBar :currentPage="store.page" :pageSize="store.pageSize" :total="store.total"
            @update:currentPage="store.setPage" @update:pageSize="store.setPageSize" />
        <!-- 权限表单弹窗 -->
        <ModalForm :visible="dialogVisible" :title="dialogMode === 'create' ? '新增权限' : '编辑权限'" :loading="store.loading"
            @close="() => (dialogVisible = false)" @submit="handleSubmit">
            <el-form :model="editRow">
                <el-form-item label="权限名">
                    <el-input v-model="editRow.name" />
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="editRow.desc" />
                </el-form-item>
            </el-form>
        </ModalForm>
    </div>
</template>
