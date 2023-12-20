<!--
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2023-12-20 13:45:53
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2023-12-20 14:04:03
 * @FilePath: /code/metaedit/src/layouts/RightForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <!-- 公共属性
 -->
    <div class="scene color-bg2">
      <div class="color-tx1">属性</div>
    </div>
    <div>
      <div>基础</div>
      <div>类型 <span class="color-tx2">视频</span></div>
  
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.scene {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #000;
  /* 固定在顶部栏 */
  position: fixed;
  width: 100%;
}
</style>