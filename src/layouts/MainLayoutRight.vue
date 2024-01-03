<!--
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2024-01-02 13:53:11
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2024-01-03 10:39:14
 * @FilePath: /code/metaedit/src/layouts/MainLayoutRight.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <q-drawer
    v-model="rightDrawerOpen"
    show-if-above
    :width="320"
    :breakpoint="500"
    class="color-bg2"
    side="right"
  >
    <Scene v-if="scene.curType == 'scene'"></Scene>
    <Video v-if="scene.curType == 'video'"></Video>
    <Frame v-if="scene.curType == 'frame'"></Frame>
    <Photo v-if="scene.curType == 'photo'"></Photo>
    <Dialog v-if="scene.curType == 'dialog'"></Dialog>
    <Button v-if="scene.curType == 'button'"></Button>
    <ButtonGroup v-if="scene.curType == 'buttonGroup'"></ButtonGroup>
    <Audio v-if="scene.curType == 'audio'"></Audio>
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
