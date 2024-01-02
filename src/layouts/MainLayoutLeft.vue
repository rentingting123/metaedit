<!--
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2024-01-02 09:36:22
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2024-01-02 15:22:29
 * @FilePath: /code/metaedit/src/layouts/MainLayoutLeft.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <q-drawer
    v-model="main.leftDrawerOpen"
    show-if-above
    :width="200"
    :breakpoint="500"
    class="color-bg2"
    side="left"
  >
    <q-splitter v-model="splitterModel" horizontal dark style="height: 100%">
      <template v-slot:before>
        <SceneList></SceneList>
      </template>

      <template v-slot:after>
        <Objects></Objects>
      </template>
    </q-splitter>
  </q-drawer>
</template>

<script setup >
import { ref } from "vue";
import SceneList from "./components/left/sceneList.vue";
import Objects from "./components/left/objects.vue";
import { useMainStore } from "stores/main";
const main = useMainStore();

//左侧菜单页面分割
const splitterModel = ref(50); // start at 50%
</script>
<style lang="scss" scoped>
.iconstyle {
  margin-right: 6px;
}
</style>
