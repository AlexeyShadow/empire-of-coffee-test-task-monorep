<script setup lang="ts">
import Spinner from "~/components/Spinner.vue";
import { ref, onMounted } from "vue";
import { useCoffeeStore } from "~/stores/coffeeStore";
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

useSeoMeta({
  title: "Profile",
  description: "Profile",
});

function handleLogout(): void {
  useCookie("authToken").value = null;
  navigateTo("/");
}
</script>

<script lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="page">
    <header class="header">
      <div class="header__content">
        <h1 class="header__title">Профиль</h1>
        <button class="button" v-on:click="handleLogout">Выйти</button>
      </div>
    </header>

    <main class="content">
      <section class="filters">
        <div class="filter-group">
          <label>Регион:</label>
          <select class="select" v-model="store.filters.region">
            <option value="">Все</option>
            <option
              v-for="region in [
                ...new Set(
                  store.coffeeList.map((coffeeItem) => coffeeItem.region)
                ),
              ]"
              :key="region"
              :value="region"
            >
              {{ region }}
            </option>
          </select>
        </div>
        <div class="filter-group">
          <label>от:</label>
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
    </main>
  </div>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f9f9f9;
}

.header {
  width: 100%;
  background-color: $header-bg;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;

  &__content {
    width: 100%;
    max-width: $page-max-width;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    margin: 0;
    font-size: 2em;
    color: $primary-dark;
  }
}

.content {
  width: 100%;
  max-width: $page-max-width;
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.filters {
  background: #fff;
  padding: 20px;
  border-radius: $border-radius;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  .filter-group {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: 10px;

    label {
      font-weight: 500;
      color: #333;
    }

    &:last-child {
      margin-left: auto;
    }
  }
}

.profile-container {
  background: #fff;
  padding: 40px 20px;
  border-radius: $border-radius;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;

  h2 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 0;
    color: #555;
  }
}

.button {
  padding: 10px 20px;
  background: linear-gradient(to right, $primary-color, $primary-dark);
  color: white;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  font-size: 1em;
  transition:
    background 0.3s,
    box-shadow 0.3s;
  box-shadow: 0 2px 5px $button-shadow-color;

  &:hover {
    background: linear-gradient(
      to right,
      darken($primary-color, 5%),
      darken($primary-dark, 5%)
    );
    box-shadow: 0 4px 8px $button-shadow-hover-color;
  }
}

.reset-button {
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  font-size: 0.9em;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  box-shadow: 0 2px 5px rgba(244, 67, 54, 0.3);

  &:hover {
    background-color: #d32f2f;
    box-shadow: 0 4px 8px rgba(244, 67, 54, 0.4);
  }
}

.coffee-table {
  margin-top: 30px;
  text-align: left;

  h3 {
    margin-bottom: 10px;
    font-size: 1.2em;
  }

  .table-container {
    height: calc(100vh - 400px);
    overflow-y: scroll;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 12px 15px;
      border-bottom: 1px solid #eee;
    }

    th {
      background-color: #f0f4ff;
      font-weight: 600;
      color: #333;
    }

    tr:hover {
      background-color: #f9fafc;
    }
  }

  @media (max-width: 768px) {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    thead {
      display: none;
    }

    tr {
      margin-bottom: 15px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    td {
      padding-left: 50%;
      position: relative;
      text-align: left;
      border: none;
      border-bottom: 1px solid #eee;

      &::before {
        content: attr(data-label);
        position: absolute;
        left: 15px;
        top: 12px;
        font-weight: bold;
        color: #666;
      }
    }
  }
}

.spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.select {
  min-width: 150px;
  padding: 8px 12px;
  margin-left: 8px;
  border: 1px solid #ccc;
  border-radius: $border-radius;
  background-color: white;
  font-size: 1em;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: $primary-color;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
}
</style>
