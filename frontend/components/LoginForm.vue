<style scoped src="./LoginForm.scss" lang="scss"></style>

<script setup lang="ts">
import { ref } from "vue";

const username = ref<string>("");
const password = ref<string>("");
const error = ref<string | null>(null);
const loading = ref<boolean>(false);

/**
 * Функция отправляет даные из формы на сервер
 * в случае успеха происходит редирект на страницу профайла
 */
const handleLogin = async (): Promise<void> => {
  loading.value = true;
  error.value = null;

  try {
    const data = await $fetch("http://localhost:3001/login", {
      method: "POST",
      body: { username: username.value, password: password.value },
      credentials: 'include'
    });

    navigateTo("/profile");

  } catch (err: any) {
    console.error(err);
    error.value = err.data?.message || "Произошла ошибка при входе.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="login-container">
    <h1>Вход в аккаунт</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username">Логин (Email):</label>
        <input v-model="username" type="text" placeholder="Введите ваш email" />
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input v-model="password" type="password" placeholder="Введите ваш пароль" />
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <button type="submit" v-bind:disabled="loading" class="submit-button">
        {{ loading ? "Проверка..." : "Войти" }}
      </button>
    </form>
  </div>
</template>
