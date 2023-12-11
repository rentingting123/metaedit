import { defineStore } from 'pinia';

export const usePSStore = defineStore('ps', {

  state: () => ({

    counter: 0,

  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
    init(){

    },
    start(){

    }
  },
});
