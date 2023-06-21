<template>
    <h1 class="text-[50px] text-center font-bold">Polis</h1>

    <form v-on:submit.prevent="createUser" class="m-auto w-fit">
      <h1 class="text-[30px] font-bold text-center">Cadastro de usuário</h1>

      <div>
        <label>Nome</label>
      </div>
      <input v-model="userData.name" class="shadow hover:shadow-lg border border-black rounded-lg w-full" type="text" placeholder=" nome">

      <div>
        <label>E-mail</label>
      </div>
      <input v-model="userData.email" class="shadow hover:shadow-lg border border-black rounded-lg w-full" type="email" placeholder=" email">

      <div>
        <label>Acesso Remoto</label>
      </div>
      <input v-model="userData.remoteAccess" class="shadow hover:shadow-lg border border-black rounded-lg w-full" type="text" placeholder=" acesso remoto">

      <div>
        <label>Secretaria</label>
      </div>

      <select v-model="userData.secretaryId" class="shadow hover:shadow-lg border border-black rounded-lg w-full">
        <option value="1">Secretária 1</option>
        <option value="2">Secretária 2</option>
        <option value="3">Secretária 3</option>
        <option value="4">TI</option>
      </select>

      <div>
        <label>Tipo</label>
      </div>

      <select v-model="userData.type" class="shadow hover:shadow-lg border border-black rounded-lg w-full">
        <option value="1">Usuário</option>
        <option value="2">Admin</option>
      </select>

      <div>
        <label>Senha</label>
      </div>
      <input v-model="userData.passwd" class="shadow hover:shadow-lg border border-black rounded-lg w-full" type="password" placeholder=" senha">

      <div>
        <label>Confirmação de Senha</label>
      </div>
      <input v-model="confirmPasswd" class="shadow hover:shadow-lg border border-black rounded-lg w-full" type="password" placeholder=" confirme a Senha">

      <p class="mt-10 text-center text-sm text-gray-600 bg-red-100 rounded-sm p-4 transform" v-if="errors.length && !success">
        <div v-for="error in errors">{{ error }}</div>
      </p>

      <p class="mt-10 text-center text-sm text-gray-600 bg-green-100 rounded-sm p-4 transform" v-if="success">
        Cadastro efetuado com sucesso!
      </p>

      <div class="m-auto w-fit">
        <button type="submit" class="mt-3 m-auto shadow-lg shadow-blue-500/50 text-white p-1 rounded-lg transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Cadastrar</button>
        <button @click="navigateTo('/admin')" class="mt-3 m-auto shadow-lg shadow-blue-500/50 text-white p-1 rounded-lg transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Voltar</button>
      </div>

      <div v-if="statusResponse >= 400" class="mt-10 text-center text-sm text-gray-600 bg-red-100 rounded-sm p-4 transform">
        <p>Erro inesperado ({{ statusResponse }}).</p>
      </div>

      <p v-else-if="!statusResponse" class="mt-10 text-center text-sm text-gray-600 bg-red-100 rounded-sm p-4 transform">
        Verifique sua conexão e tente novamente.
      </p>

    </form>
</template>

<script lang="ts" setup>
import { useValidationsBR, } from "validations-br";

definePageMeta({ middleware: ["auth", "admin"] });

const useRepository = useUser();
const confirmPasswd = ref("");
const errors = ref<string[]>([]);
const success = ref(false);
const isLoading = ref(false);
const statusResponse = ref(-1);

const userData = ref<CreateUser>({
  name: "",
  email: "",
  passwd: "",
  secretaryId: 1,
  remoteAccess: "",
  type: 1
});

function resetForm(){
  userData.value = {
    name: "",
    email: "",
    passwd: "",
    secretaryId: 1,
    remoteAccess: "",
    type: 1
  };

  confirmPasswd.value = "";
}

function validate(){
  errors.value = [];

  if(!userData.value.name){
    errors.value.push("nome inválido.");
  }
  if(!useValidationsBR("email", userData.value.email)){
    errors.value.push("email inválido.");
  }
  if(!userData.value.remoteAccess){
    errors.value.push("acesso remoto inválido.");
  }
  if(!userData.value.secretaryId){
    errors.value.push("secretária inválida.");
  }
  if(!userData.value.type){
    errors.value.push("tipo inválido.");
  }
  if(!userData.value.passwd){
    errors.value.push("insira uma senha.");
  }
  if(!confirmPasswd.value){
    errors.value.push("confirme a senha.");
  }

  if(userData.value.passwd !== confirmPasswd.value){
    errors.value.push("senhas não conferem.");
  }

  return errors.value.length === 0;
}

function createUser(){
  if(!validate()) return alert;

  isLoading.value = true;
  success.value = false;
  statusResponse.value = -1;

  useRepository.dispatch(userData.value)
    .then(res => {
      errors.value = [];
      success.value = true;
      resetForm();
    })
    .catch((err) => {
      statusResponse.value = err?.response?.status ?? 0;
    })
    .finally(() => {
      isLoading.value = false;
    });
}

</script>