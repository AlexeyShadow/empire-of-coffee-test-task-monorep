<template>
  <div class="spinner" />
</template>

<style scoped lang="scss">
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid $shadow-color;
  border-top: 4px solid $primary-gradient-start;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
