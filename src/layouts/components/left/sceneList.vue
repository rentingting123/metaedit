<template>
  <div class="content">
    <div class="scene color-bg2">
      <div class="color-tx1">场景</div>
      <div>
        <q-btn
          flat
          color="primary"
          label="添加"
          @click="scene.addScene"
          dense
        />
      </div>
    </div>

    <!-- 场景列表 -->
    <div class="side-list">
      <div
        class="side-item color-tx1"
        v-for="(item, index) in sceneList"
        :key="index"
        :class="{ active: scene.sceneIndex === index }"
        @click="handleSceneClick(index)"
      >
        <span>
          <q-icon
            v-if="index === scene.main"
            name="bi-layout-wtf"
            class="iconstyle"
          />
          <span v-if="index === scene.renameSceneIpt">
            <el-input
              v-model="item.name"
              style="width: 100px"
              @blur="scene.renameSceneIpt = ''"
          /></span>
          <span v-else>{{ item.name }}</span>
        </span>
        <div class="side-item-menu">
          <q-icon name="bi-three-dots-vertical" class="menu-icon" />
          <q-menu dark transition-show="flip-right" transition-hide="flip-left">
            <q-list dense style="min-width: 100px">
              <q-item>
                <q-item-section> 添加 </q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right" />
                </q-item-section>
                <q-menu
                  auto-close
                  dark
                  transition-show="flip-right"
                  transition-hide="flip-left"
                  anchor="top end"
                  self="top start"
                >
                  <q-list dense style="min-width: 100px">
                    <q-item
                      clickable
                      @click="scene.handleAddSceneType('video', index)"
                    >
                      <q-item-section>
                        <div>
                          <q-icon
                            name="bi-camera-video"
                            class="iconstyle"
                          />视频
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      @click="scene.handleAddSceneType('frame', index)"
                    >
                      <q-item-section>
                        <div>
                          <q-icon
                            name="bi-cursor-text"
                            class="iconstyle"
                          />序列帧
                        </div></q-item-section
                      >
                    </q-item>
                    <q-separator />
                    <q-item
                      clickable
                      @click="scene.handleAddSceneType('photo', index)"
                    >
                      <q-item-section>
                        <div>
                          <q-icon name="bi-card-image" class="iconstyle" />图片
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      @click="scene.handleAddSceneType('dialog', index)"
                    >
                      <q-item-section
                        ><div>
                          <q-icon name="bi-chat-dots" class="iconstyle" />对话
                        </div></q-item-section
                      >
                    </q-item>
                    <q-item
                      clickable
                      @click="scene.handleAddSceneType('button', index)"
                    >
                      <q-item-section
                        ><div>
                          <q-icon name="bi-stop-fill" class="iconstyle" />按钮
                        </div></q-item-section
                      >
                    </q-item>
                    <q-item
                      clickable
                      @click="scene.handleAddSceneType('buttonGroup', index)"
                    >
                      <q-item-section
                        ><div>
                          <q-icon name="bi-stop-btn" class="iconstyle" />按钮组
                        </div></q-item-section
                      >
                    </q-item>
                    <q-separator />
                    <q-item
                      clickable
                      @click="scene.handleAddSceneType('audio', index)"
                    >
                      <q-item-section
                        ><div>
                          <q-icon name="bi-mic" class="iconstyle" />声音
                        </div></q-item-section
                      >
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
              <q-item v-close-popup clickable>
                <q-item-section @click="scene.copyCreate(item)"
                  >创建副本
                </q-item-section>
              </q-item>
              <q-item v-close-popup clickable>
                <q-item-section @click="scene.renameScene(index)"
                  >重命名</q-item-section
                >
              </q-item>
              <q-separator />
              <q-item v-close-popup clickable v-if="sceneList.length > 1">
                <q-item-section @click="scene.deleteScene(index)"
                  >删除</q-item-section
                >
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section @click="scene.setSceneStart(index, item.name)"
                  >设置为启动场景</q-item-section
                >
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup >
import { watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { useSceneStore } from "stores/scene";
const scene = useSceneStore();

//向外抛出的事件列表
const sceneList = scene.scenesList;
// 一级场景点击
const handleSceneClick = (index) => {
  scene.sceneIndex = index;
  scene.curType = "scene";
};
</script>
<style lang="scss" scoped>
.side-list {
  padding-top: 60px;
}
.side-item-menu {
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
    .side-item-menu {
      display: block;
    }
  }
  &.active {
    background: #333;
    color: rgb(22, 132, 252);
    .side-item-menu {
      display: block;
    }
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
