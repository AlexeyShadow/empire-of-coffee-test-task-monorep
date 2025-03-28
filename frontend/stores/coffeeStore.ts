import { defineStore } from "pinia";
import { ref } from "vue";

export const useCoffeeStore = defineStore("coffee", () => {
  type CoffeeItem = {
    id: string;
    date_created: string;
    name: string;
    price: number;
    region: string;
    roastLevel: string;
    status: string;
  };

  const strPinia = ref("hello from Pinia");
  const coffeeList = ref<CoffeeItem[]>([]);

  function setCoffeeList(data: CoffeeItem[]): void {
    coffeeList.value = data;
  }

  return {
    strPinia,
    coffeeList,
    setCoffeeList,
  };
});
