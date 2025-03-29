import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { CoffeeItem, Filter } from "~/types/coffeeTypes";

export const useCoffeeStore = defineStore("coffee", () => {
  const coffeeList = ref<CoffeeItem[]>([]);
  const filters = ref<Filter>({
    region: "",
    dateFrom: "",
    dateTo: "",
  });

  function setCoffeeList(data: CoffeeItem[]): void {
    coffeeList.value = data;
  }

  function itemMatchesRegion(item: CoffeeItem, filterRegion: string): boolean {
    return !filterRegion || item.region === filterRegion;
  }

  function itemMatchesDate(
    item: CoffeeItem,
    from?: string,
    to?: string
  ): boolean {
    const itemDate = new Date(item.date_created);
    const dateFrom = from ? new Date(from) : null;
    const dateTo = to ? new Date(to) : null;

    if (dateFrom && itemDate.getTime() < dateFrom.getTime()) return false;
    if (dateTo && itemDate.getTime() > dateTo.getTime()) return false;

    return true;
  }

  const filteredCoffee = computed(() => {
    const currentFilters = filters.value;

    return coffeeList.value.filter((item) => {
      return (
        itemMatchesRegion(item, currentFilters.region) &&
        itemMatchesDate(item, currentFilters.dateFrom, currentFilters.dateTo)
      );
    });
  });

  function resetFilters(): void {
    filters.value = {
      region: "",
      dateFrom: "",
      dateTo: "",
    };
  }

  return {
    coffeeList,
    setCoffeeList,
    filters,
    filteredCoffee,
    resetFilters,
  };
});
