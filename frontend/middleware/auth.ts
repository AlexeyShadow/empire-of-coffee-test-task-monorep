export default defineNuxtRouteMiddleware(() => {
  const authToken = useCookie("authToken");

  if (!authToken.value) {
    return navigateTo("/");
  }
});
