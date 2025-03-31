<style scoped src="./profile.scss" lang="scss"></style>

<script setup lang="ts">
import ProfileHeader from "~/components/ProfileHeader.vue";
import Filters from "~/components/Filters.vue";

useSeoMeta({
  title: "Profile",
  description: "Profile",
});
</script>

<script lang="ts">
definePageMeta({
  middleware: ["auth"] // и да, можно массивом ["auth", "anotherMiddleware"]
})
</script>

<template>
  <div class="page">
    <ProfileHeader />
    <main class="content">
      <Filters />
      <OrdersTable />
    </main>
  </div>
</template>
