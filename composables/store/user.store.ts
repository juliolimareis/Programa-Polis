import { defineStore, } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: undefined as User | undefined,
    token: undefined as string | undefined,
  }),
  getters: ({}),
  actions: {
    setUser(user: User){
      this.user = user;
    },
    isLogin(){
      return !!this.token;
    },
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    logout(){
      this.user = undefined;
      this.token = undefined;
      navigateTo("/");
    },
  },

  share: { enable: true },
  persist: true

});

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
// }

