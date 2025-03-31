<style scoped src="./profile.scss" lang="scss"></style>

<script setup lang="ts">
import Spinner from "~/components/Spinner.vue";
import ProfileHeader from "~/components/ProfileHeader.vue";
import Filters from "~/components/Filters.vue";
import { ref, onMounted } from "vue";
import { useCoffeeStore } from "~/stores/coffeeStore";
import type { CoffeeItem } from "~/types/coffeeTypes";

// const store = useCoffeeStore();
// const loading = ref<boolean>(true);

// onMounted(() => {
//   setTimeout(async () => {
//     const { data } = await useFetch<CoffeeItem[]>("/api/coffee");
//     if (data && data.value) {
//       store.setCoffeeList(data.value);
//     }
//     loading.value = false;
//   }, 1500);
// });

useSeoMeta({
  title: "Profile",
  description: "Profile",
});

</script>

<!-- <script lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script> -->

<template>
  <div class="page">
    <ProfileHeader />
    <main class="content">
      <Filters />
      <OrdersTable />
    </main>
  </div>
</template>
