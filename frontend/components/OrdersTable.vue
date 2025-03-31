<style scoped src="./OrdersTable.scss" lang="scss"></style>

<script setup lang="ts">
import type { CoffeeItem } from "~/types/coffeeTypes";
const store = useCoffeeStore();
const loading = ref<boolean>(true);

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
    <section class="profile-container">
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
                            <td>{{ coffee.id }}</td>
                            <td>{{ coffee.name }}</td>
                            <td>{{ coffee.region }}</td>
                            <td>{{ coffee.roastLevel }}</td>
                            <td>{{ coffee.price }} руб.</td>
                            <td>{{ coffee.status }}</td>
                            <td>{{ coffee.date_created }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </section>
</template>
