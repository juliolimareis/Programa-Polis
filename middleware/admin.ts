export default defineNuxtRouteMiddleware((to) => {
  if(process.client){
    const { publicPages } = useRuntimeConfig().public;
    const { $state } = useUserStore();

    if(!publicPages.includes(to.path) && $state.user?.type !== 2){
      return navigateTo("/home", { redirectCode: 403, replace: true });
    }
  }
});