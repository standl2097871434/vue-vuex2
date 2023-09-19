<template>
  <el-alert
    title="训练小贴士"
    type="success"
    description="本训练是刺激训练。训练过程中请患者集中注意力观看小兔子跳舞的动作，跟着歌曲一起摇摆吧。本训练是观看类训练，无需进行操作。"
    show-icon
  />
  <el-row>
    <el-col
        v-for="(o, index) in 1"
        :key="o"
        :span="8"
        :offset="index > 0 ? 2 : 0"
    >
      <el-card :body-style="{ padding: '0px' }">
        <div style="padding: 14px">
          <div class="bottom">
            <Game/>
            <el-button type="primary">开始</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Game from "@/components/Game.vue";

const currentDate = ref(new Date())
</script>

<style>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
