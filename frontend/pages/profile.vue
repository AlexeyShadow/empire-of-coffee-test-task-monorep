<script setup lang="ts">
import Spinner from "~/components/Spinner.vue";
import { ref, onMounted } from "vue";
import { useCoffeeStore } from "~/stores/coffeeStore";

const store = useCoffeeStore();
// Попробуем имитировать загрузку данных с сервера
const loading = ref<boolean>(true);
const coffeeData = ref<any[] | null>(null);
onMounted(() => {
  setTimeout(async () => {
    const { data } = await useFetch("/api/coffee");
    coffeeData.value = data.value;
    if (coffeeData.value) {
      store.setCoffeeList(data.value);
    }
    loading.value = false;
    console.log(store.strPinia);
    console.log(store.coffeeList);
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
        <p>TODO: Добавть фильтры</p>
      </section>

      <section class="profile-container">
        <div v-if="loading" class="spinner">
          <Spinner />
          <p>Загрузка данных...</p>
        </div>
        <section class="coffee-table" v-if="coffeeData?.length">
          <h3>Список сделанных заказов</h3>

          <!-- TODO: Переделать таблицу на приличный вывод с фильтрацией -->
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
              <tr v-for="coffee in coffeeData" :key="coffee.id">
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
        </section>
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
// variables
$primary-color: #007bff;
$primary-dark: #0056b3;
$header-bg: #f0f4ff;
$button-shadow-color: rgba(0, 123, 255, 0.3);
$button-shadow-hover-color: rgba(0, 123, 255, 0.4);

$page-max-width: 1200px;
$border-radius: 5px;

// styles
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

.coffee-table {
  margin-top: 30px;
  text-align: left;

  h3 {
    margin-bottom: 10px;
    font-size: 1.2em;
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
</style>
