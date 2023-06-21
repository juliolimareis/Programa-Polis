<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> -->
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form v-on:submit.prevent="onSend">
        <div class="space-y-6">

          <div class="mt-2">
            <Input
              type="email"
              :label="'E-mail'"
              validate-with-on-blur
              :value="formData.email"
              :on-change="(value: string) => formData.email = value"
              :on-validate="(validate: boolean) => formDataValidate.email = validate"
              validate="email"
              :helper-text="'e-mail inválido'"
              :validate-on-update="isValideAll"
            />
          </div>

          <div class="mt-2">
            <Input
              type="password"
              :label="'Senha'"
              :value="formData.passwd"
              validate-with-on-blur
              :on-change="(value: string) => formData.passwd = value"
              :on-validate="(validate: boolean) => formDataValidate.passwd = validate"
              :validate="(value: string) => value.length >= 4"
              :helper-text="'senha deve ser maior que 4 caracteres'"
              :validate-on-update="isValideAll"
            />
          </div>

          <div v-if="statusResponse >= 400" class="mt-10 text-center text-sm text-gray-600 bg-red-100 rounded-sm p-4 transform">
            <p>Credenciais inválidas.</p>
          </div>

          <p v-else-if="!statusResponse" class="mt-10 text-center text-sm text-gray-600 bg-red-100 rounded-sm p-4 transform">
            Verifique sua conexão e tente novamente.
          </p>

          <div>
            <Button
              :is-loading="isLoading"
              loading-size="md"
              is-width-full
              type="submit"
            >
              {{ "Sign In" }}
            </Button>
          </div>
        </div>

      </form>

      <p class="mt-5 text-center text-sm text-gray-500">
        <NuxtLink href="/recovery" class="font-semibold leading-6 text-primary-500 hover:text-primary-500">Recuperar senha</NuxtLink>
      </p>
    </div>
  </div>
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

  if (!validateFormData(formDataValidate)) return;

  isLoading.value = true;

  auth(formData)
    .then(({ data: { token, user } }) => {
      setToken(token);
      setUser(user);
      navigateTo("/home", { replace: true });
    })
    .catch((err) => {
      statusResponse.value = err?.response?.status ?? 0;
    }).finally(() => {
      isLoading.value = false;
    });
}

useHead({ title: "Login" });

</script>