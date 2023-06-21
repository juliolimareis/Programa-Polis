<template>
   <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> -->
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Atualizar Senha</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">

        <div class="mt-2">
          <Input
            type="password"
            :label="'Nova Senha'"
            :value="formData.passwd"
            :on-change="(value: string) => formData.passwd = value"
            validate-with-on-blur
            :validate="(value: string) => strMin(value, 4)"
            :on-validate="(value: boolean) => formDataValidate.passwd = value"
            :helper-text="'Senha deve conter no mínimo 4 caracteres.'"
            block-copy
            :validate-on-update="isValideAll"
          />
        </div>

        <div class="mt-2">
          <Input
            type="password"
            :label="'Confirmar senha'"
            :value="confirmPassword"
            :on-change="(value: string) => confirmPassword = value"
            validate-with-on-blur
            :validate="(value: string) => confirmPassword === formData.passwd"
            :on-validate="(value: boolean) => formDataValidate.confirmPassword = value"
            :helper-text="'Senha não confere'"
            block-paste
            :validate-on-update="isValideAll"
          />
        </div>

         <p v-if="statusResponse >= 400" class="mt-10 text-center text-sm text-gray-600 bg-red-100 rounded-sm p-4 transform">
          Sessão expirada({{ statusResponse }}).
          {{ ' ' }}
          <NuxtLink href="/" class="font-semibold leading-6 text-primary-500">Início</NuxtLink>
        </p>

        <p v-else-if="!statusResponse" class="mt-10 text-center text-sm text-gray-600 bg-red-100 rounded-sm p-4 transform">
          Verifique sua conexão e tente novamente.
        </p>

        <div>
          <Button @click="onSend"
            :is-loading="isLoading"
            loading-size="md"
            is-width-full
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
const statusResponse = ref(-1);
const isLoading = ref(false);
const confirmPassword = ref("");
const isValideAll = ref(false);
const token = useRoute().params.token;
const formData = reactive({ passwd: "" });
const formDataValidate = reactive({ passwd: true, confirmPassword: true });
const api = useApi();

function onSend(){
  isValideAll.value = true;

  if (!validateFormData(formDataValidate)) return;

  isLoading.value = true;

  api.post("/user/recovery", formData, { headers: { Authorization: `Bearer ${token}` } })
    .then(() => {
      navigateTo("/", { replace: true });
    })
    .catch((err) => {
      statusResponse.value = err?.response?.status ?? 0;
      isLoading.value = false;
    });
}

onMounted(() => {
  if(!token){
    navigateTo("/");
  }
});

useHead({ title: "Atualização de senha" });

</script>