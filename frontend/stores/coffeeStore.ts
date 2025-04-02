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

  /**
   *
   * @param data принимает массив данных
   * реактивно помещает его в массив
   */
  const setCoffeeList = (data: CoffeeItem[]) => {
    coffeeList.value = data;
  };

  /**
   *
   * @param item
   * @param filterRegion
   * @returns Возвращает элементы удовлетворяющие региону, если есть
   */
  const itemMatchesRegion = (item: CoffeeItem, filterRegion: string) => {
    return !filterRegion || item.region === filterRegion;
  };

  /**
   *
   * @param item
   * @param from
   * @param to
   * @returns Возвращает элементы удовлетворяющие временному промежутку
   */
  const itemMatchesDate = (item: CoffeeItem, from?: string, to?: string) => {
    const itemDate = new Date(item.date_created);
    const dateFrom = from ? new Date(from) : null;
    const dateTo = to ? new Date(to) : null;

    if (dateFrom && itemDate.getTime() < dateFrom.getTime()) return false;
    if (dateTo && itemDate.getTime() > dateTo.getTime()) return false;

    return true;
  };

  /**
   * Высчитывает и возвращает элементы соответствующие условиям
   */
  const filteredCoffee = computed(() => {
    const currentFilters = filters.value;

    return coffeeList.value.filter((item) => {
      return (
        itemMatchesRegion(item, currentFilters.region) &&
        itemMatchesDate(item, currentFilters.dateFrom, currentFilters.dateTo)
      );
    });
  });

  /**
   * Сбрасывает значения всех фильтров
   */
  const resetFilters = () => {
    filters.value = {
      region: "",
      dateFrom: "",
      dateTo: "",
    };
  };

  return {
    coffeeList,
    setCoffeeList,
    filters,
    filteredCoffee,
    resetFilters,
  };
});
