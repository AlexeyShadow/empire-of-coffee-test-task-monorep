<script setup lang="ts">
import { ref } from "vue";

const username = ref<string>("");
const password = ref<string>("");
const error = ref<string | null>(null);
const loading = ref<boolean>(false);

async function handleLogin(): Promise<void> {
  loading.value = true;
  error.value = null;

  try {
    const data = await $fetch("http://localhost:3001/login", {
      method: "POST",
      body: { username: username.value, password: password.value },
    });

    console.log("Успешный вход:", data);

    useCookie("authToken").value = data?.token;

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
    <form v-on:submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username">Логин (Email):</label>
        <input v-model="username" type="text" placeholder="Введите ваш email" />
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input
          v-model="password"
          type="password"
          placeholder="Введите ваш пароль"
        />
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

<style scoped lang="scss">
// variables
$primary-color: #007bff;
$primary-dark: #0056b3;
$primary-gradient-start: #007bff;
$primary-gradient-end: #0056b3;
$primary-gradient-hover-start: #0069d9;
$primary-gradient-hover-end: #00408a;

$text-color: #333;
$label-color: #555;
$border-color: #dcdcdc;
$input-focus-border: $primary-color;
$container-bg: #ffffff;
$shadow-color: rgba(0, 0, 0, 0.1);
$button-shadow-color: rgba(0, 123, 255, 0.3);
$button-shadow-hover-color: rgba(0, 123, 255, 0.4);
$disabled-bg: #b0c4de;

$error-bg: #ffebee;
$error-text: #c62828;
$error-border: #f44336;

$border-radius: 5px;
$container-border-radius: 8px;

// styles
.login-container {
  max-width: 420px;
  margin: 60px auto;
  padding: 30px 40px;
  background-color: $container-bg;
  border-radius: $container-border-radius;
  box-shadow: 0 4px 15px $shadow-color;

  h1 {
    text-align: center;
    margin-bottom: 30px;
    color: $text-color;
    font-weight: 600;
  }
}

.login-form {
  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 8px;
    color: $label-color;
    font-size: 0.9em;
    font-weight: 500;
  }

  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    box-sizing: border-box;
    font-size: 1em;
    transition: border-color 0.2s ease-in-out;

    &:focus {
      border-color: $input-focus-border;
      outline: none;
    }
  }

  .submit-button {
    width: 100%;
    padding: 12px;
    background: linear-gradient(
      to right,
      $primary-gradient-start,
      $primary-gradient-end
    );
    color: white;
    border: none;
    border-radius: $border-radius;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: 500;
    transition:
      background 0.3s,
      box-shadow 0.3s;
    margin-top: 10px;
    box-shadow: 0 2px 5px $button-shadow-color;

    &:disabled {
      background: $disabled-bg;
      cursor: not-allowed;
      box-shadow: none;
    }

    &:not(:disabled):hover {
      background: linear-gradient(
        to right,
        $primary-gradient-hover-start,
        $primary-gradient-hover-end
      );
      box-shadow: 0 4px 8px $button-shadow-hover-color;
    }
  }

  .error-message {
    background-color: $error-bg;
    color: $error-text;
    border: 1px solid $error-border;
    padding: 12px 15px;
    border-radius: $border-radius;
    margin-bottom: 20px;
    text-align: center;
    font-size: 0.9em;
    font-weight: 500;
  }
}
</style>
