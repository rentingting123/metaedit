<!--
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2024-01-01 21:27:02
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2024-01-02 15:56:29
 * @FilePath: /code/metaedit/src/layouts/MainLayout.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div v-if="project.projectList.length">
      <q-layout view="hHh lpR lFr">
        <q-header elevated class="bg-primary" height-hint="128">
          <q-bar class="color-bg1">
            <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
            <div class="cursor-pointer non-selectable">
              菜单
              <q-menu dark>
                <q-list dense style="min-width: 100px">
                  <q-item clickable v-close-popup @click="openProject">
                    <q-item-section>新建</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section @click="viewOpenFile">打开</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-close-popup>
                    <q-item-section @click="viewSaveFile">保存</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section @click="viewSelectFile"
                      >设置</q-item-section
                    >
                  </q-item>
                </q-list>
              </q-menu>
            </div>

            <div class="q-ml-md cursor-pointer non-selectable">
              添加
              <q-menu auto-close dark>
                <q-list dense style="min-width: 100px">
                  <q-item clickable>
                    <q-item-section @click="scene.addScene">
                      <div>
                        <q-icon name="bi-layout-wtf" class="iconstyle" />场景
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item
                    clickable
                    @click="scene.handleAddSceneType('video', scene.sceneIndex)"
                  >
                    <q-item-section>
                      <div>
                        <q-icon name="bi-camera-video" class="iconstyle" />视频
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    @click="scene.handleAddSceneType('frame', scene.sceneIndex)"
                  >
                    <q-item-section>
                      <div>
                        <q-icon name="bi-cursor-text" class="iconstyle" />序列帧
                      </div></q-item-section
                    >
                  </q-item>
                  <q-separator />
                  <q-item
                    clickable
                    @click="scene.handleAddSceneType('photo', scene.sceneIndex)"
                  >
                    <q-item-section>
                      <div>
                        <q-icon name="bi-card-image" class="iconstyle" />图片
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    @click="
                      scene.handleAddSceneType('dialog', scene.sceneIndex)
                    "
                  >
                    <q-item-section
                      ><div>
                        <q-icon name="bi-chat-dots" class="iconstyle" />对话
                      </div></q-item-section
                    >
                  </q-item>
                  <q-item
                    clickable
                    @click="
                      scene.handleAddSceneType('button', scene.sceneIndex)
                    "
                  >
                    <q-item-section
                      ><div>
                        <q-icon name="bi-stop-fill" class="iconstyle" />按钮
                      </div></q-item-section
                    >
                  </q-item>
                  <q-item
                    clickable
                    @click="
                      scene.handleAddSceneType('buttonGroup', scene.sceneIndex)
                    "
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
                    @click="scene.handleAddSceneType('audio', scene.sceneIndex)"
                  >
                    <q-item-section
                      ><div>
                        <q-icon name="bi-mic" class="iconstyle" />声音
                      </div></q-item-section
                    >
                  </q-item>
                </q-list>
              </q-menu>
            </div>

            <q-space />
            <q-btn flat color="primary" label="运行" @click="handleRun" />
            <q-btn flat color="primary" label="编译" @click="handleCompile" />

            <q-space />
            <q-btn dense flat icon="minimize" @click="handleMainEvent('min')" />
            <q-btn
              dense
              flat
              icon="crop_square"
              @click="handleMainEvent('max')"
            />
            <q-btn dense flat icon="close" @click="handleMainEvent('close')" />
          </q-bar>
        </q-header>
        <!-- 左侧抽屉 -->
        <MainLayoutLeft />
        <MainLayoutRight />
        <q-page-container>
          {{ project.projectList[0] }}
          <router-view />
        </q-page-container>
      </q-layout>
    </div>
    <el-empty v-else description="暂无项目，请先新建项目吧">
      <el-button type="primary" @click="openProject">新建</el-button>
    </el-empty>
    <addProject ref="addProjectRef"></addProject>
  </div>
</template>

<script setup >
import { ref } from "vue";

const { ipcRenderer } = require("electron");

import { useProjectStore } from "stores/project";
import { useEditStore } from "stores/edit";
import { useMainStore } from "stores/main";
import { useSceneStore } from "stores/scene";

import MainLayoutLeft from "./MainLayoutLeft.vue";
import MainLayoutRight from "./MainLayoutRight.vue";
import addProject from "./components/addProject.vue";

const edit = useEditStore(); //编辑
const main = useMainStore(); //主页面
const project = useProjectStore(); //项目
const scene = useSceneStore();

//左侧抽屉
const toggleLeftDrawer = () => {
  main.leftDrawerOpen = !main.leftDrawerOpen;
};

//打开添加弹框
const addProjectRef = ref();
const openProject = () => {
  addProjectRef.value.open();
};

//菜单 - 打开
const viewOpenFile = async () => {
  // openFile 该方法只返回文件路径，适用于打开文件。

  //打开并读取，返回文件内容。openAndReadFile
  // let rel = await openFile();
  let rel = await edit.openFile();

  //打开成功
  if (rel) {
    console.log("文件路径:", rel.filePath);
    console.log("文件内容:", rel.data.toString());
  } else {
    //用户取消，什么都不做。
  }
};
//保存文件，返回文件路径和内容
const viewSaveFile = async () => {
  // openFile 该方法只返回文件路径，适用于打开文件。
  //打开并读取，返回文件内容。
  let filePath = await saveFile({ data: "保存的内容" });
  //打开成功
  if (filePath && typeof filePath) {
    console.log("保存成功 filePath:", filePath);
  } else {
    //用户取消，什么都不做。
  }
};
// 设置 选择文件，只返回选择的文件路径，不返回文件内容
const viewSelectFile = async () => {
  //选择并读取，返回文件内容。
  let filePath = await selectFile();
  //打开成功
  if (filePath && typeof filePath) {
    console.log("选择文件 filePath:", filePath);
  } else {
    //用户取消，什么都不做。
  }
};
//运行
const handleRun = () => {
  console.log("运行");
};
//编译
const handleCompile = () => {
  console.log("编译");
};
//右上角按钮方法
const handleMainEvent = (eventName) => {
  ipcRenderer.send(eventName);
};
</script>
<style lang="scss" scoped>
</style>
