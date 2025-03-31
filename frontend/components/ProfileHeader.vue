<style scoped src="./ProfileHeader.scss" lang="scss"></style>

<script setup lang="ts">
const handleLogout = () => {
    useCookie("authToken").value = null;
    navigateTo("/");
}
</script>

<template>
    <header class="header">
        <div class="header__content">
            <h1 class="header__title">Профиль</h1>
            <button class="button" @click="handleLogout">Выйти</button>
        </div>
    </header>
</template>
