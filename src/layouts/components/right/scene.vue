<!--
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2023-12-20 13:45:53
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2023-12-31 23:28:46
 * @FilePath: /code/metaedit/src/layouts/RightForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <!-- 公共属性-->
    <!-- 视频 -->
    {{ props.others }}
    <div class="scene color-bg2">
      <div class="color-tx1">属性</div>
    </div>
    <div class="attribute">
      <!-- 声音属性 -->
      <el-form label-position="right" label-width="60px" :model="props.data">
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">基础</span>
          </div>
          <el-form-item label="类型">
            <div>场景</div>
          </el-form-item>
          <el-form-item label="name">
            <el-input v-model="props.data.name" size="small" />
          </el-form-item>
        </div>
        <div class="card">
          <div class="card-header"></div>
          <el-form-item label="脚本">
            <el-input v-model="props.data.path" size="small" />
          </el-form-item>
          <el-form-item label="方向" prop="name">
            <el-select v-model="props.data.direction" placeholder="请选择">
              <el-option
                v-for="item in directionList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

// 场景
const props = defineProps({
  data: {
    //列表数据
    type: Object,
    default: {
      name: "",
      path: "",
      direction: null,
      objects: [],
    },
  },
});
//视频
const directionList = ref([
  {
    name: "横屏",
  },
  {
    name: "竖屏",
  },
]);
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