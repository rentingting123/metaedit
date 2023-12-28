<!--
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2023-12-20 13:45:53
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2023-12-28 10:44:23
 * @FilePath: /code/metaedit/src/layouts/RightForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <!-- 公共属性-->
    <!-- 视频 -->
    <div class="scene color-bg2">
      <div class="color-tx1">属性</div>
    </div>
    <div class="attribute">
      <!-- 视频属性 -->
      <el-form label-position="right" label-width="60px" :model="formValue1">
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">基础</span>
          </div>
          <el-form-item label="类型">
            <div>{{ formValue1.public.typeName }}</div>
          </el-form-item>
          <el-form-item label="id">
            <el-input v-model="formValue1.public.id" />
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="formValue1.public.name" />
          </el-form-item>
          <el-form-item label="变换">
            <div>
              <span class="lable">x</span>
              <el-input-number
                v-model="formValue1.public.size.x"
                :min="1"
                :max="10"
                size="small"
                controls-position="right"
                style="width: 80px"
              />
            </div>
            <div>
              <span class="lable">y</span>
              <el-input-number
                v-model="formValue1.public.size.y"
                :min="1"
                :max="10"
                size="small"
                controls-position="right"
                style="width: 80px"
              />
            </div>
            <div>
              <span class="lable">w</span>
              <el-input-number
                v-model="formValue1.public.size.w"
                :min="1"
                :max="10"
                size="small"
                controls-position="right"
                style="width: 80px"
              />
            </div>
            <div>
              <span class="lable">h</span>
              <el-input-number
                v-model="formValue1.public.size.h"
                :min="1"
                :max="10"
                size="small"
                controls-position="right"
                style="width: 80px"
              />
            </div>
          </el-form-item>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">布局</span>
          </div>
          <el-form-item label="">
            <el-input v-model="formValue1.layout.id" />
          </el-form-item>
          <el-form-item>
            <div>
              <span class="lable">上</span>
              <el-input-number
                v-model="formValue1.layout.up"
                :min="1"
                :max="10"
                size="small"
                controls-position="right"
                style="width: 80px"
              />
            </div>
            <div>
              <span class="lable">下</span>
              <el-input-number
                v-model="formValue1.layout.down"
                :min="1"
                :max="10"
                size="small"
                controls-position="right"
                style="width: 80px"
              />
            </div>
            <div>
              <span class="lable">左</span>
              <el-input-number
                v-model="formValue1.layout.left"
                :min="1"
                :max="10"
                size="small"
                controls-position="right"
                style="width: 80px"
              />
            </div>
            <div>
              <span class="lable">右</span>
              <el-input-number
                v-model="formValue1.layout.right"
                :min="1"
                :max="10"
                size="small"
                controls-position="right"
                style="width: 80px"
              />
            </div>
          </el-form-item>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">控制</span>
          </div>
          <el-form-item label="平铺类型" label-width="100px">
            <el-select
              v-model="formValue1.video.tileId"
              class="m-2"
              placeholder="Select"
              size="small"
            >
              <el-option
                v-for="item in formValue1.video.tileType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">事件</span>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
//视频
const formValue1 = ref({
  // 变换：xy size
  // 显示隐藏
  public: {
    typeId: 1,
    typeName: "几何", //   类型（字符串）：固定值，不可编辑
    id: "", // id（字符串）：可以更改，用作写脚本时查找组件。
    name: "", // 名称（字符串）：可以更改，用作左侧大纲显示名称。
    size: {
      //变换：xy size
      x: 1,
      y: 1,
      w: 10,
      h: 10,
    },
    hide: true, //显示隐藏
  },
  video: {
    path: "", //路径（文件选择）：显示文件路径，点击按钮可以重新选择。
    loop: false, //循环（复选框）：勾选上，视频会自动循环。
    autoplay: false, //自动播放（复选框）：勾选上后，视频会自动播放。
    tileId: 1,
    tileType: [
      {
        value: 1,
        label: "拉伸",
      },
      {
        value: 2,
        label: "满铺",
      },
      {
        value: 3,
        label: "居中",
      },
    ], //平铺类型 可选项：拉伸、满铺、居中。
  },
  layout: {
    id: 1,
    up: 1,
    down: 1,
    left: 1,
    right: 1,
  },
});
</script>

<style lang="scss" scoped>
.scene {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #000;
  /* 固定在顶部栏 */
  position: fixed;
  width: 100%;
}
.attribute {
  padding: 40px 0;
  color: #fff;
  .card {
    border-bottom: 1px solid #333;
    padding: 0 10px;
  }
  .el-card__header {
    padding-top: 0;
    padding-bottom: 0;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    padding: 20px;
  }
  .lable {
    margin-right: 6px;
    margin-left: 6px;
  }
}
</style>