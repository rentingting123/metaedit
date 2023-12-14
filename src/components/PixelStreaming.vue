<!--
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2023-12-14 21:27:39
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2023-12-14 21:42:10
 * @FilePath: /code/metaedit/src/components/PixelStreaming.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { ref, onMounted } from "vue";
import { usePSStore } from "../stores/psStore";

const ps = ref(null);
const psStore = usePSStore();

onMounted((_) => {
  psStore.init({
    useUrlParams: true,
    initialSettings: {
      ss: "ws://127.0.0.1",
    },
    videoElementParent: ps.value,
  });
});
</script>

<template>
  <div class="ps" ref="ps"></div>
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
