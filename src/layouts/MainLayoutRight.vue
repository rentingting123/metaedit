<template>
  <q-drawer
    v-model="rightDrawerOpen"
    show-if-above
    :width="320"
    :breakpoint="500"
    class="color-bg2"
    side="right"
  >
    {{ scene.curType }}
    <Scene v-if="scene.curType == 'scene'"></Scene>
    <!--  :data="default_project.sceneList[sceneIndex]" -->
    <Video v-if="scene.curType == 'video'"></Video>
    <Frame v-if="scene.curType == 'frame'"></Frame>
    <Photo v-if="scene.curType == 'photo'"></Photo>
    <Dialog v-if="scene.curType == 'dialog'"></Dialog>
    <Button v-if="scene.curType == 'button'"></Button>
    <ButtonGroup v-if="scene.curType == 'buttonGroup'"></ButtonGroup>
    <Audio v-if="scene.curType == 'audio'"></Audio>
    <!--  :data="default_project.sceneList[sceneIndex].objects[objectsIndex]" -->
  </q-drawer>
</template>

<script setup >
import { ref } from "vue";

import Scene from "./components/right/scene.vue";
import Video from "./components/right/video.vue";
import Frame from "./components/right/frame.vue";
import Photo from "./components/right/photo.vue";
import Dialog from "./components/right/dialog.vue";
import Button from "./components/right/button.vue";
import ButtonGroup from "./components/right/buttonGroup.vue";
import Audio from "./components/right/audio.vue";
import { useSceneStore } from "stores/scene";
const scene = useSceneStore();

//右侧属性
const rightDrawerOpen = ref(true);
</script>
<style lang="scss" scoped>
.iconstyle {
  margin-right: 6px;
}
</style>
