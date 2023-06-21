<template>
  <h1 class="text-[50px] text-center font-bold">Polis</h1>
  
  <form v-on:submit.prevent="onSend" class="m-auto w-fit">
    <br>
    
    <div>
      <h1 class="text-[30px] font-bold">Login</h1>
      <div>
        <label for="titulo">Nome</label>
      </div>
      <input v-model="formData.email" name="titulo" class="border border-black rounded-lg w-full"  type="text" placeholder="Nome"> 
    </div>

    <div>
      <label for="titulo">Senha</label>
    </div>
    
    <input v-model="formData.passwd" name="titulo" class="border border-black rounded-lg w-full"  type="password" placeholder="Senha"> 
    
    <div v-if="statusResponse >= 400" class="mt-10 text-center text-sm text-gray-600 bg-red-100 rounded-sm p-4 transform">
      <p>Credenciais inválidas.</p>
    </div>

    <p v-else-if="!statusResponse" class="mt-10 text-center text-sm text-gray-600 bg-red-100 rounded-sm p-4 transform">
      Verifique sua conexão e tente novamente.
    </p>

    <button type="submit" class="mt-3 w-full m-auto shadow-lg shadow-blue-500/50 text-white p-1 rounded-lg transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Entrar</button>
  </form>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] });

const { auth } = useUser();
const { setUser, setToken } = useUserStore();

const statusResponse = ref(-1);
const isLoading = ref(false);

const isValideAll = ref(false);

const formData = reactive({
  email: "",
  passwd: ""
});

const formDataValidate = reactive({
  email: false,
  passwd: false
});

function onSend(){
  isValideAll.value = true;

  statusResponse.value = -1;

  if (!formData.email || !formData.passwd) {
    statusResponse.value = 400;
  };

  isLoading.value = true;

  auth(formData)
    .then(({ data: { token, user } }) => {
      setToken(token);
      setUser(user);
      if(user.type === 2){
        navigateTo("/admin", { replace: true });
      }else{
        navigateTo("/home", { replace: true });
      }
    })
    .catch((err) => {
      statusResponse.value = err?.response?.status ?? 0;
    }).finally(() => {
      isLoading.value = false;
    });
}

useHead({ title: "Polis - Login" });

</script>