<template>
  <q-layout view="hHh Lpr lff">

    <q-header reveal elevated class="bg-primary text-white">


      <q-bar class="q-electron-drag color-bg1">
        <div class="color-tx1">虚拟伴侣</div>

        <q-space />

        <q-btn dense flat icon="minimize" />
        <q-btn dense flat icon="crop_square" />
        <q-btn dense flat icon="close" />
      </q-bar>


    </q-header>



    <q-drawer v-model="drawer" show-if-above mini @click.capture="drawerClick" :width="200" :breakpoint="500"
      class="color-bg2">
      <template v-slot:mini>
        <q-scroll-area class="fit mini-slot cursor-pointer">
          <div class="q-py-lg">


            <div class="side-item color-tx1">角色</div>
            <div class="side-item color-tx1">装扮</div>
            <div class="side-item color-tx1">才艺</div>
            <div class="side-item color-tx1">场景</div>
            <div class="side-item color-tx1">模式</div>



          </div>



          <div class="side-item color-tx1" @click="psStore.start">开始</div>


        </q-scroll-area>
      </template>

    </q-drawer>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup >
import { usePSStore } from '../stores/psStore'
import { ref, onMounted } from 'vue';
const drawer = ref(false);

const psStore = usePSStore()



</script>
<style scoped>
.side-item {
  text-align: center;
  width: 100%;
  margin-top: 12px;
}
</style>
