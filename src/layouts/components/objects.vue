<!--
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2023-12-31 19:28:41
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2023-12-31 23:37:47
 * @FilePath: /code/metaedit/src/layouts/components/objects.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="content">
    <div class="scene color-bg2">
      <div class="color-tx1">图层</div>
    </div>
    <div class="side-list">
      <!-- 图层列表 -->
      <div
        class="side-item color-tx1"
        v-for="(item, index) in objects"
        :key="index"
        :class="{ active: objectsIndex === index }"
        @click="handleObjectsClick(item.type, index)"
      >
        <span>
          <q-icon name="bi-camera-video" v-if="item.type == 1" />
          <q-icon name="bi-cursor-text" v-if="item.type == 2" />
          <q-icon name="bi-card-image" v-if="item.type == 3" />
          <q-icon name="bi-chat-dots" v-if="item.type == 4" />
          <q-icon name="bi-stop-fill" v-if="item.type == 5" />
          <q-icon name="bi-stop-btn" v-if="item.type == 6" />
          <q-icon name="bi-mic" v-if="item.type == 7" />
          {{ item.name }}</span
        >
        <div v-if="item.visible" class="operate">
          <q-icon
            name="bi-eye"
            @click="item.visible = false"
            class="iconstyle"
          />
          <q-icon name="bi-trash3" @click="deleteObjects(index)" />
        </div>
        <q-icon v-else name="bi-eye-slash" @click="item.visible = true" />
      </div>
    </div>
  </div>
</template>

<script setup >
import { ref } from "vue";
// props 接收 objects

// 场景
const props = defineProps({
  objects: {
    //列表数据
    type: Array,
    default: () => [],
  },
});
const objectsIndex = ref(); //图层当前选中
//向外抛出的事件列表
const emit = defineEmits(["handleObjectsClick"]);
// 二级 图层点击
const handleObjectsClick = (type, index) => {
  objectsIndex.value = index;
  emit("handleObjectsClick", type, index);
};
//二级 层级删除
const deleteObjects = (index) => {
  props.objects.splice(index, 1);
};
</script>
<style lang="scss" scoped>
.side-list {
  padding-top: 60px;
}
.operate {
  display: none;
}
.side-item {
  text-align: left;
  width: 100%;
  padding: 6px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* 鼠标移入高亮 */
  &:hover {
    background: #333;
    color: #fff;
    .operate {
      display: block;
    }
  }
  &.active {
    background: #333;
    color: rgb(22, 132, 252);
  }
}

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
.search-ipt {
  height: 20px;
  margin-left: 20px;
}
.iconstyle {
  margin-right: 6px;
}
</style>
