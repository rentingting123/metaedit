<template>
  <q-layout view="hHh lpR lFr">
    <!--  text-white -->
    <q-header elevated class="bg-primary" height-hint="128">
      <q-bar class="color-bg1">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <div class="cursor-pointer non-selectable">
          菜单
          <q-menu dark transition-show="flip-right" transition-hide="flip-left">
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>新建</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>打开</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>保存</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>设置</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>

        <div class="q-ml-md cursor-pointer non-selectable">
          添加
          <q-menu
            auto-close
            dark
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            <q-list dense style="min-width: 100px">
              <q-item clickable>
                <q-item-section @click="addScene">
                  <div>
                    <q-icon name="bi-layout-wtf" class="iconstyle" />场景
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="handleAddSceneType(1, sceneIndex)">
                <q-item-section>
                  <div>
                    <q-icon name="bi-camera-video" class="iconstyle" />视频
                  </div>
                </q-item-section>
              </q-item>
              <q-item clickable @click="handleAddSceneType(2, sceneIndex)">
                <q-item-section>
                  <div>
                    <q-icon name="bi-cursor-text" class="iconstyle" />序列帧
                  </div></q-item-section
                >
              </q-item>
              <q-separator />
              <q-item clickable @click="handleAddSceneType(3, sceneIndex)">
                <q-item-section>
                  <div>
                    <q-icon name="bi-card-image" class="iconstyle" />图片
                  </div>
                </q-item-section>
              </q-item>
              <q-item clickable @click="handleAddSceneType(4, sceneIndex)">
                <q-item-section
                  ><div>
                    <q-icon name="bi-chat-dots" class="iconstyle" />对话
                  </div></q-item-section
                >
              </q-item>
              <q-item clickable @click="handleAddSceneType(5, sceneIndex)">
                <q-item-section
                  ><div>
                    <q-icon name="bi-stop-fill" class="iconstyle" />按钮
                  </div></q-item-section
                >
              </q-item>
              <q-item clickable @click="handleAddSceneType(6, sceneIndex)">
                <q-item-section
                  ><div>
                    <q-icon name="bi-stop-btn" class="iconstyle" />按钮组
                  </div></q-item-section
                >
              </q-item>
              <q-separator />
              <q-item clickable @click="handleAddSceneType(7, sceneIndex)">
                <q-item-section
                  ><div>
                    <q-icon name="bi-suit-diamond" class="iconstyle" />声音
                  </div></q-item-section
                >
              </q-item>
            </q-list>
          </q-menu>
        </div>

        <q-space />
        <q-btn flat color="primary" label="运行" @click="handleRun" />
        <q-btn flat color="primary" label="编译" @click="handleCompile" />
        <q-btn flat color="primary" label="横屏" @click="handleLandscape" />
        <div>
          <q-btn flat color="primary" label="显示比例" @click="handleScale" />
          <q-menu
            auto-close
            dark
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            <q-list dense style="min-width: 100px">
              <q-item clickable>
                <q-item-section>4:3 </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>16:9</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>3:2</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>自定义</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>

        <q-space />
        <q-btn dense flat icon="minimize" @click="handleMainEvent('min')" />
        <q-btn dense flat icon="crop_square" @click="handleMainEvent('max')" />
        <q-btn dense flat icon="close" @click="handleMainEvent('close')" />
      </q-bar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="500"
      class="color-bg2"
      side="left"
    >
      <q-splitter v-model="splitterModel" horizontal dark style="height: 100%">
        <template v-slot:before>
          <div class="content">
            <div class="scene color-bg2" v-if="!showSearchScene">
              <div class="color-tx1">场景</div>
              <div>
                <q-btn
                  flat
                  color="primary"
                  label="添加"
                  @click="addScene"
                  dense
                />
                <!-- <q-btn flat dense color="primary" label="搜索" @click="searchScene" /> -->
              </div>
            </div>
            <div class="scene color-bg2" v-else>
              <q-icon
                style="color: #ccc; font-size: 1.4em"
                name="bi-arrow-left-short"
                @click="searchScene"
              />
              <div>
                <q-input
                  dark
                  rounded
                  clearable
                  v-model="sceneText"
                  placeholder="关键字搜索"
                  standout
                  dense
                  hide-bottom-space
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
            </div>
            <!-- 场景列表 -->
            <div class="side-list">
              <div
                class="side-item color-tx1"
                v-for="(item, index) in sceneList"
                :key="index"
                :class="{ active: sceneIndex === index }"
                @click="handleSceneClick(index)"
              >
                <span>
                  <q-icon name="bi-layout-wtf" class="iconstyle" />
                  {{ item.name }}
                </span>

                <div v-if="sceneIndex === index">
                  <q-icon
                    name="bi-trash3"
                    class="iconstyle"
                    v-if="sceneList.length > 1"
                    @click="deleteScene(index)"
                  />
                  <span>
                    <q-icon name="bi-plus" />
                    <q-menu
                      auto-close
                      dark
                      transition-show="flip-right"
                      transition-hide="flip-left"
                    >
                      <q-list dense style="min-width: 100px">
                        <q-item clickable @click="handleAddSceneType(1, index)">
                          <q-item-section>
                            <div>
                              <q-icon
                                name="bi-camera-video"
                                class="iconstyle"
                              />视频
                            </div>
                          </q-item-section>
                        </q-item>
                        <q-item clickable @click="handleAddSceneType(2, index)">
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
                        <q-item clickable @click="handleAddSceneType(3, index)">
                          <q-item-section>
                            <div>
                              <q-icon
                                name="bi-card-image"
                                class="iconstyle"
                              />图片
                            </div>
                          </q-item-section>
                        </q-item>
                        <q-item clickable @click="handleAddSceneType(4, index)">
                          <q-item-section
                            ><div>
                              <q-icon
                                name="bi-chat-dots"
                                class="iconstyle"
                              />对话
                            </div></q-item-section
                          >
                        </q-item>
                        <q-item clickable @click="handleAddSceneType(5, index)">
                          <q-item-section
                            ><div>
                              <q-icon
                                name="bi-stop-fill"
                                class="iconstyle"
                              />按钮
                            </div></q-item-section
                          >
                        </q-item>
                        <q-item clickable @click="handleAddSceneType(6, index)">
                          <q-item-section
                            ><div>
                              <q-icon
                                name="bi-stop-btn"
                                class="iconstyle"
                              />按钮组
                            </div></q-item-section
                          >
                        </q-item>
                        <q-separator />
                        <q-item clickable @click="handleAddSceneType(7, index)">
                          <q-item-section
                            ><div>
                              <q-icon
                                name="bi-suit-diamond"
                                class="iconstyle"
                              />声音
                            </div></q-item-section
                          >
                        </q-item>
                      </q-list>
                    </q-menu>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-slot:after>
          <div class="content">
            <div class="scene color-bg2" v-if="!showSearchLevel">
              <div class="color-tx1">图层</div>
              <!-- <div>
                <q-btn
                  flat
                  dense
                  label="搜索"
                  color="primary"
                  @click="searchLevel"
                />
              </div> -->
            </div>
            <div class="scene color-bg2" v-else>
              <q-icon
                style="color: #ccc; font-size: 1.4em"
                name="bi-arrow-left-short"
                @click="searchLevel"
              />
              <div>
                <q-input
                  dark
                  rounded
                  clearable
                  v-model="sceneText"
                  placeholder="关键字搜索"
                  standout
                  dense
                  hide-bottom-space
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
            </div>
            <div class="side-list">
              <!-- 图层列表 -->
              <div
                class="side-item color-tx1"
                v-for="(item, index) in sceneList[sceneIndex].levelList"
                :key="index"
                :class="{ active: levelIndex === index }"
                @click="handleLevelClick(item.type, index)"
              >
                <span>
                  <q-icon name="bi-camera-video" v-if="item.type == 1" />
                  <q-icon name="bi-cursor-text" v-if="item.type == 2" />
                  <q-icon name="bi-card-image" v-if="item.type == 3" />
                  <q-icon name="bi-chat-dots" v-if="item.type == 4" />
                  <q-icon name="bi-stop-fill" v-if="item.type == 5" />
                  <q-icon name="bi-stop-btn" v-if="item.type == 6" />
                  <q-icon name="bi-suit-diamond" v-if="item.type == 7" />
                  {{ item.name }}</span
                >
                <div v-if="item.isShow">
                  <q-icon
                    name="bi-trash3"
                    @click="deleteLevel(index)"
                    class="iconstyle"
                  />
                  <q-icon name="bi-eye" @click="item.isShow = false" />
                </div>
                <q-icon
                  v-else
                  name="bi-eye-slash"
                  @click="item.isShow = true"
                />
              </div>
            </div>
          </div>
        </template>
      </q-splitter>
    </q-drawer>
    <q-drawer
      v-model="rightDrawerOpen"
      show-if-above
      :width="320"
      :breakpoint="500"
      class="color-bg2"
      side="right"
    >
      <RightForm1 v-if="curType == 1"></RightForm1>
      <RightForm2 v-if="curType == 2"></RightForm2>
      <RightForm3 v-if="curType == 3"></RightForm3>
      <RightForm4 v-if="curType == 4"></RightForm4>
      <RightForm5 v-if="curType == 5"></RightForm5>
      <RightForm6 v-if="curType == 6"></RightForm6>
      <RightForm7 v-if="curType == 7"></RightForm7>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup >
