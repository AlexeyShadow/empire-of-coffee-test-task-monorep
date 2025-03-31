<style scoped src="./ProfileHeader.scss" lang="scss"></style>

<script setup lang="ts">

async function handleLogout(): Promise<void> {
    try {
        const data = await $fetch("http://localhost:3001/logout", {
            method: "POST",
            credentials: 'include'
        });

        navigateTo("/");

    } catch (err: any) {
        console.error(err);
    }
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
