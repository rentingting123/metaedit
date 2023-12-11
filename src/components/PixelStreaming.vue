<script setup>

import { ref, onMounted } from 'vue';
import { usePSStore } from '../stores/psStore'

const ps = ref(null);
const psStore = usePSStore()

onMounted(_ => {




  psStore.init({
    useUrlParams: true,
    initialSettings: {
      ss: "ws://127.0.0.1",
    },
    videoElementParent: ps.value
  })

});






</script>

<template>
  <div class="ps" ref="ps">


  </div>
</template>

<style>
.ps {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
