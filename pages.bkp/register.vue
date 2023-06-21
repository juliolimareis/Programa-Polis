<template>
   <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> -->
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Criar Conta</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">

        <div class="mt-2">
          <Input
            type="text"
            :label="'Nome'"
            :value="formData.name"
            :on-change="(value: string) => formData.name = value"
            validate-with-on-blur
            :validate="(value: string) => strMin(value, 4)"
            :on-validate="(value: boolean) => formDataValidate.name = value"
            :helper-text="'Nome deve conter no mínimo 4 letras.'"
            :validate-on-update="isValideAll"
          />
        </div>

        <div class="mt-2">
          <Input
            type="text"
            :label="'E-mail'"
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

        <div class="mt-2">
          <Input
            type="text"
            :label="'Confirmar e-mail'"
            :value="confirmEmail"
            :on-change="(value: string) => confirmEmail = value"
            validate-with-on-blur
            :validate="() => confirmEmail === formData.email"
            :on-validate="(value: boolean) => formDataValidate.confirmEmail = value"
            :helper-text="'E-mail não confere.'"
            block-paste
            :validate-on-update="isValideAll"
          />
        </div>

        <div class="mt-2">
          <Input
            type="password"
            :label="'Senha'"
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

         <p v-if="statusResponse === 409" class="mt-10 text-center text-sm text-gray-600 bg-red-100 rounded-sm p-4 transform">
          This email is already registered.
          {{ ' ' }}
          <NuxtLink href="#" class="font-semibold leading-6 text-primary-500">Login</NuxtLink>
        </p>

        <p v-else-if="!statusResponse" class="mt-10 text-center text-sm text-gray-600 bg-red-100 rounded-sm p-4 transform">
          Unable to login.
          {{ ' ' }}
          Is your connection working?
        </p>

        <div>
          <Button @click="onSend"
            :is-loading="isLoading"
            loading-size="md"
            is-width-full
          >
            Register
          </Button>
        </div>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        {{ 'You have account?' }}
        {{ ' ' }}
        <a href="/" class="font-semibold leading-6 text-primary-500 hover:text-second">login</a>
      </p>
    </div>

  </div>
</template>

<script lang="ts" setup>

definePageMeta({ middleware: ["auth"] });

const statusResponse = ref(-1);
const isLoading = ref(false);
const confirmPassword = ref("");
const confirmEmail = ref("");
const isValideAll = ref(false);

const formData = reactive<CreateUser>({
  name: "",
  email: "",
  passwd: "",
});

const formDataValidate = reactive({
  name: true,
  email: true,
  passwd: true,
  confirmPassword: true,
  confirmEmail: true
});

const { dispatch } = useUser();
const { setToken, setUser } = useUserStore();

const response = ref();

function onSend(){
  isValideAll.value = true;

  if (!validateFormData(formDataValidate)) return;

  isLoading.value = true;

  dispatch(formData)
    .then((res) => {
      setToken(res.data.token);
      setUser(res.data.user);
      navigateTo("/home/company-info", { replace: true });
    })
    .catch((err) => {
      statusResponse.value = err?.response?.status ?? 0;
    }).finally(() => {
      isLoading.value = false;
    });
}

useHead({ title: "Cadastro" });

</script>