<template>
  <div>
    <div style="margin-bottom: 15px">
      <el-input v-model="params.name" style="width:200px" placeholder="用户名"/>
      <el-input v-model="params.phone" style="width:200px" placeholder="电话"/>
      <el-button type="warning" style="margin-left: 10px" @click="findByserach(params)">查询</el-button>
      <el-button type="primary" style="margin-left: 10px" @click="rest()">清空</el-button>
      <el-button type="primary" style="margin-left: 10px" @click="dialogFormVisible = true">新增</el-button>
    </div>
    <div>
      <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
      >
        <el-table-column prop="id" label="id"/>
        <el-table-column prop="name" label="用户名"/>
        <el-table-column prop="email" label="邮箱"/>
        <el-table-column prop="password" label="密码"/>
        <el-table-column prop="nickname" label="昵称"/>
        <el-table-column prop="phoneNumber" label="电话号码"/>
        <el-table-column prop="createAt" label="注册时间"/>
        <el-table-column prop="updateAt" label="更新时间" />
        <el-table-column prop="isActive" label="是否激活服务" />
        <el-table-column prop="role" label="等级" />
        <el-table-column label="操作">
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="demo-pagination-block">
      <el-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[5, 10, 15, 30]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
    <div>
      <el-dialog v-model="dialogFormVisible" title="新增信息">
        <el-form :model="form">
          <el-form-item size="large" style="width:50%" label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item size="large" label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off" />
          </el-form-item>
          <el-form-item size="large" label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" style="width: 50%" autocomplete="off" />
          </el-form-item>
          <el-form-item size="large" style="width:50%" label="昵称" :label-width="formLabelWidth">
            <el-input v-model="form.nickname" autocomplete="off" />
          </el-form-item>
          <el-form-item size="large" style="width:50%" label="电话号码" :label-width="formLabelWidth">
            <el-input v-model="form.phoneNumber" autocomplete="off" />
          </el-form-item>
          <el-form-item size="large" style="width:50%" label="注册时间" :label-width="formLabelWidth">
            <el-input v-model="form.creatAte" autocomplete="off" />
          </el-form-item>
          <el-form-item size="large" style="width:50%" label="更新时间" :label-width="formLabelWidth">
            <el-input v-model="form.updateAt" autocomplete="off" />
          </el-form-item>
          <el-form-item size="large" label="是否激活服务" :label-width="formLabelWidth">
            <el-radio-group v-model="form.isActive">
              <el-radio label="true" size="large" border>是</el-radio>
              <el-radio label="false" size="large" border>否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item size="large" style="width:50%" label="等级" :label-width="formLabelWidth">
            <el-input v-model="form.role" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submit(form)" >
          确定
        </el-button>
      </span>
        </template>
      </el-dialog>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {reactive,ref, onMounted, getCurrentInstance, UnwrapRef} from 'vue'
// import {request} from "@/request/request";
// import {get,post} from "@/request/api";
import {request,get,post} from "@/request/request";

import { ElMessage } from 'element-plus'

const dialogFormVisible = ref(false)
const formLabelWidth = '200px'
const form = reactive({
  id: null,
  name: null,
  email: null,
  password: null,
  nickname: null,
  phoneNumber: null,
  creatAte: null,
  updateAt: null,
  isActive: false,
  role: null,
})
const total=ref(0);
const currentPage4 = ref(1)
const pageSize4 = ref(5)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const ins=getCurrentInstance()
const params=ref({
  name:"",
  phone:""
})
const load=()=>{
  get("/manage/api/v1/users",{})
      .then((res) =>{
        console.log(res)
        if (res.code==='0'){
          tableData.value=res.data as User[];
        }else{
          console.log("用户拉取失败")
        }
      })
}
const handleSizeChange = (val: number) => {
  pageSize4.value=val;
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  currentPage4.value=val;
  console.log(`current page: ${val}`)
}
interface User {
  id:string,
  name:string,
  email:string,
  password:string,
  nickname:string,
  phoneNumber:number,
  createAt:Date,
  updateAt:Date,
  isActive:boolean,
  role:string
}

const tableRowClassName = ({
                             row,
                             rowIndex,
                           }: {
  row: User
  rowIndex: number
}) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}

const findByserach = (params) => {
  get("/manage/api/v1/users/select", params)
      .then(res => {
        console.log(params);
        if (res.code === "0") {
          tableData.value = res.data.list as User[];
          total.value=res.data.total as number;
        } else {
          console.log("条件查询失败");
        }
      });
}
const rest = ()=>{
  params.value={name:'',phone:''};
  findByserach({});
}

const tableData= ref<User[]>(
    [
      {
        id: 1,
        name:"初始数据1",
        email: 'example1@example.com',
        password: 'password1',
        nickname: 'user1',
        phoneNumber: 1234567890,
        createAt: new Date('2021-09-01'),
        updateAt: new Date('2021-09-02'),
        isActive: true,
        role: 'admin'
      },
      {
        id: 2,
        name:"初始数据2",
        email: 'example2@example.com',
        password: 'password2',
        nickname: 'user2',
        phoneNumber: 9876543210,
        createAt: new Date('2021-09-03'),
        updateAt: new Date('2021-09-04'),
        isActive: false,
        role: 'user'
      }
    ]
)

const submit=(form)=>{
  post("/manage/api/v1/users/update",form).then(res=>{
    if (res.code==='0'){
      ElMessage({
            message:"操作成功",
            type:'success',
      });
    }else{
      let message = res.msg as string;
      ElMessage({
        message: message,
        type:'fail',
      });
    }
    dialogFormVisible.value = false
  })
}

onMounted(()=>{
  findByserach({})
})
</script>

<style>
.demo-pagination-block{
  margin-top: 10px;
}
.demo-pagination-block{
  margin-bottom: 16px;
}
</style>
