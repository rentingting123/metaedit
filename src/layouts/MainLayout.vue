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
                <q-item-section>场景</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>图片</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>序列帧</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>按钮</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>按钮组</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>对话</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>

        <q-space />
        <q-btn flat color="primary" label="运行" @click="handleRun" />
        <q-btn flat color="primary" label="编译" @click="handleCompile" />
        <q-btn flat color="primary" label="横屏" @click="handleLandscape" />
        <q-btn flat color="primary" label="显示比例" @click="handleScale" />
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
                <q-btn
                  flat
                  dense
                  color="primary"
                  label="搜索"
                  @click="searchScene"
                />
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
            <div class="side-list">
              <div
                class="side-item color-tx1"
                v-for="(item, index) in sceneList"
                :key="index"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </template>

        <template v-slot:after>
          <div class="content">
            <div class="scene color-bg2" v-if="!showSearchLevel">
              <div class="color-tx1">图层</div>
              <div>
                <q-btn
                  flat
                  dense
                  color="primary"
                  label="搜索"
                  @click="searchLevel"
                />
              </div>
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
              <div
                class="side-item color-tx1"
                v-for="(item, index) in levelList"
                :key="index"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </template>
      </q-splitter>
    </q-drawer>
    <q-drawer
      v-model="rightDrawerOpen"
      show-if-above
      :width="120"
      :breakpoint="500"
      class="color-bg2"
      side="right"
    >
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup >
// import { useQuasar } from "quasar";
import { ref } from "vue";
const { ipcRenderer } = require("electron");
// const $q = useQuasar();
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
const sceneList = ref([
  {
    id: 1,
    name: "场景1",
  },
  {
    id: 2,
    name: "场景2",
  },
  {
    id: 3,
    name: "场景3",
  },
]);
// 视频
// 序列帧
// 图片
// 对话
// 按钮
// 按钮组
const levelType = ref([
  {
    id: 1,
    name: "视频",
  },
  {
    id: 2,
    name: "序列帧",
  },
  {
    id: 3,
    name: "图片",
  },
  {
    id: 4,
    name: "对话",
  },
  {
    id: 5,
    name: "按钮",
  },
  {
    id: 5,
    name: "按钮组",
  },
]);
const levelList = ref([
  {
    id: 1,
    name: "视频",
  },
  {
    id: 2,
    name: "图片",
  },
  {
    id: 3,
    name: "按钮",
  },
]);
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
    id: sceneList.value.length + 1,
    name: "场景" + (sceneList.value.length + 1),
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
</script>
<style scoped>
.side-list {
  padding-top: 60px;
}
.side-item {
  text-align: left;
  width: 100%;
  padding: 6px 10px;
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
</style>
