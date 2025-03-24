<template>
  <div class="login-container">
    <h1>Вход в аккаунт</h1>
    <form class="login-form">
      <div class="form-group">
        <label for="username">Логин (Email):</label>
        <input type="text" placeholder="Введите ваш email" required />
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" placeholder="Введите ваш пароль" required />
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <button type="submit" :disabled="loading" class="submit-button">
        {{ loading ? "Проверка..." : "Войти" }}
      </button>
    </form>
  </div>
</template>