import { ref } from "vue";
const { ipcRenderer } = require("electron");
import RightForm1 from "./RightForm1.vue";
import RightForm2 from "./RightForm2.vue";
import RightForm3 from "./RightForm3.vue";
import RightForm4 from "./RightForm4.vue";
import RightForm5 from "./RightForm5.vue";
import RightForm6 from "./RightForm6.vue";
import RightForm7 from "./RightForm7.vue";

//组件注册

// $q.dark
//右上角按钮方法
const handleMainEvent = (eventName) => {
  ipcRenderer.send(eventName);
};
const splitterModel = ref(50); // start at 50%
// 场景
const sceneText = ref("");
const showSearchScene = ref(false); //场景
const showSearchLevel = ref(false); //图层
const sceneIndex = ref(0); //场景当前选中
const levelIndex = ref(0); //图层当前选中
const curType = ref(1); //类型当前选中
const sceneList = ref([
  {
    id: 1,
    name: "场景1",
    levelList: [
      {
        id: new Date().getTime(), //获取当前时间戳
        type: 1,
        name: "视频",
        isShow: true,
      },
      {
        id: new Date().getTime(), //获取当前时间戳
        type: 2,
        name: "序列帧",
        isShow: true,
      },
      {
        id: new Date().getTime(), //获取当前时间戳
        type: 3,
        name: "图片",
        isShow: true,
      },
      {
        id: new Date().getTime(), //获取当前时间戳
        type: 4,
        name: "对话",
        isShow: true,
      },
      {
        id: new Date().getTime(), //获取当前时间戳
        type: 5,
        name: "按钮",
        isShow: true,
      },
      {
        id: new Date().getTime(), //获取当前时间戳
        type: 6,
        name: "按钮组",
        isShow: true,
      },
      {
        id: new Date().getTime(), //获取当前时间戳
        type: 7,
        name: "声音",
        isShow: true,
      },
    ], //图层
  },
  {
    id: 2,
    name: "场景2",
    levelList: [
      {
        id: new Date().getTime(), //获取当前时间戳
        type: 1,
        name: "视频",
        isShow: true,
      },
      {
        id: new Date().getTime(), //获取当前时间戳
        type: 2,
        name: "序列帧",
        isShow: true,
      },
      {
        id: new Date().getTime(), //获取当前时间戳
        type: 3,
        name: "图片",
        isShow: true,
      },
      {
        id: new Date().getTime(), //获取当前时间戳
        type: 4,
        name: "对话",
        isShow: true,
      },
      {
        id: new Date().getTime(), //获取当前时间戳
        type: 5,
        name: "按钮",
        isShow: true,
      },
      {
        id: new Date().getTime(), //获取当前时间戳
        type: 6,
        name: "按钮组",
        isShow: true,
      },
      {
        id: new Date().getTime(), //获取当前时间戳
        type: 7,
        name: "声音",
        isShow: true,
      },
    ], //图层
  },
  {
    id: 3,
    name: "场景3",
    levelList: [], //图层
  },
  {
    id: 4,
    name: "场景4",
    levelList: [], //图层
  },
  {
    id: 5,
    name: "场景5",
    levelList: [], //图层
  },
]);
// 视频
// 序列帧
// 图片
// 对话
// 按钮
// 按钮组
// 声音
const levelType = ref({
  1: "视频",
  2: "序列帧",
  3: "图片",
  4: "对话",
  5: "按钮",
  6: "按钮组",
  7: "声音",
});

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(true);
const toggleLeftDrawer = (eventName) => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
//运行
const handleRun = () => {
  console.log("run");
};
//编译
const handleCompile = () => {
  console.log("compile");
};
//  横屏
const handleLandscape = () => {
  console.log("landscape");
};
//handleScale
const handleScale = () => {
  console.log("scale");
};
//添加场景
const addScene = () => {
  console.log("addScene");
  //给sceneList 追加
  sceneList.value.push({
    id: new Date().getTime(), //获取当前时间戳
    name: "场景" + (sceneList.value.length + 1),
    levelList: [], //图层
  });
};
//搜索场景
const searchScene = () => {
  showSearchScene.value = !showSearchScene.value;
};
//搜索图层
const searchLevel = () => {
  showSearchLevel.value = !showSearchLevel.value;
};
// 一级场景点击
const handleSceneClick = (index) => {
  sceneIndex.value = index;
};
//场景删除
const deleteScene = (index) => {
  sceneList.value.splice(index, 1);
};
//添加场景类型
const handleAddSceneType = (type, index) => {
  //给sceneList[index].levelList 追加
  sceneList.value[index].levelList.push({
    id: new Date().getTime(), //获取当前时间戳
    type: type,
    name: levelType.value[type] + (sceneList.value[index].levelList.length + 1),
    isShow: true,
  });
};
// 二级 图层点击
const handleLevelClick = (type, index) => {
  levelIndex.value = index;
  curType.value = type;
};
//二级 层级删除
const deleteLevel = (index) => {
  sceneList.value[sceneIndex.value].levelList.splice(index, 1);
};
</script>
<style scoped>
.side-list {
  padding-top: 60px;
}
.side-item {
  text-align: left;
  width: 100%;
  padding: 6px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.active {
  background: #333;
  color: #fff;
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
