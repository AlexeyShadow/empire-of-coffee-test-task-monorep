<style scoped src="./Filters.scss" lang="scss"></style>

<script setup lang="ts">
import { useCoffeeStore } from "~/stores/coffeeStore";
const store = useCoffeeStore();
</script>

<template>
    <section class="filters">
        <div class="filter-group">
            <label>Регион:</label>
            <select class="select" v-model="store.filters.region">
                <option value="">Все</option>
                <option v-for="region in [
                    ...new Set(
                        store.coffeeList.map((coffeeItem) => coffeeItem.region)
                    ),
                ]" :key="region" :value="region">
                    {{ region }}
                </option>
            </select>
        </div>
        <div class="filter-group">
            <label>Дата от:</label>
            <input type="date" v-model="store.filters.dateFrom" class="select" />
        </div>

        <div class="filter-group">
            <label>до:</label>
            <input type="date" v-model="store.filters.dateTo" class="select" />
        </div>

        <div class="filter-group">
            <button class="reset-button" @click="store.resetFilters">
                Сбросить фильтры
            </button>
        </div>
    </section>
</template>
