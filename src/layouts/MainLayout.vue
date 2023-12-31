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
              <q-item clickable v-close-popup @click="dialogProject = true">
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
                <q-item-section @click="viewSelectFile">设置</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>

        <!-- <div class="q-ml-md cursor-pointer non-selectable">
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
                    <q-icon name="bi-mic" class="iconstyle" />声音
                  </div></q-item-section
                >
              </q-item>
            </q-list>
          </q-menu>
        </div> -->

        <q-space />
        <q-btn flat color="primary" label="运行" @click="handleRun" />
        <q-btn flat color="primary" label="编译" @click="handleCompile" />

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
          <SceneList
            @handleSceneList="handleSceneList"
            @handleMain="handleMain"
            @handleSceneIndex="handleSceneIndex"
          ></SceneList>
        </template>

        <template v-slot:after>
          <Objects
            :objects="default_project.sceneList[sceneIndex].objects"
            @handleObjectsClick="handleObjectsClick"
          ></Objects>
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
      <Video v-if="curType == 'video'"></Video>
      <Frame v-if="curType == 'frame'"></Frame>
      <Photo v-if="curType == 'photo'"></Photo>
      <Dialog v-if="curType == 'dialog'"></Dialog>
      <Button v-if="curType == 'button'"></Button>
      <ButtonGroup v-if="curType == 'buttonGroup'"></ButtonGroup>
      <Audio v-if="curType == 'audio'"></Audio>
      <!--   :data="default_project.sceneList[sceneIndex].objects[objectsIndex]" -->
      <Scene
        v-if="curType == 'scene'"
        :data="default_project.sceneList[sceneIndex]"
      ></Scene>
    </q-drawer>
    <!-- 新建弹框 -->
    <el-dialog v-model="dialogProject" title="新建">
      <el-form :model="formProject" :rules="rules" ref="projectRef">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="formProject.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="保存路径" prop="rootPath">
          <el-input
            v-model="formProject.rootPath"
            autocomplete="off"
            style="width: 90%; margin-right: 10px"
          />
          <q-icon
            style="color: #ccc; font-size: 1.4em"
            name="bi-files"
            @click="selectFilePath"
          ></q-icon>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm"> 确定 </el-button>
          <el-button @click="dialogProject = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <q-page-container>
      {{ sceneIndex }}
      {{ objectsIndex }}
      {{ curType }}
      <br />
      {{ default_project }}
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup >
import { ref } from "vue";
import SceneList from "./components/sceneList.vue";
import Objects from "./components/objects.vue";

import Scene from "./components/right/scene.vue";
import Video from "./components/right/video.vue";
import Frame from "./components/right/frame.vue";
import Photo from "./components/right/photo.vue";
import Dialog from "./components/right/dialog.vue";
import Button from "./components/right/button.vue";
import ButtonGroup from "./components/right/buttonGroup.vue";
import Audio from "./components/right/audio.vue";

import { selectFile, openFile, openAndReadFile, saveFile } from "../api";
const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(true);
const toggleLeftDrawer = (eventName) => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const splitterModel = ref(50); // start at 50%
const default_project = ref({
  sceneList: [
    {
      name: "场景1",
      path: "",
      direction: null,
      objects: [],
    },
  ],
  main: "场景1",
  name: "我的项目",
  rootPath: "/Users/admin", //地址
});
const formProject = ref({
  name: "我的项目",
  rootPath: "/Users/admin",
});
// 新建弹窗
const dialogProject = ref(false);
// 弹框表单
const projectRef = ref(null);
const rules = {
  name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
  rootPath: [
    {
      required: true,
      message: "请选择项目地址",
      trigger: "change",
    },
  ],
};
const selectFilePath = async () => {
  // openFile 该方法只返回文件路径，适用于打开文件。
  //打开并读取，返回文件内容。openAndReadFile
  let rel = await openFile();
  //打开成功
  if (rel) {
    console.log("文件路径:", rel.filePath);
    console.log("文件内容:", rel.data.toString());
    formProject.value.rootPath = rel.filePath;
  } else {
    //用户取消，什么都不做。
  }
};
//新建提交
const submitForm = async () => {
  await projectRef.value.validate((valid, fields) => {
    if (valid) {
      default_project.value.name = formProject.value.name;
      default_project.value.rootPath = formProject.value.rootPath;
      dialogProject.value = false;
    } else {
      console.log("error submit!", fields);
    }
  });
};
//菜单 - 打开
const viewOpenFile = async () => {
  // openFile 该方法只返回文件路径，适用于打开文件。

  //打开并读取，返回文件内容。openAndReadFile
  let rel = await openFile();
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
//选择文件，只返回选择的文件路径，不返回文件内容
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
// 场景 接收 子组件出来的 sceneList
const handleSceneList = (data) => {
  default_project.value.sceneList = data;
};
//场景 设置主场景
const handleMain = (data) => {
  default_project.value.main = data;
};
const curType = ref("scene"); //当前显示的属性
const sceneIndex = ref(0); //场景当前选中
//场景 当前选中
const handleSceneIndex = (data, type) => {
  curType.value = type;
  sceneIndex.value = data;
};
const objectsIndex = ref(); //图层当前选中

//图层 当前选中
const handleObjectsClick = (type, index) => {
  console.log(type, index, "type, index");
  curType.value = type;
  objectsIndex.value = index;
};

const levelType = ref({
  video: "视频",
  frame: "序列帧",
  photo: "图片",
  dialog: "对话",
  button: "按钮",
  buttonGroup: "按钮组",
  audio: "声音",
});
//运行
const handleRun = () => {
  console.log("运行");
};
//编译
const handleCompile = () => {
  console.log("编译");
};

//添加场景
const addScene = () => {
  console.log("addScene");
  //给sceneList 追加
  default_project.value.sceneList.push({
    id: new Date().getTime(), //获取当前时间戳
    name: "场景" + (default_project.value.sceneList.length + 1),
    objects: [], //图层
  });
};

//添加场景类型
const handleAddSceneType = (type, index) => {
  //给sceneList[index].objects 追加
  default_project.value.sceneList[index].objects.push({
    type: type,
    name:
      levelType.value[type] +
      (default_project.value.sceneList[index].objects.length + 1),
    isShow: true,
  });
};
</script>
<style lang="scss" scoped>
.iconstyle {
  margin-right: 6px;
}
</style>
