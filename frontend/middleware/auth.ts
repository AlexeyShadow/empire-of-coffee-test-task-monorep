export default defineNuxtRouteMiddleware(() => {
  const nuxtApp = useNuxtApp();

  const isServer = !!nuxtApp.ssrContext;

  if (!isServer) return;

  const sessionId = useCookie("sessionId");

  if (!sessionId.value) {
    return navigateTo("/", { redirectCode: 302 });
  }
});
