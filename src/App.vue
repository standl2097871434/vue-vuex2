<template>
  <el-container>
    <el-aside :width="asideWidth">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-menu
          :default-active="$route.path"
          router
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @close="handleClose"
          @open="handleOpen"

      >
        <el-menu-item index="/">
          <el-icon><icon-menu /></el-icon>
          <template #title>首页</template>
        </el-menu-item>
        <el-menu-item index="/home">
          <el-icon><document /></el-icon>
          <template #title>训练项目</template>
        </el-menu-item>
        <el-menu-item index="/manage">
          <el-icon><setting /></el-icon>
          <template #title>管理页</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>

</template>

<script lang="ts" setup>
import {ref, watch} from 'vue'
import {
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(true)
const asideWidth =ref('100px')

watch(isCollapse,(newvalue)=>{
  if (newvalue){
    asideWidth.value='100px'
  }else{
    asideWidth.value='200px'
  }
})
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
