/*
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2024-01-02 10:11:44
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2024-01-02 14:01:41
 * @FilePath: /code/metaedit/src/stores/paoject.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A
 */
import { defineStore } from 'pinia';
import { ref } from "vue";

export const useMainStore = defineStore('main', ()=>{
 //左侧变量
  const leftDrawerOpen = ref(true);

  return {leftDrawerOpen}
});
