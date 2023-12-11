<template>
  <q-page class="flex flex-center">
   <PixelStreaming/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import PixelStreaming from 'components/PixelStreaming.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    PixelStreaming
  },
})


</script>
