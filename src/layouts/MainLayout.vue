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
      :width="120"
      :breakpoint="500"
      class="color-bg2"
      side="left"
    >
      <q-scroll-area class="fit mini-slot cursor-pointer">
        <div class="q-py-lg">
          <div class="side-item color-tx1">场景</div>
          <div class="side-item color-tx1">开场</div>
          <div class="side-item color-tx1">主场景1</div>
          <div class="side-item color-tx1">场景1</div>
          <div class="side-item color-tx1">场景2</div>
        </div>

        <div class="side-item color-tx1 color-bg2" @click="psStore.start">
          图层
        </div>
        <div class="q-py-lg">
          <div class="side-item color-tx1">视频</div>
          <div class="side-item color-tx1">序列帧</div>
          <div class="side-item color-tx1">图片</div>
          <div class="side-item color-tx1">对话</div>
          <div class="side-item color-tx1">按钮</div>
          <div class="side-item color-tx1">按钮组</div>
        </div>
      </q-scroll-area>
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
// const { ipcRenderer } = require("electron");
// const $q = useQuasar();
// $q.dark
//右上角按钮方法
const handleMainEvent = (eventName) => {
  // ipcRenderer.send(eventName);
};
const onItemClick = (eventName) => {
  // ipcRenderer.send(eventName);
};
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
</script>
<style scoped>
.side-item {
  text-align: center;
  width: 100%;
  margin-top: 12px;
}
</style>
