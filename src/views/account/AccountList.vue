<script setup lang="ts">
/**
 * 用户管理页面 AccountList
 * - 业务零耦合，只负责调用store和渲染UI
 * - 极致注释，谷歌CTO标准
 */
import { onMounted, ref } from 'vue'                             // 引入Vue核心API
import { useAccountStore } from '@/store/modules/account'        // 引入用户管理store
import DataTable from '@/components/DataTable.vue'               // 通用表格组件
import SearchBar from '@/components/SearchBar.vue'               // 通用搜索栏
import PaginationBar from '@/components/PaginationBar.vue'       // 通用分页组件
import ModalForm from '@/components/ModalForm.vue'               // 通用表单弹窗
import AssignSelector from '@/components/AssignSelector.vue'     // 角色多选组件（分配角色）

const store = useAccountStore()                                 // 初始化store

// 弹窗和表单状态
const dialogVisible = ref(false)                                // 控制新增/编辑弹窗显示
const dialogMode = ref<'create' | 'edit'>('create')             // 弹窗模式（新增/编辑）
const editRow = ref<any>({})                                    // 当前编辑/新增数据
const assignDialogVisible = ref(false)                          // 控制分配角色弹窗显示
const assignUserId = ref<string>('')                            // 当前正在分配角色的用户ID

onMounted(() => {
    store.getList()                                               // 页面挂载时自动拉取用户列表
})

// 打开新增用户弹窗
function handleCreate() {
    dialogMode.value = 'create'                                   // 设为创建模式
    editRow.value = {}                                            // 清空表单
    dialogVisible.value = true                                    // 打开弹窗
}

// 打开编辑用户弹窗
function handleEdit(row: any) {
    dialogMode.value = 'edit'                                     // 设为编辑模式
    editRow.value = { ...row }                                    // 赋值当前行
    dialogVisible.value = true                                    // 打开弹窗
}

// 删除用户
function handleDelete(row: any) {
    store.removeAccount(row.id)                                   // 调用store删除用户
}

// 弹窗表单提交
async function handleSubmit() {
    if (dialogMode.value === 'create') {                          // 新建
        await store.addAccount(editRow.value)
    } else {                                                      // 编辑
        await store.editAccount(editRow.value)
    }
    dialogVisible.value = false                                   // 关闭弹窗
}

// 打开分配角色弹窗
async function handleAssignRole(row: any) {
    assignUserId.value = row.id                                   // 记录当前用户id
    await store.getAllRoles()                                     // 拉取所有角色
    await store.getUserRoles(row.id)                              // 拉取该用户已分配角色
    assignDialogVisible.value = true                              // 打开分配弹窗
}

// 分配角色提交
async function handleAssignRoleSubmit() {
    await store.assignRoles(assignUserId.value, store.selectedRoleIds) // 分配角色接口
    assignDialogVisible.value = false                              // 关闭弹窗
}
</script>

<template>
    <div>
        <h2>用户管理</h2> <!-- 页面标题 -->

        <!-- 搜索栏，支持v-model绑定和搜索按钮 -->
        <SearchBar v-model="store.search" @search="store.getList">
            <el-button type="primary" @click="handleCreate">新增用户</el-button> <!-- 新建按钮 -->
        </SearchBar>

        <!-- 用户表格，插槽自定义操作按钮 -->
        <DataTable :columns="[
            { label: '用户名', prop: 'username' },
            { label: '邮箱', prop: 'email' },
            { label: '电话', prop: 'phone' },
            { label: '状态', prop: 'status' },
            { label: '操作', prop: 'actions', slot: 'actions' }
        ]" :data="store.list" @edit="handleEdit" @delete="handleDelete">
            <!-- 操作栏插槽，传递当前行 row -->
            <template #actions="{ row }">
                <el-button size="small" @click="handleEdit(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
                <el-button size="small" type="primary" @click="handleAssignRole(row)">分配角色</el-button>
            </template>
        </DataTable>

        <!-- 分页栏 -->
        <PaginationBar :currentPage="store.page" :pageSize="store.pageSize" :total="store.total"
            @update:currentPage="store.setPage" @update:pageSize="store.setPageSize" />

        <!-- 用户表单弹窗，通用ModalForm组件 -->
        <ModalForm :visible="dialogVisible" :title="dialogMode === 'create' ? '新增用户' : '编辑用户'"
            @close="() => (dialogVisible = false)" @submit="handleSubmit">
            <el-form :model="editRow">
                <el-form-item label="用户名">
                    <el-input v-model="editRow.username" />
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="editRow.email" />
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="editRow.phone" />
                </el-form-item>
                <el-form-item v-if="dialogMode === 'create'" label="密码">
                    <el-input v-model="editRow.password" type="password" />
                </el-form-item>
                <!-- 其它字段可继续补充 -->
            </el-form>
        </ModalForm>

        <!-- 分配角色弹窗，复用ModalForm和多选通用组件 -->
        <ModalForm :visible="assignDialogVisible" title="分配角色" @close="() => (assignDialogVisible = false)"
            @submit="handleAssignRoleSubmit">
            <AssignSelector v-model="store.selectedRoleIds" :allOptions="store.allRoles" optionLabel="name"
                optionValue="id" />
        </ModalForm>
    </div>
</template>
