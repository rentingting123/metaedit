<template>
  <q-layout view="hHh lpR lFr">
    <!--  text-white -->
    <q-header elevated class="bg-primary" height-hint="98">
      <q-bar class="q-electron-drag color-bg1">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <div class="q-pa-md">
          <q-btn-dropdown label="菜单">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>新建</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>打开</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>保存</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>设置</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <div class="q-pa-md">
          <q-btn-dropdown label="添加">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>场景</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>图片</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>序列帧</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>视频</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>按钮</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>对话</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>按钮组</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <q-space />
        <q-btn flat color="primary" label="运行" />
        <q-btn flat color="primary" label="编译" />
        <q-btn flat color="primary" label="横屏" />
        <q-btn flat color="primary" label="显示比例" />
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

        <div class="side-item color-tx1" @click="psStore.start">图层</div>
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
</script>
<style scoped>

.side-item {
  text-align: center;
  width: 100%;
  margin-top: 12px;
}
</style>
