<!--
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2023-12-20 13:45:53
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2023-12-29 22:56:23
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
      <el-form label-position="right" label-width="60px" :model="formValue3">
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">基础</span>
          </div>
          <el-form-item label="类型">
            <div>图片</div>
          </el-form-item>
          <el-form-item label="name">
            <el-input v-model="formValue3.name" size="small" />
          </el-form-item>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">资源</span>
          </div>
          <el-form-item label="路径">
            <el-input v-model="formValue3.path" size="small" />
          </el-form-item>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">布局</span>
          </div>
          <el-form-item label="" label-width="20px">
            <el-select
              v-model="formValue3.layout.id"
              class="m-2"
              placeholder="Select"
              size="small"
            >
              <el-option
                v-for="item in layoutList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label-width="20px">
            <div>
              <span class="lable">上</span>
              <el-input-number
                v-model="formValue3.layout.up"
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
                v-model="formValue3.layout.down"
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
                v-model="formValue3.layout.left"
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
                v-model="formValue3.layout.right"
                :min="1"
                :max="10"
                size="small"
                controls-position="right"
                style="width: 80px"
              />
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
const layoutList = [
  {
    value: 1,
    label: "拉伸",
  },
  {
    value: 2,
    label: "缩放居中",
  },
  {
    value: 3,
    label: "铺满居中",
  },
]; //平铺类型 可选项：拉伸、满铺、居中。
//视频
const formValue3 = ref({
  type: "photo",
  name: "",
  path: "", //路径（文件选择）：显示文件路径，点击按钮可以重新选择。
  loop: false, //循环（复选框）：勾选上，视频会自动循环。
  autoplay: false, //自动播放（复选框）：勾选上后，视频会自动播放。
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
.btn-group {
  // display: flex;
  // justify-content: space-between;
  text-align: right;
}
.card-body {
  padding: 10px 20px;
  border: 1px solid #333;
  color: $text1;
  margin: 10px;
  .card-body-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
    .card-body-item-name {
      .avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .iconstyle {
        margin-right: 10px;
      }
    }
  }
}
</style>