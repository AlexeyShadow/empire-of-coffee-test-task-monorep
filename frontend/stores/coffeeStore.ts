import { defineStore } from "pinia";
import { ref } from "vue";

export const useCoffeeStore = defineStore("coffee", () => {
  const strPinia = ref("hello from Pinia");

  return {
    strPinia,
  };
});
