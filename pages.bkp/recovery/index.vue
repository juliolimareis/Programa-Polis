<template>
   <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> -->
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Recuperar senha</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">

        <div class="mt-2">
          <Input
            type="email"
            :label="'E-mail de cadastro'"
            :value="formData.email"
            :on-change="(value: string) => formData.email = value"
            validate-with-on-blur
            :validate="'email'"
            :on-validate="(value: boolean) => formDataValidate.email = value"
            :helper-text="'E-mail inválido.'"
            block-copy
            :validate-on-update="isValideAll"
          />
        </div>

        <p v-if="!statusResponse" class="mt-10 text-center text-sm text-gray-600 bg-red-100 rounded-sm p-4 transform">
          Verifique sua conexão e tente novamente.
        </p>

        <div>
          <Button @click="onSend"
            :is-loading="isLoading"
            loading-size="md"
            is-width-full
          >
            Enviar
          </Button>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
const statusResponse = ref(-1);
const isLoading = ref(false);
const isValideAll = ref(false);
const formData = reactive({ email: "" });
const formDataValidate = reactive({ email: true });
const api = useApi();

function onSend(){
  isValideAll.value = true;

  if (!validateFormData(formDataValidate)) return;

  isLoading.value = true;

  api.post("/user/send-recovery", formData)
    .then(() => {
      navigateTo("/", { replace: true });
    })
    .catch((err) => {
      statusResponse.value = err?.response?.status ?? 0;
      isLoading.value = false;
    });
}

useHead({ title: "Recuperação de senha" });

</script>