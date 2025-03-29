import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { CoffeeItem, Filter } from "~/types/coffeeTypes";

export const useCoffeeStore = defineStore("coffee", () => {
  const coffeeList = ref<CoffeeItem[]>([]);
  // Заложим возможность расширить фильтры и тип Filter
  const filters = ref<Filter>({
    region: "",
  });

  function setCoffeeList(data: CoffeeItem[]): void {
    coffeeList.value = data;
  }

  function itemMatchesRegion(item: CoffeeItem, filterRegion: string): boolean {
    return !filterRegion || item.region === filterRegion;
  }

  const filteredCoffee = computed(() => {
    const currentFilters = filters.value;

    return coffeeList.value.filter((item) => {
      return itemMatchesRegion(item, currentFilters.region);
    });
  });

  return {
    coffeeList,
    setCoffeeList,
    filters,
    itemMatchesRegion,
    filteredCoffee,
  };
});
