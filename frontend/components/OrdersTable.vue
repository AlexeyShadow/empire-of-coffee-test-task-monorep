<style scoped src="./OrdersTable.scss" lang="scss"></style>

<script setup lang="ts">
import type { CoffeeItem } from "~/types/coffeeTypes";
const store = useCoffeeStore();
const loading = ref<boolean>(true);

// Имитируем задержку при получении данных
onMounted(() => {
    setTimeout(async () => {
        const { data } = await useFetch<CoffeeItem[]>("/api/coffee");
        if (data && data.value) {
            store.setCoffeeList(data.value);
        }
        loading.value = false;
    }, 1500);
});
</script>

<template>
    <section class="container">
        <div v-if="loading" class="spinner">
            <Spinner />
            <p>Загрузка данных...</p>
        </div>
        <section class="coffee-table" v-if="store.filteredCoffee.length">
            <h3>Список сделанных заказов</h3>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th>Регион</th>
                            <th>Обжарка</th>
                            <th>Цена</th>
                            <th>Доставка</th>
                            <th>Дата</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="coffee in store.filteredCoffee" :key="coffee.id">
                            <td :data-label="'ID'">{{ coffee.id }}</td>
                            <td :data-label="'Название'">{{ coffee.name }}</td>
                            <td :data-label="'Регион'">{{ coffee.region }}</td>
                            <td :data-label="'Обжарка'">{{ coffee.roastLevel }}</td>
                            <td :data-label="'Цена'">{{ coffee.price }} руб.</td>
                            <td :data-label="'Доставка'">{{ coffee.status }}</td>
                            <td :data-label="'Дата'">{{ coffee.date_created }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </section>
</template>
